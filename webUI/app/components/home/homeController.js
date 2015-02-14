(function () {
    'use strict';

    angular.module('app.home').controller('HomeController', HomeController);

    HomeController.$inject = ['logger'];

    function HomeController(logger) {
        var vm = this;

        init();

        function init() {
            logger.log(HomeController, init, 'Initializing...');
        }

    }
})();