(function () {
    'use strict';

    angular.module('app.rankings').controller('PvpFiltersController', PvpFiltersController);

    PvpFiltersController.$inject = ['$scope', 'logger', 'globalEnum', 'wowService'];

    function PvpFiltersController($scope, logger, globalEnum, wowService) {
        var vm = this;

        //=====================================================================
        // Exposed functions.
        //=====================================================================
        vm.toggleSpecs = toggleSpecs;
        vm.clear = clear;
        vm.filter = filter;

        //=====================================================================
        // Initialization.
        //=====================================================================
        init();

        function init() {
            logger.debug(PvpFiltersController, init, 'Initializing...');

            // Fetch data from the global enum.
            vm.regions = _.values(globalEnum.region);
            vm.brackets = _.values(globalEnum.bracket);
            vm.factions = _.values(globalEnum.faction);

            // Fetch realm list for a given region.
            $scope.$watch('vm.region', function (newRegion) {
                if (vm.regions.indexOf(newRegion) >= 0) {
                    wowService.getOfflineRealmStatuses(newRegion)
                        .then(function (response) {
                            vm.realms = response.data.realms;
                            vm.filters.realm = null;
                        });
                }
            });

            // Set initial region and bracket (also triggers watch).
            vm.region = vm.regions[0];
            vm.bracket = vm.brackets[0];

            // Populate classes and specs list.
            // TODO: load these only when opening filters.
            vm.classes = [];
            _.forOwn(globalEnum.class, function (classEnumItem) {
                var newClass = {};
                vm.classes.push(newClass);

                wowService.getClass(classEnumItem.blizzId)
                    .then(function (response) {
                        newClass.class = response.data.class;
                        newClass.class.iconLink = newClass.class.iconLink(globalEnum.iconSize.Small);
                    });

                _.forEach(classEnumItem.specIds, function (specId) {
                    newClass.specs = [];
                    wowService.getSpec(specId)
                        .then(function (response) {
                            var spec = response.data.spec;
                            spec.id = specId;
                            spec.iconLink = spec.iconLink(globalEnum.iconSize.Small);
                            newClass.specs.push(spec);
                        });
                });
            });

            // Initialize the filters.
            clear();
        }

        //=====================================================================
        // Exposed functions implementation.
        //=====================================================================
        function toggleSpecs(classObj) {
            var sum = 0;
            _.forEach(classObj.specs, function (spec) {
               sum += (spec.selected ? 1 : 0);
            });

            var selectedVal = (sum !== classObj.specs.length);
            _.forEach(classObj.specs, function (spec) {
                spec.selected = selectedVal;
            });

            logger.debug(PvpFiltersController, toggleSpecs, 'Setting all specs for \"' + classObj.class.name + '\" to ' + selectedVal + '.');
        }

        function clear() {
            logger.debug(PvpFiltersController, clear, 'Clearing filters...');

            vm.filters = {
                visible: vm.filters ? vm.filters.visible : false,
                specs: {
                    visible: false,
                    ids: []
                }
            };

            _.forEach(vm.classes, function (classObj) {
                _.forEach(classObj.specs, function (spec) {
                    spec.selected = false;
                });
            });
        }

        function filter() {
            logger.debug(PvpFiltersController, filter, 'Filtering...');
            if (!vm.filters.visible) return;

            vm.filters.specs.ids = [];
            if (vm.filters.specs.visible) {
                _.forEach(vm.classes, function (classObj) {
                    _.forEach(classObj.specs, function (spec) {
                        if (spec.selected) {
                            vm.filters.specs.ids.push(spec.id);
                        }
                    });
                });
            }

            vm.outputFilters = _.clone(vm.filters, true);
        }
    }
})();