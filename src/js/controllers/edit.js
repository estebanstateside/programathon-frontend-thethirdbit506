(function() {
    'use strict';

    angular
        .module('pymeFbApp')
        .controller('EditController', ['dataService', 'Notification', '$location', EditController]);

    function EditController(dataService, Notification) {
        var vm = this;
        vm.formData = {};

        vm.title = "Editar";

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

        vm.send = function (data) {
            console.log(data);
        };
    }
})();
