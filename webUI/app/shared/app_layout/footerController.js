(function () {
    'use strict';

    angular.module('app').controller('FooterController', FooterController);

    FooterController.$inject = ['logger'];

    function FooterController(logger) {
        var vm = this;

        init();

        function init() {
            logger.debug(FooterController, init, 'Initializing...');
        }

    }
})();