(function() {
    'use strict';

    angular
        .module('pymeFbApp')
        .controller('RegisterController', ['dataService', 'gendersService', 'sectorsService', 'Notification', '$location', 'constants', 'sessionService', RegisterController]);

    function RegisterController(dataService, gendersService, sectorsService, Notification, $location, constants, sessionService) {
        var vm = this;

        vm.title = "Registrar";
        vm.submit = "Registrarse";
        vm.userDisabled = false;
        vm.isRegister = true;

        vm.isPosting = false;

        dataService.getCountries().then(function(data) {
            vm.countries = data.data;
        });

        gendersService.getGenders().then(function(data) {
            vm.genders = data.data;
        });

        sectorsService.getSectors().then(function(data) {
            vm.sectors = data.data;
        });

        vm.cleanForm = function () {
            vm.formData = {};
        };

        vm.getStates = function (id) {
           var choosenCountry = vm.countries.filter( function ( data ) {
              return data.id === id;
            })[0];

            vm.estados = choosenCountry.estados;
        }

        vm.getYears = function () {
            var actualYear = new Date().getFullYear();
            var limitYear = 1900;
            var years = [];

            for (var i = actualYear; i >= limitYear; i--) {
                years.push(i)
            };

            return years;
        }

        vm.file  = function (file) {
            var fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = function (e) {
                var dataUrl = e.target.result;
                vm.isFile = dataUrl;
            };
        }

        vm.send = function(model) {
            var form = Object.assign({}, model);

            form.logo = vm.isFile;

            vm.isPosting = true;

            dataService.register(form)
                .then(function(data) {
                    if (data.statusText === 'Created') {
                        vm.formData.PymeID = data.data.id;
                        vm.formData.UsuarioId = data.data.id_user;
                        vm.formData.Usuario = vm.formData.nombre_usuario;
                        vm.formData.PaisID = vm.formData.pais;

                        if (vm.formData.PymeID && vm.formData.UsuarioId) {
                            sessionService.signIn(vm.formData, function() {
                                $location.path('/administrador');
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
    }
})();
