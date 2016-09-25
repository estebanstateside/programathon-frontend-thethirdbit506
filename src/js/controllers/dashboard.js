(function() {
    'use strict';
    angular
        .module('pymeFbApp')
        .controller('AdminController', ['config', 'dataService', 'sessionService', '$location', '$rootScope', AdminController]);

    function AdminController(config, dataService, sessionService, $location, $rootScope) {
        var vm = this;

        dataService.getPyme($rootScope.sessionData.PymeID).then(function(pyme){
          vm.business = pyme.data;
        });

        vm.title = 'Panel de Métricas';

        vm.time = getCurrentDate();

        vm.user = $rootScope.sessionData.Usuario;

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

        vm.send = function(data) {
            console.log(data);
        };
    };
})();
