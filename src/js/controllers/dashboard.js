(function() {
    'use strict';
    angular
        .module('pymeFbApp')
        .controller('AdminController', ['config', 'dataService', AdminController]);

        function AdminController (config, dataService) {
            var vm = this;

            vm.title = 'Panel de Métricas – ' + 'PYME';

            vm.send = function (data) {
                console.log(data);
            }
        };
})();
