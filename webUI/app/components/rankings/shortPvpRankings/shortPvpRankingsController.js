(function () {
    'use strict';

    angular.module('app.rankings').controller('ShortPvpRankingsController', ShortPvpRankingsController);

    ShortPvpRankingsController.$inject = ['logger'];

    function ShortPvpRankingsController(logger) {
        var vm = this;

        init();

        function init() {
            logger.log(ShortPvpRankingsController, init, 'Initializing.')
        }

    }
})();