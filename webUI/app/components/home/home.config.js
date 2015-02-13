(function () {
    'use strict';

    angular.module('app.home').config(Configuration);

    Configuration.$inject = ['$stateProvider'];

    function Configuration($stateProvider) {
        $stateProvider
            .state('app.home', {
                url: '/home',
                templateUrl: '/app/components/home/homeView.html',
                controller: 'HomeController',
                controllerAs: 'vm',
                title: 'Home',
                bodyCss: "home"
            });
    }

})();