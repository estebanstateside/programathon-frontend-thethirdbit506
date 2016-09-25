(function() {
    'use strict';
    angular
        .module('pymeFbApp')
        .controller('EncuestaController', ['Notification', 'constants', '$routeParams', EncuestaController]);

    function EncuestaController(Notification, constants, $routeParams) {
        var vm = this;
        var PymeID = $routeParams.id;

        vm.puntaje = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

        vm.send = function (data) {
          var cont = 0;
          for (var label in data) {
            cont++;
          }

          if (cont === 5) {
            console.log("send");
          } else {
            Notification.error(constants.messages.encuesta);
          }
        }
    };
})();
