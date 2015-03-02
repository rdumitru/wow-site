(function () {
    'use strict';

    angular.module('app.rankings').controller('PvpRankingsController', PvpRankingsController);

    PvpRankingsController.$inject = ['wowService', 'iconProvider', 'globalEnum', 'logger'];

    function PvpRankingsController(wowService, iconProvider, globalEnum, logger) {
        var vm = this;

        // Constants.
        vm.iconSize = globalEnum.iconSize.Small;

        init();

        function init() {
            logger.log(PvpRankingsController, init, 'Initializing.');

            // Set the panel title.
            vm.headerText = vm.bracket.displayLong + ' - ' + vm.region.displayLong;

            // Set the page details.
            vm.pageNo = 1;
            vm.pageSize = vm.optionalPageSize;
            if (!vm.pageSize) {
                vm.pageSize = 5;
            }

            // Get the leaderboard.
            wowService.getPvpLeaderboard(vm.bracket, vm.region)
                .then(function (response) {
                    debugger;
                    vm.leaderboard = response.data.rows;
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

                iconProvider.classIconPromise(item.classId, vm.iconSize)
                    .then(function (response) {
                        entry.classIconLink = response.link;
                    });

                iconProvider.raceIconPromise(item.raceId, item.genderId, vm.iconSize)
                    .then(function (response) {
                        entry.raceIconLink = response.link;
                    });

                iconProvider.specIconPromise(item.specId, vm.iconSize)
                    .then(function (response) {
                        entry.specIconLink = response.link;
                    });

                vm.pageData.push(entry);
            });

            // TODO: disable reponsiveness and add a min width.
            // TODO: write a pagination directive.
            // TODO: write a wow data service to retrieve
        }

    }
})();