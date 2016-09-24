(function() {
    'use strict';

    angular
        .module('pymeFbApp')
        .controller('RegisterController', RegisterController);

    function RegisterController(dataService) {
        var vm = this;

        vm.countries = [];

        dataService.getCountries().then(function(data) {
            vm.countries = data.data;
        });

        vm.register = function () {
            console.log(vm.countries);
        };
    }
})();
