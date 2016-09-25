(function() {
    'use strict';

    angular
        .module('pymeFbApp')
        .controller('RegisterController', ['dataService', 'gendersService', 'sectorsService', 'Notification', '$location', 'sessionService', RegisterController]);

    function RegisterController(dataService, gendersService, sectorsService, Notification, $location, sessionService) {
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
            vm.isFile = [file];
            console.log(vm.isFile);
        }

        vm.send = function (model) {
            var form = Object.assign({}, model);
            form.logo = vm.isFile;
            form.fecha_creacion = '12/12/2012';
            form.fecha_ultima_actualizacion = '12/12/2012';
            form.es_facebook_app_instalado = 1;
            form.es_activa = 1;
            form.usuario_id = 22;
            sessionService.register(form).then(function(data){
                console.log(data);
            });
        };
    }
})();
