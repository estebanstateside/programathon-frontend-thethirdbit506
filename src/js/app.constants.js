(function() {
    'use strict';

    angular
        .module('pymeFbApp')
        .constant('constants', {
            api: 'http://thethirdbit.space/index.php/rest',
            messages: {
                error: '¡Hubo un error, trate más tarde!',
                required: '¡Faltan algunos campos requeridos!',
                encuesta: '¡Todas las preguntas son requeridas!',
                disable_pyme: '¿Desea desactivar la PYME?',
                errorFile: 'La imagen seleccionada excede el limite de peso o el formato no es jpg o png.'
            }
        });
})();
