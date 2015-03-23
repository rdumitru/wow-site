(function () {
    'use strict';

    angular.module('app.rankings').controller('PvpFiltersController', PvpFiltersController);

    PvpFiltersController.$inject = ['$scope', 'logger', 'globalEnum', 'wowService'];

    function PvpFiltersController($scope, logger, globalEnum, wowService) {
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

            // Fetch regions and brackets.
            vm.regions = _.values(globalEnum.region);
            vm.brackets = _.values(globalEnum.bracket);
            vm.factions = _.values(globalEnum.faction);

            // Fetch realm list for a given region.
            $scope.$watch('vm.region', function (newRegion) {
                if (vm.regions.indexOf(newRegion) >= 0) {
                    wowService.getOfflineRealmStatuses(newRegion)
                        .then(function (response) {
                            vm.realms = response.data.realms;
                        });
                }
            });

            // Set initial region and bracket (also triggers watch).
            vm.region = vm.regions[0];
            vm.bracket = vm.brackets[0];

            // Initialize filters.
            vm.filters = {
                visible: false
            };

            // TODO: set active tabs on hover effect to none.
            // TODO: set these when button is clicked.
            vm.outputFilters.test = 'test';
        }

    }
})();