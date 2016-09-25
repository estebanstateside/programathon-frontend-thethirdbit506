(function() {
    'use strict';

    angular
        .module('pymeFbApp')
        .constant('constants', {
            api: 'http://thethirdbit.space/index.php/rest',
            messages: {
                error: '¡Hubo un error, trate más tarde!',
                required: '¡Faltan algunos campos requeridos!'
            }
        });
})();
