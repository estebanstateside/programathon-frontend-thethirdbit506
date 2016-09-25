(function() {
    'use strict';

    angular
        .module('pymeFbApp')
        .controller('RegisterController', ['dataService', 'gendersService', 'sectorsService', 'Notification', '$location', RegisterController]);

    function RegisterController(dataService, gendersService, sectorsService, Notification) {
        var vm = this;
        vm.formData = {};

        vm.title = "Registrar";

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

        vm.register = function () {
            // dataService.register(vm.formData).then(data) {
            //     // display message Información guardada/actualizada con éxito
            //      Notification.success('Success notification');
            //     //redirect to login $location.path( "/" );
            //
            // }
        };

        vm.getStates = function (id) {
           var choosenCountry = vm.countries.filter( function ( data ) {
              return data.id === id;
            })[0];

            vm.estados = choosenCountry.estados;
        }

        vm.file  = function (file) {
            vm.isFile = file;
            console.log(file);
        }

        vm.send = function (data) {
            console.log(data);
        };
    }
})();
