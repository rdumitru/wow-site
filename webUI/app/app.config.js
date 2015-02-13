(function () {
    'use strict';

    angular.module('app').config(Configuration)
        .run(['$rootScope', function ($rootScope) {
            $rootScope.$on('$stateChangeSuccess', function(event, current) {
                debugger;
                $rootScope.title = current.title;
                $rootScope.bodyCss = current.bodyCss;
            });
        }]);

    Configuration.$inject = ['$stateProvider', '$urlRouterProvider'];

    function Configuration($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('app', {
                abstract: true,
                views: {
                    nav: {
                        templateUrl: '/app/shared/views/nav.html',
                        controller: 'NavController',
                        controllerAs: 'vm'
                    },
                    '': {
                        templateUrl: '/app/shared/views/content.html',
                        controller: 'ContentController',
                        controllerAs: 'vm'
                    },
                    footer: {
                        templateUrl: '/app/shared/views/footer.html',
                        controller: 'FooterController',
                        controllerAs: 'vm'
                    }
                }
            });
    }

})();