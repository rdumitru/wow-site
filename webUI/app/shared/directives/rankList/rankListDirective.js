(function () {
    'use strict';

    angular.module('app.directives').directive('rankList', rankList);

    rankList.$inject = ['logger'];

    function rankList(logger) {
        return {
            //restrict: 'E',
            //templateUrl: '/WebUI/scripts/sections/app/reporting/dateRangePicker/date-range-picker.tmpl.html',
            //replace: true,
            //controller: 'DateRangePickerController',
            //controllerAs: 'vm',
            //bindToController: true, // IMPORTANT!
            //scope: {
            //    startDate: '=',
            //    endDate: '=',
            //    dateFormat: '='
            //},
            //link: link
        };

        function link(scope, element, attrs, ctrl) {
            logger.log(rankList, link, 'Configuring rank list.');

        }
    }
})();