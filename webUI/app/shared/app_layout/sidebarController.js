(function () {
    'use strict';

    angular.module('app').controller('SidebarController', SidebarController);

    SidebarController.$inject = ['logger'];

    function SidebarController(logger) {
        var vm = this;

        init();

        function init() {
            logger.log(SidebarController, init, 'Initializing...');
        }

    }
})();