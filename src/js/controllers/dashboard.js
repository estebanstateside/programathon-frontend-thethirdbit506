(function() {
    'use strict';
    angular
        .module('pymeFbApp')
        .controller('AdminController', [AdminController]);

        function AdminController () {
            var vm = this;

            vm.send = function (data) {
                console.log(data);
            }
        };
})();
