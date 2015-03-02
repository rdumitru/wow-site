(function () {
    'use strict';

    angular.module('app.home').controller('HomeController', HomeController);

    HomeController.$inject = ['logger', 'iconProvider', 'wowService', 'globalEnum', 'cache'];

    function HomeController(logger, iconProvider, wowService, globalEnum, cache) {
        var vm = this;
        vm.globalEnum = globalEnum;

        init();

        function init() {
            logger.log(HomeController, init, 'Initializing...');

            wowService.getRaces()
                .then(function (response) {
                    // alert(response.data.races[0].name);
                });

            wowService.getClasses()
                .then(function (response) {
                    // alert(response.data.classes[0].name);
                });

            //wowService.getPvpLeaderboard(globalEnum.bracket.TwoVsTwo, globalEnum.region.EU)
            //    .then(function (response) {
            //
            //    });

            iconProvider.raceIconPromise(globalEnum.race.Human.blizzId, 1, globalEnum.iconSize.Large)
                .then(function (response) {

                });

            iconProvider.specIconPromise(252, globalEnum.iconSize.Large)
                .then(function (response) {

                });
        }
    }
})();