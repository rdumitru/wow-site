(function () {
    'use strict';

    var app = angular.module('app');

    app.config(Configuration);

    Configuration.$inject = ['$stateProvider', '$urlRouterProvider'];

    function Configuration($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('app', {
                abstract: true,
                views: {
                    nav: {
                        templateUrl: '/app/shared/app_layout/navView.html',
                        controller: 'NavController',
                        controllerAs: 'vm'
                    },
                    '': {
                        templateUrl: '/app/shared/app_layout/contentView.html',
                        controller: 'ContentController',
                        controllerAs: 'vm'
                    },
                    footer: {
                        templateUrl: '/app/shared/app_layout/footerView.html',
                        controller: 'FooterController',
                        controllerAs: 'vm'
                    }
                }
            });
    }

    app.run(['$rootScope', function ($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function(event, current) {
            $rootScope.title = current.title;
            $rootScope.bodyCss = current.bodyCss;
        });
    }]);

})();