(function() {
    'use strict';

    angular
        .module('pymeFbApp')
        .service('sessionService', ['$rootScope', '$http', '$cookies', 'constants', sessionService]);

    function sessionService($rootScope, $http, $cookies, constants) {

        function isValid() {
            var Usuario = $cookies.get('Usuario') || '';
            var UsuarioId = $cookies.get('UsuarioId') || '';
            var PaisID = $cookies.get('PaisID') || '';
            var Fecha = $cookies.get('Fecha') || '';
            var PymeID = $cookies.get('PymeID') || '';
            return (Usuario !== '' && UsuarioId !== '' && PaisID !== '' && Fecha !== '' && PymeID !== '');
        }

        function loadToRoot() {
            var Usuario = $cookies.get('Usuario');
            var UsuarioId = $cookies.get('UsuarioId');
            var PaisID = $cookies.get('PaisID');
            var Fecha = $cookies.get('Fecha');
            var PymeID = $cookies.get('PymeID');
            $rootScope.sessionData = {
                Usuario: Usuario,
                PaisID: PaisID,
                PymeID: PymeID,
                UsuarioId: UsuarioId
            };
        }

        function signIn(formData, callback) {
            $cookies.put('Usuario', formData.Usuario);
            $cookies.put('UsuarioId', formData.UsuarioId)
            $cookies.put('PaisID', formData.PaisID);
            $cookies.put('PymeID', formData.PymeID);
            $cookies.put('Fecha', new Date());

            $rootScope.sessionData = {
                Usuario: formData.Usuario,
                UsuarioId: formData.UsuarioId,
                PaisID: formData.PaisID,
                PymeID: formData.PymeID
            };

            callback();
        }

        function signOut(callback) {
            $cookies.remove('Usuario');
            $cookies.remove('UsuarioId');
            $cookies.remove('PaisID');
            $cookies.remove('Fecha');
            $cookies.remove('PymeID');
            callback();
        }

        return {
            signIn: signIn,
            signOut: signOut,
            isValid: isValid,
            loadToRoot: loadToRoot
        }
    }

})();
