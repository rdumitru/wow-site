(function () {
    'use strict';

    angular.module('app.rankings').controller('PvpRankingsController', PvpRankingsController);

    PvpRankingsController.$inject = ['$scope', 'wowService', 'iconProvider', 'globalEnum', 'logger'];

    function PvpRankingsController($scope, wowService, iconProvider, globalEnum, logger) {
        var vm = this;

        // Exposed functions.
        vm.loadPage = loadPage;

        // Constants.
        vm.iconSize = globalEnum.iconSize.Small;

        init();

        function init() {
            logger.debug(PvpRankingsController, init, 'Initializing.');
            vm.loadingCount = 0;

            // Set the panel title.
            vm.headerText = vm.bracket.displayLong + ' - ' + vm.region.displayLong;

            // Set the page details.
            vm.pageNumber = 1;
            vm.pageSize = vm.optionalPageSize;
            if (!vm.pageSize) {
                vm.pageSize = 5;
            }

            // Get the leaderboard.
            vm.loadingCount++;
            wowService.getPvpLeaderboard(vm.bracket, vm.region)
                .then(function (response) {
                    vm.leaderboard = response.data.rows;
                    vm.loadPage();
                    vm.loadingCount--;
                });

            // Delay the table display, wait for all images to load.
            vm.loadingCount++;
            _.delay(function() {
                $scope.$apply(function () {
                    vm.loadingCount--;
                });
            }, 2000);
        }

        //=====================================================================
        // Helper functions.
        //=====================================================================
        function loadPage() {
            var minPageNumber = 1;
            var maxPageNumber = Math.ceil(vm.leaderboard.length / vm.pageSize);

            if (vm.pageNumber < minPageNumber || vm.pageNumber > maxPageNumber) {
                logger.warn(PvpRankingsController, loadPage, 'Invalid page number: ' + vm.pageNumber + '. Clamping to array edge.');
                vm.pageNumber = Math.min(Math.max(vm.pageNumber, minPageNumber), maxPageNumber);
            }

            var leaderboardSlice = vm.leaderboard.slice((vm.pageNumber - 1) * vm.pageSize, vm.pageNumber * vm.pageSize);
            vm.pageData = [];

            _.forEach(leaderboardSlice, function (item) {
                var entry = {
                    ranking: item.ranking,
                    name: item.name,
                    realm: item.realmName,
                    factionIconLink: iconProvider.factionIconLink(item.factionId, vm.iconSize),
                    factionDisplay: item.factionId === 0 ? 'Alliance' : 'Horde',
                    wins: item.seasonWins,
                    losses: item.seasonLosses,
                    rating: item.rating
                };

                vm.loadingCount++;
                wowService.getClass(item.classId)
                    .then(function (response) {
                        entry.classIconLink = response.data.class.iconLink(vm.iconSize);
                        entry.classDisplay = response.data.class.name;
                        entry.classCssClass = response.data.class.cssClass;
                        vm.loadingCount--;
                    });

                vm.loadingCount++;
                wowService.getRace(item.raceId, item.genderId)
                    .then(function (response) {
                        entry.raceIconLink = response.data.race.iconLink(vm.iconSize);
                        entry.raceDisplay = response.data.race.name;
                        vm.loadingCount--;
                    });

                vm.loadingCount++;
                wowService.getSpec(item.specId)
                    .then(function (response) {
                        entry.specIconLink = response.data.spec.iconLink(vm.iconSize);
                        entry.specDisplay = response.data.spec.name;
                        vm.loadingCount--;
                    });

                vm.pageData.push(entry);;
            });
        }
    }
})();