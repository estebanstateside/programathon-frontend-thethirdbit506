(function() {
    'use strict';
    angular
        .module('pymeFbApp')
        .controller('LoginController', [LoginController]);

        function LoginController () {
            var vm = this;

            vm.send = function (data) {
                console.log(data);
            }
        };
})();
