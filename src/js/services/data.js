(function() {
    'use strict';

    angular
        .module('pymeFbApp')
        .service('dataService', dataService);

    function dataService($http, constants) {
        
        function getCountries() {
            return $http.get(constants.api + '/pais');
        }

        return {
            getCountries: getCountries
        }
    }

})();
