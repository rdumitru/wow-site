(function () {
    'use strict';

    angular.module('app.home').controller('HomeController', HomeController);

    HomeController.$inject = ['logger', 'iconProvider', 'wowService', 'globalEnum', 'cache'];

    function HomeController(logger, iconProvider, wowService, globalEnum, cache) {
        var vm = this;

        init();

        function init() {
            logger.log(HomeController, init, 'Initializing...');

            vm.link = iconProvider.iconLink('inv_fabric_netherweave_bolt', 56);

            wowService.getRaces()
                .then(function (response) {
                    alert(response.data.races[0].name);
                });

            wowService.getClasses()
                .then(function (response) {
                    alert(response.data.classes[0].name);
                });
        }
    }
})();