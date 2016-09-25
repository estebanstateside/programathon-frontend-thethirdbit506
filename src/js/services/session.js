(function() {
    'use strict';

    angular
        .module('pymeFbApp')
        .service('sessionService', ['$rootScope', '$http', '$cookies', sessionService]);

    function sessionService($rootScope, $http, $cookies) {

        function isValid() {
            var Usuario = $cookies.get('Usuario') || '';
            var PaisID = $cookies.get('PaisID') || '';
            var Fecha = $cookies.get('Fecha') || '';
            var PymeID = $cookies.get('PymeID') || '';
            return (Usuario !== '' && PaisID !== '' && Fecha !== '' && PymeID !== '');
        }

        function signIn(formData, callback) {
            $cookies.put('Usuario', formData.Usuario);
            $cookies.put('PaisID', formData.PaisID);
            $cookies.put('PymeID', formData.PymeID);
            $cookies.put('Fecha', new Date());
            
            $rootScope.sessionData = {
                Usuario: formData.Usuario,
                PaisID: formData.PaisID,
                PymeID: formData.PymeID
            };
            
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
            isValid: isValid,
            register: register
        }
    }

})();
