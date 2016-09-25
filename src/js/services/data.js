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

        function login(formData) {
            var data = {
                NombreComercio: formData.NombreComercio,
                Usuario: formData.Usuario,
                PaisID: formData.PaisID,
                Clave: formData.Clave
            };

            return $http({
                url: constants.api + '/login',
                method: 'POST',
                data: data
            });
        }

        return {
            getCountries: getCountries,
            getDashboard: getDashboard,
            login: login
        }
    }

})();
