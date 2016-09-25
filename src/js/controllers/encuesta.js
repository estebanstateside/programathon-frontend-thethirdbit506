(function() {
    'use strict';
    angular
        .module('pymeFbApp')
        .controller('EncuestaController', ['Notification', 'constants', '$routeParams', 'gendersService', 'dataService', '$rootScope', EncuestaController]);

    function EncuestaController(Notification, constants, $routeParams, gendersService, dataService, $rootScope) {
        var vm = this;
        var PymeID = $routeParams.id;

        vm.puntaje = ['1 - Malo', '2 - Regular', '3 - Normal', '4 - Bueno(a)', '5 - Excelente'];
        vm.success = false;
        vm.isPosting = false;

        gendersService.getGenders().then(function(data) {
            vm.genders = data.data;
        });

        dataService.getQuestions().then(function(data){
            vm.questions = data.data;
            console.log(data.data);
        })

        vm.ages = [
            {
                Nombre: '12-17',
                Id: 1
            },
            {
                Nombre: '18-33',
                Id: 2
            },
            {
                Nombre: '34-45',
                Id: 3
            },
            {
                Nombre: '46-55',
                Id: 4
            },
            {
                Nombre: '56-64',
                Id: 5
            },
            {
                Nombre: '65-73',
                Id: 6
            },
            {
                Nombre: '74+',
                Id: 7
            },
        ]

        vm.send = function (data) {
          var cont = 0;
          for (var label in data) {
            cont++;
          }

          if (cont === 7) {
              vm.isPosting = true;
              dataService.postQuestions($rootScope.sessionData.PymeID, data).then(function(res){
                 if(res.status == 201 || res.statusText == 'Created') {
                        vm.success = true;
                        vm.isPosting = false;
                 }
              });
          } else {
            Notification.error(constants.messages.encuesta);
          }
        }
    };
})();
