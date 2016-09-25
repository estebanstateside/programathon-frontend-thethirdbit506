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

        function postToPyme(pymeId) {
          return $http.get(constants.api + '/postfb/id/' + pymeId);
        }

        function getUser(userId) {
            return $http.get(constants.api + '/usuarios/id/' + userId);
        }

        function postQuestions(id, data) {
            return $http.post(constants.api + '/respuestas/id/' + id, data);
        }

        function getQuestions() {
            return $http.get(constants.api + '/preguntas');
        }

        function getResponses(id, start, end) {
            if (start && end) {
                return $http.get(constants.api + '/respuestas/id/' + id + '/start/'+ start + '/end/' + end);
            } else {
                return $http.get(constants.api + '/respuestas/id/' + id);
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

        function register(data) {
            return $http.post(constants.api + '/pyme', data);
        }

        function update(id,data) {
            return $http.post(constants.api + '/pyme/id/' + id, data)
        }

        return {
            getCountries: getCountries,
            getUser: getUser,
            login: login,
            register: register,
            update: update,
            getPyme: getPyme,
            postQuestions: postQuestions,
            getQuestions: getQuestions,
            getResponses: getResponses,
            postToPyme: postToPyme
        }
    }

})();
