(function() {
    'use strict';
    angular
        .module('pymeFbApp', [
            'ngRoute',
            'ui-notification',
            'flow',
            'validation.match',
            'ngMessages',
            'facebook',
            'ngCookies',
            'ngFileUpload'
        ]);
})();
