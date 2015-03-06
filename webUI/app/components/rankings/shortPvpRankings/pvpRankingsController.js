(function () {
    'use strict';

    angular.module('app.rankings').controller('PvpRankingsController', PvpRankingsController);

    PvpRankingsController.$inject = ['$scope', 'wowService', 'iconProvider', 'globalEnum', 'logger'];

    function PvpRankingsController($scope, wowService, iconProvider, globalEnum, logger) {
        var vm = this;

        // Constants.
        vm.iconSize = globalEnum.iconSize.Small;

        init();

        function init() {
            logger.debug(PvpRankingsController, init, 'Initializing.');
            vm.loadingCount = 0;

            // Set the panel title.
            vm.headerText = vm.bracket.displayLong + ' - ' + vm.region.displayLong;

            // Set the page details.
            vm.pageNo = 1;
            vm.pageSize = vm.optionalPageSize;
            if (!vm.pageSize) {
                vm.pageSize = 5;
            }

            // Get the leaderboard.
            vm.loadingCount++;
            wowService.getPvpLeaderboard(vm.bracket, vm.region)
                .then(function (response) {
                    vm.leaderboard = response.data.rows;
                    vm.loadingCount--;
                    loadPage(1);
                });
        }

        //=====================================================================
        // Helper functions.
        //=====================================================================
        function loadPage(pageNo) {
            if (pageNo < 1 || pageNo > (vm.leaderboard.length / vm.pageSize)) {
                logger.warn(PvpRankingsController, loadPage, 'Invalid page number: ' + pageNo + '. Clamping to array edge.');
            }

            var leaderboardSlice = vm.leaderboard.slice((pageNo - 1) * vm.pageSize, pageNo * vm.pageSize);
            vm.pageData = [];

            _.forEach(leaderboardSlice, function (item) {
                var entry = {
                    ranking: item.ranking,
                    name: item.name,
                    realm: item.realmName,
                    factionIconLink: iconProvider.factionIconLink(item.factionId, vm.iconSize),
                    wins: item.seasonWins,
                    losses: item.seasonLosses,
                    rating: item.rating
                };

                vm.loadingCount++;
                wowService.getClass(item.classId)
                    .then(function (response) {
                        entry.classIconLink = response.data.class.iconLink(vm.iconSize);
                        entry.cssClass = response.data.class.cssClass;
                        vm.loadingCount--;
                    });

                vm.loadingCount++;
                wowService.getRace(item.raceId, item.genderId)
                    .then(function (response) {
                        entry.raceIconLink = response.data.race.iconLink(vm.iconSize);
                        vm.loadingCount--;
                    });

                vm.loadingCount++;
                wowService.getSpec(item.specId)
                    .then(function (response) {
                        entry.specIconLink = response.data.spec.iconLink(vm.iconSize);
                        vm.loadingCount--;
                    });

                vm.pageData.push(entry);
            });

            // TODO: add shadoes to all panels to make contents seem in a well.
            // TODO: write a pagination directive.
            // TODO: figure out angular animations.
            // TODO: ng-show with delay.
            // TODO: change content type in bnetRequest.
        }

    }
})();