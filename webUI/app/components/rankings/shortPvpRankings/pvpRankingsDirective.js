(function () {
    'use strict';

    angular.module('app.rankings').directive('pvpRankings', PvpRankingsDirective);

    PvpRankingsDirective.$inject = ['logger'];

    function PvpRankingsDirective(logger) {
        return {
            restrict: 'E',
            templateUrl: '/app/components/rankings/shortPvpRankings/pvpRankingsTemplate.html',
            replace: true,
            controller: 'PvpRankingsController',
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                bracket: '=',
                region: '=',
                optionalPageSize: '=pageSize'
            },
            link: link
        };

        function link(scope, element, attrs, ctrl) {
            logger.debug(PvpRankingsDirective, link, 'Configuring.');
        }
    }
})();