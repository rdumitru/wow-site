(function () {
    'use strict';

    angular.module('app.services').factory('wowService', WowService);

    WowService.$inject = ['$http', 'globalConstants', 'globalEnum', 'api', 'logger'];

    function WowService($http, globalConstants, globalEnum, api, logger) {
        //=====================================================================
        // Public functions.
        //=====================================================================
        function getClasses() {
            return bnetRequest(api.route(api.wow.data.classes));
        }

        function getRaces() {
            return bnetRequest(api.route(api.wow.data.races));
        }

        function getPvpLeaderboard(pvpBracket, region) {
            return bnetRequest(api.route(api.wow.pvp.leaderboard, {pvpBracket: pvpBracket.enumVal}), region);
        }

        //=====================================================================
        // Helper functions.
        //=====================================================================
        function getRootUrl(region) {
            if (region === globalEnum.region.US) {
                return globalConstants.BNET_ROOT_US;
            }

            // Return EU by default.
            return globalConstants.BNET_ROOT_EU;
        }

        function bnetRequest (path, region, params) {
            var rootUrl = getRootUrl(region);

            params = params || {};
            params = angular.extend(params, {
                // apiKey: /* API_KEY */,
                // locale: /* LOCALE */,
                callback: 'JSON_CALLBACK',
                jsonp: 'JSON_CALLBACK'
            });

            // Pay attention to this!
            if (/character/.test(path)) {
                delete params.callback;
            }

            return $http.jsonp(rootUrl + path, { params: params});
        }

        //=====================================================================
        // Expose functions.
        //=====================================================================
        return {
            getClasses: getClasses,
            getRaces: getRaces,
            getPvpLeaderboard: getPvpLeaderboard
        };
    }

})();