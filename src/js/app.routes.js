(function() {
    'use strict';
    angular
        .module('app')
        .config(function($locationProvider, $routeProvider) {
            $routeProvider
                .when('/', {
                    template: 'index.html'
                })
                .otherwise({
                    redirectTo: '/'
                });
            $locationProvider.html5Mode(true).hashPrefix('!');
        });
})();
