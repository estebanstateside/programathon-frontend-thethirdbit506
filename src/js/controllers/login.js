(function() {
    'use strict';
    angular
        .module('pymeFbApp')
        .controller('LoginController', ['dataService', 'Notification', 'config', 'constants', 'sessionService', '$location', LoginController]);

    function LoginController(dataService, Notification, config, constants, sessionService, $location) {
        var vm = this;

        vm.title = config.title;

        vm.formData = {};

        vm.isFetching = false;

        vm.isFetchingCountries = true;

        dataService.getCountries()
            .then(function(data) {
                if (data.statusText === 'OK') {
                    vm.countries = data.data;
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
                vm.isFetchingCountries = false;
            });

        vm.cleanForm = function() {
            vm.formData = {};
        };

        vm.send = function(isValid) {
            if (isValid) {
                vm.isFetching = true;

                dataService.login(vm.formData)
                    .then(function(data) {
                        if (data.statusText === 'OK') {
                            vm.formData.PymeID = data.data[0].id;
                            vm.formData.UsuarioId = data.data[0].id_usuario;

                            if (vm.formData.PymeID) {
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
                        vm.isFetching = false;
                    });
            } else {
                Notification.error(constants.messages.required);
            }
        };
    };
})();
