(function() {
    'use strict';
    angular
        .module('pymeFbApp')
        .config(function($locationProvider, $routeProvider, $httpProvider) {
            $routeProvider
                .when('/inicio', {
                    templateUrl: 'views/bootstrap-dashboard/login.html',
                    controller: 'LoginController',
                    controllerAs: 'login'
                })

                .when('/registro', {
                    templateUrl: 'views/register.html',
                    controller: 'RegisterController',
                    controllerAs: 'register'
                })

                .when('/administrador', {
                    templateUrl: 'views/dashboard.html',
                    controller: 'AdminController',
                    controllerAs: 'admin'
                })
                .otherwise({
                    redirectTo: '/registro'
                });
            $locationProvider.html5Mode(false);

            $httpProvider.interceptors.push([
              '$injector',
              function ($injector) {
                return $injector.get('AuthInterceptor');
              }
            ]);
        })
        .factory('AuthInterceptor', function ($rootScope, $q) {
          return {
            request: function (response) {
              console.log('before sending');
              console.log(response);
              return response;
            }
          };
        });
})();
