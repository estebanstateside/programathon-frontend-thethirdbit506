(function() {
    'use strict';

    angular
        .module('pymeFbApp')
        .service('dataService', ['$http', 'constants', dataService]);

    function dataService($http, constants) {

        function getCountries() {
            return $http.get(constants.api + '/pais');
        }

        function getPyme() {
            return $http.get(constants.api + '/pyme');
        }

        return {
            getCountries: getCountries,
            getPyme: getPyme
        }
    }

})();
