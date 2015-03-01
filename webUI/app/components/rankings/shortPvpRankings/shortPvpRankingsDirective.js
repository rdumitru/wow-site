(function () {
    'use strict';

    angular.module('app.rankings').directive('shortPvpRankings', ShortPvpRankingsDirective);

    ShortPvpRankingsDirective.$inject = ['logger'];

    function ShortPvpRankingsDirective(logger) {
        return {
            restrict: 'E',
            templateUrl: '/app/components/rankings/shortPvpRankings/shortPvpRankingsTemplate.html',
            replace: true,
            controller: 'ShortPvpRankingsController',
            controllerAs: 'vm',
            bindToController: true,
            scope: {
            },
            link: link
        };

        function link(scope, element, attrs, ctrl) {
            logger.log(ShortPvpRankingsDirective, link, 'Configuring.');

        }
    }
})();