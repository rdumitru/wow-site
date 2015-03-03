(function () {
    'use strict';

    angular.module('app').controller('ContentController', ContentController);

    ContentController.$inject = ['logger'];

    function ContentController(logger) {
        var vm = this;

        init();

        function init() {
            logger.debug(ContentController, init, 'Initializing...');
        }

    }
})();