(function() {
    'use strict';
    angular
        .module('pymeFbApp')
        .controller('AdminController', ['Notification', 'config', 'dataService', 'sessionService', '$location', '$rootScope','$routeParams', AdminController]);

    function AdminController(Notification, config, dataService, sessionService, $location, $rootScope, $routeParams) {
        var vm = this;

        vm.shared = false;
        vm.loading = false;

        vm.code = getURLParameter('code');
        vm.PymeID = $rootScope.sessionData.PymeID;

        dataService.getPyme(vm.PymeID).then(function(pyme){
          vm.business = pyme.data;
          $rootScope.business = vm.business;

          vm.socialLinks = [];
          console.log(vm.business.social);
          for(var x = 0, max = vm.business.social.length; x < max; x++) {
              var obj = {};
              obj.type = vm.business.social[x].type === 'Website' ? 'globe' : vm.business.social[x].type.toLowerCase();
              obj.name = vm.business.social[x].type === 'Website' ? 'Sitio Web' : vm.business.social[x].type;
              obj.url = vm.business.social[x].Link;
              vm.socialLinks.push(obj);
          }
        });

        vm.sharePost = function () {
          vm.loading = true;
          dataService.postToPyme(vm.PymeID).then(function(response){
              vm.shared = true;
              console.log(response);
              Notification.success('La encuesta fue compartida con exito');
          });
        }

        dataService.getUser($rootScope.sessionData.UsuarioId).then(function(user){
            vm.user = user.data;
        });

        vm.title = 'Panel de Métricas';

        vm.getCurrentDate = function() {
            var today = new Date(),
                dd = today.getDate(),
                mm = today.getMonth() + 1,
                yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }

            today = dd + '/' + mm + '/' + yyyy;
            console.log(today);
            return today;
        };

        vm.signOut = function() {
            sessionService.signOut(function() {
                $location.path('/inicio');
            });
        };
        
        $rootScope.signOut = vm.signOut;

        vm.getResults = function (data) {
          console.log(data);
        }

        function getURLParameter(name) {
          return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
        }

        Morris.Area({
            element: 'morris-area-chart',
            data: [{
                period: '2010 Q1',
                iphone: 2666,
                ipad: null,
                itouch: 2647
            }, {
                period: '2010 Q2',
                iphone: 2778,
                ipad: 2294,
                itouch: 2441
            }, {
                period: '2010 Q3',
                iphone: 4912,
                ipad: 1969,
                itouch: 2501
            }, {
                period: '2010 Q4',
                iphone: 3767,
                ipad: 3597,
                itouch: 5689
            }, {
                period: '2011 Q1',
                iphone: 6810,
                ipad: 1914,
                itouch: 2293
            }, {
                period: '2011 Q2',
                iphone: 5670,
                ipad: 4293,
                itouch: 1881
            }, {
                period: '2011 Q3',
                iphone: 4820,
                ipad: 3795,
                itouch: 1588
            }, {
                period: '2011 Q4',
                iphone: 15073,
                ipad: 5967,
                itouch: 5175
            }, {
                period: '2012 Q1',
                iphone: 10687,
                ipad: 4460,
                itouch: 2028
            }, {
                period: '2012 Q2',
                iphone: 8432,
                ipad: 5713,
                itouch: 1791
            }],
            xkey: 'period',
            ykeys: ['iphone', 'ipad', 'itouch'],
            labels: ['iPhone', 'iPad', 'iPod Touch'],
            pointSize: 2,
            hideHover: 'auto',
            resize: true
        });

        Morris.Donut({
            element: 'morris-donut-chart',
            data: [{
                label: "Mujeres",
                value: 65
            }, {
                label: "Hombres",
                value: 35
            }],
            resize: true
        });

        Morris.Bar({
            element: 'morris-bar-chart',
            data: [{
                y: '2006',
                a: 100,
                b: 90
            }, {
                y: '2007',
                a: 75,
                b: 65
            }, {
                y: '2008',
                a: 50,
                b: 40
            }],
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Series A', 'Series B'],
            hideHover: 'auto',
            resize: true
        });
    };
})();
