(function() {
    'use strict';

    angular
        .module('pymeFbApp')
        .service('gendersService', ['$http', 'constants', gendersService]);

    function gendersService($http, constants) {

        function getGenders() {
            return $http.get(constants.api + '/generos');
        }

        return {
            getGenders: getGenders
        }
    }

})();
