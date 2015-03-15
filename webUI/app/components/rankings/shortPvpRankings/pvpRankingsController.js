(function () {
    'use strict';

    angular.module('app.rankings').controller('PvpRankingsController', PvpRankingsController);

    PvpRankingsController.$inject = ['$scope', 'wowService', 'iconProvider', 'globalEnum', 'logger'];

    function PvpRankingsController($scope, wowService, iconProvider, globalEnum, logger) {
        var vm = this;

        // Exposed functions.
        vm.loadPage = loadPage;
        vm.sortBy = sortBy;

        // Exposed variables.
        vm.headers = [{
            display: '#',
            key: 'ranking'
        }, {
            display: 'Class',
            key: 'classId'
        }, {
            display: 'Spec',
            key: 'specId'
        }, {
            display: 'Race',
            key: 'raceId'
        }, {
            display: 'Player',
            key: 'name',
            cssClass: 'col-md-2'
        }, {
            display: 'Realm',
            key: 'realmName',
            cssClass: 'col-md-2'
        }, {
            display: 'Faction',
            key: 'factionId'
        }, {
            display: 'Wins',
            key: 'seasonWins'
        }, {
            display: 'Losses',
            key: 'seasonLosses'
        }, {
            display: 'Rating',
            key: 'classId'
        }];

        vm.sortByOpt = {
            key: null,
            isAscending: true
        };

        // Constants.
        var ICON_SIZE = globalEnum.iconSize.Small;

        //=====================================================================
        // Initialization.
        //=====================================================================
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
                    vm.sortBy(vm.headers[0].key);
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
        // Functions implementation.
        //=====================================================================
        function loadPage() {
            vm.pageData = [];

            var minPageNumber = 1;
            var maxPageNumber = Math.ceil(vm.leaderboard.length / vm.pageSize);
            if (vm.pageNumber < minPageNumber || vm.pageNumber > maxPageNumber) {
                logger.warn(PvpRankingsController, loadPage, 'Invalid page number: ' + vm.pageNumber + '. Clamping to array edge.');
                vm.pageNumber = Math.min(Math.max(vm.pageNumber, minPageNumber), maxPageNumber);
            }

            vm.startIndex = Math.max((vm.pageNumber - 1) * vm.pageSize, 0);
            vm.endIndex = Math.min(vm.pageNumber * vm.pageSize, vm.leaderboard.length);
            var leaderboardSlice = vm.leaderboard.slice(vm.startIndex, vm.endIndex);

            _.forEach(leaderboardSlice, function (item) {
                var entry = {
                    ranking: item.ranking,
                    name: item.name,
                    realm: item.realmName,
                    factionIconLink: iconProvider.factionIconLink(item.factionId, ICON_SIZE),
                    factionDisplay: item.factionId === 0 ? 'Alliance' : 'Horde',
                    wins: item.seasonWins,
                    losses: item.seasonLosses,
                    rating: item.rating
                };

                vm.loadingCount++;
                wowService.getClass(item.classId)
                    .then(function (response) {
                        entry.classIconLink = response.data.class.iconLink(ICON_SIZE);
                        entry.classDisplay = response.data.class.name;
                        entry.classCssClass = response.data.class.cssClass;
                        vm.loadingCount--;
                    });

                vm.loadingCount++;
                wowService.getRace(item.raceId, item.genderId)
                    .then(function (response) {
                        entry.raceIconLink = response.data.race.iconLink(ICON_SIZE);
                        entry.raceDisplay = response.data.race.name;
                        vm.loadingCount--;
                    });

                vm.loadingCount++;
                wowService.getSpec(item.specId)
                    .then(function (response) {
                        entry.specIconLink = response.data.spec.iconLink(ICON_SIZE);
                        entry.specDisplay = response.data.spec.name;
                        vm.loadingCount--;
                    });

                vm.pageData.push(entry);
            });
        }

        function sortBy(key) {
            if (key === vm.sortByOpt.key) {
                vm.sortByOpt.isAscending = !vm.sortByOpt.isAscending;
            } else {
                vm.sortByOpt.isAscending = true;
            }

            vm.sortByOpt.key = key;

            vm.leaderboard = _.sortBy(vm.leaderboard, 'name');
            vm.leaderboard = _.sortBy(vm.leaderboard, vm.sortByOpt.key);
            if (!vm.sortByOpt.isAscending) vm.leaderboard.reverse();

            logger.debug(PvpRankingsController, sortBy, 'Sorting by \"' + key + '\" (' + vm.sortByOpt.isAscending + ').');
            vm.loadPage();
        }

        // TODO: add logging.
        // TODO: fix table headers carets.
        // TODO: fix range display in footer.
    }
})();