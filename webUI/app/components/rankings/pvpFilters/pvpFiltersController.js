(function () {
    'use strict';

    angular.module('app.rankings').controller('PvpFiltersController', PvpFiltersController);

    PvpFiltersController.$inject = ['logger'];

    function PvpFiltersController(logger) {
        var vm = this;

        init();

        function init() {
            logger.debug(PvpFiltersController, init, 'Initializing...');

        }

    }
})();