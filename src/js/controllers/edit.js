(function() {
    'use strict';

    angular
        .module('pymeFbApp')
        .controller('EditController', ['dataService', 'Notification','$rootScope', '$location', 'gendersService', 'sectorsService',  EditController]);

    function EditController(dataService, Notification, $rootScope, $location, gendersService, sectorsService) {
        var vm = this;
        vm.formData = {};

        vm.title = "Editar información";
        vm.submit = "Actualizar información";
        vm.loadedFromApi = false;
        
        dataService.getCountries().then(function(data) {
            vm.countries = data.data;
        });

        gendersService.getGenders().then(function(data) {
            vm.genders = data.data;
        });

        sectorsService.getSectors().then(function(data) {
            vm.sectors = data.data;
        });

        dataService.getPyme($rootScope.sessionData.PymeID).then(function(pyme){
            for(var prop in pyme.data) {
              vm.formData[prop] = pyme.data[prop]
            }
            console.log(vm.formData);

            vm.loadedFromApi = true;
        });

        dataService.getUser($rootScope.sessionData.UsuarioId).then(function(user){
            for(var prop in user.data) {
                vm.formData[prop] = user.data[prop]
            }

            console.log(vm.formData);
        });

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
            dataService.update($rootScope.sessionData.PymeID, form).then(function(data){
                console.log(data);
            });
        };


        vm.cleanForm = function () {
            vm.formData = {};
        };

    }
})();
