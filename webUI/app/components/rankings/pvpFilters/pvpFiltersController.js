(function () {
    'use strict';

    angular.module('app.rankings').controller('PvpFiltersController', PvpFiltersController);

    PvpFiltersController.$inject = ['logger', 'globalEnum'];

    function PvpFiltersController(logger, globalEnum) {
        var vm = this;

        //=====================================================================
        // Exposed variables.
        //=====================================================================

        //=====================================================================
        // Initialization.
        //=====================================================================
        init();

        function init() {
            logger.debug(PvpFiltersController, init, 'Initializing...');

            // Initialize enum lists.
            vm.regions = _.values(globalEnum.region);
            vm.region = vm.regions[0];

            vm.brackets = _.values(globalEnum.bracket);
            vm.bracket = vm.brackets[0];

            // Initialize filters.
            vm.filters = {
                visible: false
            };

            vm.outputFilters.test = 'test';
        }

    }
})();