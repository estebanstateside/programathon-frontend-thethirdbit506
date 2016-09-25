(function() {
    'use strict';
    angular
        .module('pymeFbApp')
        .controller('EncuestaController', ['Facebook', 'Notification', 'constants', '$routeParams', 'gendersService', 'dataService', '$rootScope', EncuestaController]);

    function EncuestaController(Facebook, Notification, constants, $routeParams, gendersService, dataService, $rootScope) {
        var vm = this;
        var PymeID = $routeParams.id;

        vm.login = function () {
          Facebook.login(function(response) {
            Facebook.api('/me?fields=gender', function(response){
              vm.my_gender = response.gender === 'male'? 'M' : 'F';
            });
          });
        }

        vm.puntaje = ['1 - Malo', '2 - Regular', '3 - Normal', '4 - Bueno(a)', '5 - Excelente'];
        vm.success = false;
        vm.isPosting = false;

        Facebook.login(function(response) {
          console.log(response);
        });

        // Facebook.getLoginStatus(function(response) {
        //   console.log(response);
        //   if(response.status === 'connected') {
        //     vm.loggedIn = true;
        //   } else {
        //     vm.loggedIn = false;
        //   }
        // });

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
          var form = Object.assign({}, data);
          form.genero_id = vm.my_gender;
          var cont = 0;
          for (var label in data) {
            cont++;
          }

          if (cont === 6) {
              vm.isPosting = true;
              dataService.postQuestions($rootScope.sessionData.PymeID, form).then(function(res){
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
