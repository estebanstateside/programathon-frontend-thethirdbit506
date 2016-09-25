(function() {
    'use strict';

    angular
        .module('pymeFbApp')
        .service('sessionService', ['$http', sessionService]);

    function sessionService($http) {

        function signOut() {

        };

        return {
            signOut: signOut
        }
    }

})();
