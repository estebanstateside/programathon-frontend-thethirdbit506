(function() {
    'use strict';
    angular
        .module('pymeFbApp')
        .controller('LoginController', ['dataService', 'Notification', 'config', LoginController]);

    function LoginController(dataService, Notification, config) {
        var vm = this;

        vm.title = config.title;

        vm.formData = {};

        dataService.getCountries().then(function(data) {
            vm.countries = data.data;
        });

        vm.cleanForm = function() {
            vm.formData = {};
        };

        vm.send = function(isValid) {
            if (isValid) {
                console.log(vm.formData);
            } else {
                Notification.error('¡Faltan algunos campos requeridos!');
            }
        };
    };
})();
