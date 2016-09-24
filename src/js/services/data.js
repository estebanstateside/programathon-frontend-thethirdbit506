(function() {
    'use strict';

    angular
        .module('pymeFbApp')
        .service('dataService', dataService);

    function dataService($http, constants) {

        function getCountries() {
            return $http.get(constants.api + '/pais');
        }

        function getDashboard() {
            return $http.get(constants.api + '/administrador');
        }

        return {
            getCountries: getCountries,
            getDashboard: getDashboard
        }
    }

})();
