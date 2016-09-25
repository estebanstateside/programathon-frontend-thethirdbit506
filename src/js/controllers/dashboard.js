(function() {
    'use strict';
    angular
        .module('pymeFbApp')
        .controller('AdminController', ['config', 'dataService', 'sessionService', '$location', '$rootScope','$routeParams', AdminController]);

    function AdminController( config, dataService, sessionService, $location, $rootScope, $routeParams) {
        var vm = this;

        vm.code = getURLParameter('code');

        dataService.getPyme($rootScope.sessionData.PymeID).then(function(pyme){
          vm.business = pyme.data;

          vm.socialLinks = [];
          console.log(vm.business.social);
          for(var x = 0, max = vm.business.social.length; x < max; x++) {
              var obj = {};
              obj.type = vm.business.social[x].type === 'Website' ? 'globe' : vm.business.social[x].type.toLowerCase();
              obj.name = vm.business.social[x].type === 'Website' ? 'Sitio Web' : vm.business.social[x].type;
              obj.url = vm.business.social[x].Link;
              vm.socialLinks.push(obj);
          }
        });

        dataService.getUser($rootScope.sessionData.UsuarioId).then(function(user){
            vm.user = user.data;
        });

        vm.title = 'Panel de Métricas';

        vm.signOut = function() {
            sessionService.signOut(function() {
                $location.path('/inicio');
            });
        };

        vm.getResults = function (data) {
          console.log(data);
        }

        function getURLParameter(name) {
          return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
        }
    };
})();
