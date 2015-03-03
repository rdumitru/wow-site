(function () {
    'use strict';

    angular.module('app.services').factory('wowService', WowService);

    WowService.$inject = ['$http', 'cache', 'promiseProvider', 'globalConstants', 'globalEnum', 'api', 'logger'];

    function WowService($http, cache, promiseProvider, globalConstants, globalEnum, api, logger) {
        //=====================================================================
        // Local variables.
        //=====================================================================
        var callbackCount = 0;

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
                callback: 'angular.callbacks._' + callbackCount,
                jsonp: 'JSON_CALLBACK'
            });
            callbackCount++;

            // Pay attention to this!
            if (/character/.test(path)) {
                delete params.callback;
            }

            return $http.jsonp(rootUrl + path, { params: params });
        }

        //=====================================================================
        // Cache keys.
        //=====================================================================
        var classesKey = 'classes';
        var racesKey = 'races';
        var talentsKey = 'talents';

        //=====================================================================
        // Public functions.
        //=====================================================================
        function getClasses() {
            var classes = cache.load(classesKey);
            if (classes) {
                logger.debug(WowService, getClasses, 'Retrieving from cache.');
                return promiseProvider.promiseFromObj(classes);
            }

            logger.debug(WowService, getClasses, 'Calling service.');
            return bnetRequest(api.route(api.wow.data.classes))
                .then(function (response) {
                    cache.store(classesKey, response);
                    return response;
                });
        }

        function getRaces() {
            var races = cache.load(racesKey);
            if (races) {
                logger.debug(WowService, getRaces, 'Retrieving from cache.');
                return promiseProvider.promiseFromObj(races);
            }

            logger.debug(WowService, getRaces, 'Calling service.');
            return bnetRequest(api.route(api.wow.data.races))
                .then(function (response) {
                    cache.store(racesKey, response);
                    return response;
                });
        }

        function getTalents() {
            var talents = cache.load(talentsKey);
            if (talents) {
                logger.debug(WowService, getTalents, 'Retrieving from cache.');
                return promiseProvider.promiseFromObj(talents);
            }

            logger.debug(WowService, getTalents, 'Calling service.');
            return bnetRequest(api.route(api.wow.data.talents))
                .then(function (response) {
                    cache.store(talentsKey, response);
                    return response;
                });
        }

        function getPvpLeaderboard(bracket, region) {
            return bnetRequest(api.route(api.wow.pvp.leaderboard, { bracket: bracket.enumVal }), region);
        }

        //=====================================================================
        // Expose functions.
        //=====================================================================
        return {
            getClasses: getClasses,
            getRaces: getRaces,
            getTalents: getTalents,
            getPvpLeaderboard: getPvpLeaderboard
        };
    }

})();