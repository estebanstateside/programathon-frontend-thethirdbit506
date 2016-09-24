(function() {
    'use strict';
    angular
        .module('pymeFbApp')
        .config(function($locationProvider, $routeProvider) {
            $routeProvider
                .when('/inicio', {
                    templateUrl: 'views/login.html',
                    controller: 'LoginController',
                    controllerAs: 'login'
                })
                
                .when('/registro', {
                    templateUrl: 'views/register.html',
                    controller: 'RegisterController',
                    controllerAs: 'register'
                })
                
                .otherwise({
                    redirectTo: '/registro'
                });
            $locationProvider.html5Mode(true);
        });
})();
