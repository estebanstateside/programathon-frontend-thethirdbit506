(function() {
    'use strict';
    angular
        .module('pymeFbApp')
        .config(['FacebookProvider', '$locationProvider', '$routeProvider', '$httpProvider', function(FacebookProvider, $locationProvider, $routeProvider, $httpProvider) {
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

                .when('/:id/encuesta', {
                    templateUrl: 'views/encuesta.html',
                    controller: 'EncuestaController',
                    controllerAs: 'encuesta'
                })

                .otherwise({
                    redirectTo: '/administrador'
                });

            $locationProvider.html5Mode(false);

            $httpProvider.interceptors.push([
                '$injector',
                function($injector) {
                    return $injector.get('AuthInterceptor');
                }
            ]);

            FacebookProvider.init('1203377526408832');
        }])

    .factory('AuthInterceptor', ['$injector', function($injector) {
        return {
            request: function(response) {
                var rootScope = $injector.get('$rootScope');
                var q = $injector.get('$q');
                var location = $injector.get('$location');
                var sessionService = $injector.get('sessionService');

                var isPrivate = !(location.path() === '/inicio' || location.path() === '/registro' || location.path().includes('encuesta'));

                if (isPrivate && !sessionService.isValid()) {
                    location.path('/inicio');
                } else if (!rootScope.sessionData) {
                    sessionService.loadToRoot();
                }

                return response;
            }
        };
    }]);
})();
