(function() {
    'use strict';

    angular
        .module('pymeFbApp')
        .controller('EditController', ['dataService', 'Notification', '$rootScope', '$location', 'gendersService', 'sectorsService', 'constants', 'sessionService', EditController]);

    function EditController(dataService, Notification, $rootScope, $location, gendersService, sectorsService, constants, sessionService) {
        var vm = this;
        vm.formData = {};

        vm.title = "Editar información";
        vm.submit = "Actualizar información";
        vm.loadedFromApi = false;
        vm.userDisabled = true;
        vm.isRegister = false;

        gendersService.getGenders().then(function(data) {
            vm.genders = data.data;
        });

        sectorsService.getSectors().then(function(data) {
            vm.sectors = data.data;
        });

        dataService.getPyme($rootScope.sessionData.PymeID).then(function(pyme) {
            for (var prop in pyme.data) {
                vm.formData[prop] = pyme.data[prop]
            }

            vm.formData.es_activa = (vm.formData.es_activa === '1') ? true : false;
            
            vm.formData.es_negocio_familiar = (vm.formData.es_negocio_familiar === '1') ? true : false;

            for (var prop in vm.formData.social) {
                if (vm.formData.social[prop].type === 'Facebook') {
                    vm.formData.link_facebook = vm.formData.social[prop].Link;
                    vm.formData.correo_electronico = vm.formData.social[prop].InformacionContacto;
                }

                if (vm.formData.social[prop].type === 'Twitter') {
                    vm.formData.link_twitter = vm.formData.social[prop].Link;
                }

                if (vm.formData.social[prop].type === 'Linkedin') {
                    vm.formData.link_linkedin = vm.formData.social[prop].Link;
                }

                if (vm.formData.social[prop].type === 'YouTube') {
                    vm.formData.link_you_tube = vm.formData.social[prop].Link;
                }

                if (vm.formData.social[prop].type === 'Website') {
                    vm.formData.link_pagina_web = vm.formData.social[prop].Link;
                }
            }

            dataService.getCountries().then(function(data) {
                vm.countries = data.data;

                vm.formData.pais = vm.formData.country_id;

                var choosenCountry = vm.countries.filter(function(data) {
                    return data.id === vm.formData.pais;
                })[0];

                vm.estados = choosenCountry.estados;

                vm.loadedFromApi = true;
            });
        });

        dataService.getUser($rootScope.sessionData.UsuarioId).then(function(user) {
            for (var prop in user.data) {
                vm.formData[prop] = user.data[prop]
            }
        });
        
        vm.toggleDisable = function () {
            if (!vm.formData.es_activa) {
                Notification.warning(constants.messages.disable_pyme);
            }
        }

        vm.getYears = function() {
            var actualYear = new Date().getFullYear();
            var limitYear = 1900;
            var years = [];

            for (var i = actualYear; i >= limitYear; i--) {
                years.push(i);
            };

            return years;
        }

        vm.file = function(file) {
            var fileReader = new FileReader();

            fileReader.readAsDataURL(file);

            fileReader.onload = function(e) {
                var dataUrl = e.target.result;
                vm.isFile = dataUrl;
            };
        }

        vm.send = function(model) {
            var form = Object.assign({}, model);
            form.logo = vm.isFile;
            vm.isPosting = true;

            dataService.update($rootScope.sessionData.PymeID, form)
                .then(function(data) {
                    if (data.statusText === 'Created') {
                        vm.formData.PymeID = vm.formData.id;
                        vm.formData.UsuarioId = vm.formData.usuario_id;
                        vm.formData.Usuario = vm.formData.nombre_usuario;
                        vm.formData.PaisID = vm.formData.pais;

                        if (vm.formData.PymeID && vm.formData.UsuarioId) {
                            sessionService.signIn(vm.formData, function() {
                                Notification.success('¡El usuario fue actualizado!');
                            });
                        } else {
                            Notification.error(constants.messages.error);
                        }
                    } else {
                        Notification.error(constants.messages.error);
                    }
                })
                .catch(function(error) {
                    if (error.data && error.data.message) {
                        Notification.error(error.data.message);
                    } else {
                        Notification.error(constants.messages.error);
                    }
                })
                .finally(function() {
                    vm.isPosting = false;
                });
        };

        vm.cleanForm = function() {
            vm.formData = {};
        };
    }
})();
