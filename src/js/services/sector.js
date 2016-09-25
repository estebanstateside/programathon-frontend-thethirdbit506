(function() {
    'use strict';

    angular
        .module('pymeFbApp')
        .service('sectorsService', ['$http', 'constants', sectorsService]);

    function sectorsService($http, constants) {

        function getSectors() {
            return $http.get(constants.api + '/sectors');
        }

        return {
            getSectors: getSectors
        }
    }

})();
