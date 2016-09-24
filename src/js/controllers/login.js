(function() {
    'use strict';
    angular
        .module('pymeFbApp')
        .controller('LoginController', ['dataService', 'Notification', LoginController]);

    function LoginController(dataService, Notification) {
        var vm = this;
        vm.formData = {};

        dataService.getCountries().then(function(data) {
            vm.countries = data.data;
        });

        vm.send = function(isValid) {
            if (isValid) {
                console.log(vm.formData);
            } else {
                Notification.error('¡Faltan algunos campos requeridos!');
            }
        };
    };
})();
