(function() {
    'use strict';
    angular
        .module('pymeFbApp')
        .controller('AdminController', ['Facebook','config', 'dataService', 'sessionService', '$location', '$rootScope','$routeParams', AdminController]);

    function AdminController(Facebook, config, dataService, sessionService, $location, $rootScope, $routeParams) {
        var vm = this;

        vm.code = getURLParameter('code');

        Facebook.login(function(response) {
          console.log(response);
          Facebook.api('/me', function(response) {
            console.log(response);
          });
        });

        dataService.getPyme($rootScope.sessionData.PymeID).then(function(pyme){
          vm.business = pyme.data;

          vm.socialLinks = [];
          for(var x = 0, max = vm.business.social.length; x < max; x++) {
              var obj = {};
              obj.type = vm.business.social[x] === 'Website' ? 'globe' : vm.business.social[x].type.toLowerCase();
              obj.name = vm.business.social[x].type;
              obj.url = vm.business.social[x].Link;
              vm.socialLinks.push(obj);
          }
        });

        dataService.getUser($rootScope.sessionData.UsuarioId).then(function(user){
            vm.user = user.data;
        });

        vm.title = 'Panel de Métricas';

        vm.time = getCurrentDate();

        vm.signOut = function() {
            sessionService.signOut(function() {
                $location.path('/inicio');
            });
        };

        function getCurrentDate() {
            var today = new Date(),
                dd = today.getDate(),
                mm = today.getMonth() + 1,
                yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }

            today = dd + '/' + mm + '/' + yyyy;

            return today;

        };

        function getURLParameter(name) {
          return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
        }
    };
})();
