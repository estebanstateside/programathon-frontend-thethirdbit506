(function() {
    'use strict';
    angular
        .module('pymeFbApp')
        .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
            $routeProvider
                .when('/inicio', {
                    templateUrl: 'views/login.html',
                    controller: 'LoginController',
                    controllerAs: 'login',
                })
                .otherwise({
                    redirectTo: '/inicio'
                });
            $locationProvider.html5Mode(true);
        }]);
})();
