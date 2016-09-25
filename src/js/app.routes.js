(function() {
    'use strict';
    angular
        .module('pymeFbApp')
        .config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {
            $routeProvider
                .when('/inicio', {
                    templateUrl: 'views/login.html',
                    controller: 'LoginController',
                    controllerAs: 'login'
                })

                .when('/registro', {
                    templateUrl: 'views/register.html',
                    controller: 'RegisterController',
                    controllerAs: 'perfil'
                })

                .when('/editar', {
                    templateUrl: 'views/register.html',
                    controller: 'EditController',
                    controllerAs: 'perfil'
                })

                .when('/administrador', {
                    templateUrl: 'views/dashboard.html',
                    controller: 'AdminController',
                    controllerAs: 'admin'
                })

                .when('/encuesta', {
                    templateUrl: 'views/encuesta.html',
                    controller: 'EncuestaController',
                    controllerAs: 'encuesta'
                })

                .otherwise({
                    redirectTo: '/inicio'
                });

            $locationProvider.html5Mode(false);

            $httpProvider.interceptors.push([
                '$injector',
                function($injector) {
                    return $injector.get('AuthInterceptor');
                }
            ]);
        }])
        .factory('AuthInterceptor', ['$rootScope', '$q', function($rootScope, $q) {
            return {
                request: function(response) {
                    return response;
                }
            };
        }]);
})();
