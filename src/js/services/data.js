(function() {
    'use strict';

    angular
        .module('pymeFbApp')
        .service('dataService', ['$http', 'constants', dataService]);

    function dataService($http, constants) {

        function getCountries() {
            return $http.get(constants.api + '/pais');
        }

        function getPyme(PymeID) {
          if(PymeID){
              return $http.get(constants.api + '/pyme/id/' + PymeID);
          }else{
            return $http.get(constants.api + '/pyme');
          }
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
            login: login,
            getPyme: getPyme
        }
    }

})();
