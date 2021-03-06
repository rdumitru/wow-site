(function () {
    'use strict';

    angular.module('app.services').factory('wowService', WowService);

    WowService.$inject = ['$http', '$q', 'cache', 'promiseProvider', 'iconProvider', 'globalConstants', 'globalEnum', 'api', 'logger'];

    function WowService($http, $q, cache, promiseProvider, iconProvider, globalConstants, globalEnum, api, logger) {
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

            logger.debug(WowService, bnetRequest, 'Calling service: \"' + path + '\".');
            return $http.jsonp(rootUrl + path, { params: params });
        }

        //=====================================================================
        // Cache keys.
        //=====================================================================
        var classesKey = 'classes';
        var racesKey = 'races';
        var talentsKey = 'talents';
        var realmsKey = 'realms';

        //=====================================================================
        // Public functions.
        //=====================================================================
        function getClasses() {
            var classes = cache.load(classesKey);

            if (classes) {
                return promiseProvider.promiseFromObj(classes);
            }

            return bnetRequest(api.route(api.wow.data.classes))
                .then(function (response) {
                    cache.store(classesKey, response);
                    return response;
                });
        }

        function getRaces() {
            var races = cache.load(racesKey);

            if (races) {
                return promiseProvider.promiseFromObj(races);
            }

            return bnetRequest(api.route(api.wow.data.races))
                .then(function (response) {
                    cache.store(racesKey, response);
                    return response;
                });
        }

        function getTalents() {
            var talents = cache.load(talentsKey);

            if (talents) {
                return promiseProvider.promiseFromObj(talents);
            }

            return bnetRequest(api.route(api.wow.data.talents))
                .then(function (response) {
                    cache.store(talentsKey, response);
                    return response;
                });
        }

        function getClass(classBlizzId) {
            var deferred = $q.defer();

            getClasses()
                .then(function (response) {
                    var classObj = _.find(response.data.classes, function(aClass) {
                        return classBlizzId === aClass.id;
                    });

                    var classStr = classObj.name.replace(/\s/g, '').toLowerCase();
                    var queryStr = 'class_' + classStr;
                    classObj.iconLink = function (size) {
                        return iconProvider.zamIconLink(queryStr, size);
                    };
                    classObj.cssClass = 'class-' + classStr;

                    return deferred.resolve({
                        data: { class: classObj }
                    });
                });

            return deferred.promise;
        }

        function getRace(raceBlizzId, genderBlizzId) {
            var deferred = $q.defer();

            var genderStr = 'male';
            if (genderBlizzId === 1) {
                genderStr = 'female';
            }

            getRaces()
                .then(function (response) {
                    var raceObj = _.find(response.data.races, function(race) {
                        return raceBlizzId === race.id;
                    });

                    var raceStr = raceObj.name.replace(/\s/g, '').toLowerCase();
                    if (raceStr === 'undead') {
                        raceStr = 'scourge';
                    }

                    var queryStr = 'race_' + raceStr + '_' + genderStr;
                    raceObj.iconLink = function (size) {
                        return iconProvider.zamIconLink(queryStr, size);
                    };

                    return deferred.resolve({
                        data: { race: raceObj }
                    });
                });

            return deferred.promise;
        }

        function getSpec(specBlizzId) {
            var deferred = $q.defer();

            var classObj = _.find(globalEnum.class, function(aClass) {
                return aClass.specIds.indexOf(specBlizzId) >= 0;
            });
            var specIndex = classObj.specIds.indexOf(specBlizzId);

            getTalents()
                .then(function (response) {
                    var specObj = response.data[classObj.blizzId].specs[specIndex];
                    specObj.iconLink = function (size) {
                        return iconProvider.zamIconLink(specObj.icon, size);
                    };

                    return deferred.resolve({
                        data: { spec: specObj }
                    });
                });

            return deferred.promise;
        }

        function getPvpLeaderboard(bracket, region) {
            return bnetRequest(api.route(api.wow.pvp.leaderboard, { bracket: bracket.enumVal }), region);
        }

        function getLiveRealmStatuses(region) {
            return bnetRequest(api.route(api.wow.realm.status), region);
        }

        function getOfflineRealmStatuses(region) {
            var realmsKeyWithRegion = realmsKey + region.enumVal.charAt(0).toUpperCase() + region.enumVal.slice(1).toLowerCase();
            var realms = cache.load(realmsKeyWithRegion);

            if (realms) {
                return promiseProvider.promiseFromObj(realms);
            }

            return bnetRequest(api.route(api.wow.realm.statuses), region)
                .then(function (response) {
                    cache.store(realmsKeyWithRegion, response);
                    return response;
                });
        }

        //=====================================================================
        // Expose functions.
        //=====================================================================
        return {
            getClasses: getClasses,
            getRaces: getRaces,
            getTalents: getTalents,
            getClass: getClass,
            getRace: getRace,
            getSpec: getSpec,
            getPvpLeaderboard: getPvpLeaderboard,
            getLiveRealmStatuses: getLiveRealmStatuses,
            getOfflineRealmStatuses: getOfflineRealmStatuses
        };
    }

})();