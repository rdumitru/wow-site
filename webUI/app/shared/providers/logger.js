(function () {
    'use strict';

    angular.module('app.providers').factory('logger', Logger);

    Logger.$inject = ['$log'];

    function Logger($log) {
        //=====================================================================
        // Exposed functions.
        //=====================================================================
        function debug(ctrl, func, msg) {
            $log.debug(buildMsg(ctrl, func, msg));
        }

        function error(ctrl, func, msg) {
            $log.error(buildMsg(ctrl, func, msg));
        }

        function info(ctrl, func, msg) {
            $log.info(buildMsg(ctrl, func, msg));
        }

        function log(ctrl, func, msg) {
            $log.log(buildMsg(ctrl, func, msg));
        }

        function warn(ctrl, func, msg) {
            $log.warn(buildMsg(ctrl, func, msg));
        }

        //=====================================================================
        // Helper functions.
        //=====================================================================
        function buildMsg(ctrl, func, msg) {
            return ctrl.name + ' -> ' + func.name + '(): ' + msg;
        }

        //=====================================================================
        // Expose functions.
        //=====================================================================
        return {
            debug: debug,
            error: error,
            info: info,
            log: log,
            warn: warn
        };
    }

})();