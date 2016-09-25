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

    .factory('AuthInterceptor', ['$injector', function($injector) {
        return {
            request: function(response) {
                var rootScope = $injector.get('$rootScope');
                var q = $injector.get('$q');
                var location = $injector.get('$location');
                var sessionService = $injector.get('sessionService');

                var isPrivate = !(location.path() === '/inicio' || location.path() === '/registro' || location.path() === '/encuesta');

                if (!(isPrivate && sessionService.isValid())) {
                    location.path('/inicio');
                }

                return response;
            }
        };
    }]);
})();
