(function() {
    'use strict';

    angular
        .module('pymeFbApp')
        .service('sessionService', ['$http', '$cookies', sessionService]);

    function sessionService($http, $cookies) {

        function signIn(formData, callback) {
            $cookies.put('Usuario', formData.Usuario);
            $cookies.put('PaisID', formData.PaisID);
            $cookies.put('PymeID', formData.PymeID);
            $cookies.put('Fecha', new Date());
            callback();
        }

        function signOut(callback) {
            $cookies.remove('Usuario');
            $cookies.remove('PaisID');
            $cookies.remove('Fecha');
            $cookies.remove('PymeID');
            callback();
        }

        return {
            signIn: signIn,
            signOut: signOut
        }
    }

})();
