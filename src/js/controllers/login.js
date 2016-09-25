(function() {
    'use strict';
    angular
        .module('pymeFbApp')
        .controller('LoginController', ['dataService', 'Notification', 'config', 'constants', LoginController]);

    function LoginController(dataService, Notification, config, constants) {
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
            .catch(function() {
                Notification.error(constants.messages.error);
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
                            // TODO: Save data in cookies and redirect to /dashboard
                            console.log(data);
                        } else {
                            Notification.error(constants.messages.error);
                        }
                    })
                    .catch(function(error) {
                        Notification.error(constants.messages.error);
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
