(function () {
    'use strict';

    angular.module('app.home').controller('HomeController', HomeController);

    HomeController.$inject = ['logger', 'iconProvider', 'wowService', 'globalEnum'];

    function HomeController(logger, iconProvider, wowService, globalEnum) {
        var vm = this;

        init();

        function init() {
            logger.log(HomeController, init, 'Initializing...');

            vm.link = iconProvider.iconLink('inv_fabric_netherweave_bolt', 56);

            wowService.getRaces()
                .then(function (data) {
                    debugger;
                    alert('It worked!');
                });
        }

    }
})();