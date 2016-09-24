(function() {
    'use strict';

    angular
        .module('pymeFbApp')
        .controller('RegisterController', ['dataService', 'Notification', '$location', RegisterController]);

    function RegisterController(dataService, Notification) {
        var vm = this;
        vm.formData = {};
        vm.countries = [];

        dataService.getCountries().then(function(data) {
            vm.countries = data.data;
        });
        
        vm.cleanForm = function () {
            vm.formData = {};
        };
        
        vm.register = function () {
            // dataService.register(vm.formData).then(data) {
            //     // display message Información guardada/actualizada con éxito
            //      Notification.success('Success notification');
            //     //redirect to login $location.path( "/" );
            //     
            // }
        };
    }
})();
