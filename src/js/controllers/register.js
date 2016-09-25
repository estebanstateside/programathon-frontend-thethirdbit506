(function() {
    'use strict';

    angular
        .module('pymeFbApp')
        .controller('RegisterController', ['dataService', 'gendersService', 'sectorsService', 'Notification', '$location', 'sessionService', RegisterController]);

    function RegisterController(dataService, gendersService, sectorsService, Notification, $location, sessionService) {
        var vm = this;

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

        vm.send = function (model) {
            var form = Object.assign({}, model);
            form.logo = vm.isFile;
            form.fecha_creacion = '12/12/2012';
            form.fecha_ultima_actualizacion = '12/12/2012';
            form.es_facebook_app_instalado = 1;
            form.es_activa = 1;
            form.usuario_id = 1;
            sessionService.register(form).then(function(data){
                console.log(data);
            });
        };
    }
})();
