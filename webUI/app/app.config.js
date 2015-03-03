(function () {
    'use strict';

    var app = angular.module('app');

    app.config(Configuration);

    Configuration.$inject = ['$logProvider', '$stateProvider', '$urlRouterProvider'];

    function Configuration($logProvider, $stateProvider, $urlRouterProvider) {
        $logProvider.debugEnabled(true);

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('app', {
                abstract: true,
                views: {
                    nav: {
                        templateUrl: '/app/shared/app_layout/navTemplate.html',
                        controller: 'NavController',
                        controllerAs: 'vm'
                    },
                    '': {
                        templateUrl: '/app/shared/app_layout/contentTemplate.html',
                        controller: 'ContentController',
                        controllerAs: 'vm'
                    },
                    sidebar: {
                        templateUrl: '/app/shared/app_layout/sidebarTemplate.html',
                        controller: 'SidebarController',
                        controllerAs: 'vm'
                    },
                    footer: {
                        templateUrl: '/app/shared/app_layout/footerTemplate.html',
                        controller: 'FooterController',
                        controllerAs: 'vm'
                    }
                }
            });
    }

    // Add extra properties to each state.
    app.run(['$rootScope', function ($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function (event, current) {
            $rootScope.title = current.title;
            $rootScope.bodyCss = current.bodyCss;
        });
    }]);

})();