(function () {
    'use strict';

    angular.module('app').controller('NavController', NavController);

    NavController.$inject = ['logger'];

    function NavController(logger) {
        var vm = this;

        init();

        function init() {
            logger.debug(NavController, init, 'Initializing...');
        }

    }
})();