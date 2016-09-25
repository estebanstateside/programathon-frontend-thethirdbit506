(function() {
    'use strict';

    angular
        .module('pymeFbApp')
        .controller('EditController', ['dataService', 'Notification','$rootScope', '$location', EditController]);

    function EditController(dataService, Notification, $rootScope, $location) {
        var vm = this;
        vm.formData = {};

        vm.title = "Editar información";
        dataService.getPyme($rootScope.sessionData.PymeID).then(function(pyme){
          console.log(pyme);
        });

        //dataService.getUsuario();

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
