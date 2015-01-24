angular.module('vngame', ['ngAudio', 'ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('vngame').config(function($routeProvider) {

    $routeProvider.when('/play/:id',{templateUrl: 'partial/play/play.html'});
    $routeProvider.when('/start',{templateUrl: 'partial/splash/splash.html'});
    /* Add New Routes Above */
    $routeProvider.otherwise({redirectTo:'/start'});

});

angular.module('vngame').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
