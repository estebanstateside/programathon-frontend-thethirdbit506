(function() {
    'use strict';
    angular
        .module('pymeFbApp')
        .controller('AdminController', ['config', 'dataService', 'sessionService', AdminController]);

        function AdminController (config, dataService, sessionService) {
            var vm = this,
                id = 3;

            dataService.getPyme().then(function(data){
                vm.business = data.data[id];
                console.log(vm.business);
            });

            vm.title = 'Panel de Métricas';

            vm.time = getCurrentDate();

            vm.signOut = function() {
                console.log('signing out...');
            };

            function getCurrentDate() {
                var today = new Date(),
                    dd = today.getDate(),
                    mm = today.getMonth()+1,
                    yyyy = today.getFullYear();

                if(dd<10) {
                    dd='0'+dd
                }

                if(mm<10) {
                    mm='0'+mm
                }

                today = dd+'/'+mm+'/'+yyyy;

                return today;

            };

            vm.send = function (data) {
                console.log(data);
            };
        };
})();
