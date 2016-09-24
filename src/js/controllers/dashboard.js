(function() {
    'use strict';
    angular
        .module('pymeFbApp')
        .controller('AdminController', ['config', AdminController]);

        function AdminController (config) {
            var vm = this;

            vm.title = config.title;

            vm.send = function (data) {
                console.log(data);
            }
        };
})();
