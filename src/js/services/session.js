(function() {
    'use strict';

    angular
        .module('pymeFbApp')
        .service('sessionService', ['$http', '$cookies', 'constants', '$q', sessionService]);

    function sessionService($http, $cookies, constants, $q) {

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

        var getModelAsFormData = function (data) {
            var dataAsFormData = new FormData();
            angular.forEach(data, function (value, key) {
                if (key == "logo") {
                    console.log('Entered');
                    for (var i = 0; i < value.length; i++) {
                        dataAsFormData.append(value[i].name, value[i]);
                    }
                } else {
                    dataAsFormData.append(key, value);
                }
            });

            return dataAsFormData;
        };

        var register = function (data) {
            var deferred = $q.defer();
            return $http({
                url: constants.api + '/pyme',
                method: "POST",
                data: (data)
            });
        };


        return {
            signIn: signIn,
            signOut: signOut,
            register: register
        }
    }

})();
