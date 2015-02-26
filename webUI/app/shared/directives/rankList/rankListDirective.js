(function () {
    'use strict';

    angular.module('app.directives').directive('rankList', rankList);

    rankList.$inject = ['logger'];

    function rankList(logger) {
        return {
            restrict: 'E',
            templateUrl: '/app/shared/directives/rankList/rankListTemplate.html',
            //replace: true,
            //controller: 'DateRangePickerController',
            //controllerAs: 'vm',
            //bindToController: true, // IMPORTANT!
            scope: {
            },
            link: link
        };

        function link(scope, element, attrs, ctrl) {
            logger.log(rankList, link, 'Configuring rank list.');

        }
    }
})();