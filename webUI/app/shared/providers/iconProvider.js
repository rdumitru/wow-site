(function () {
    'use strict';

    angular.module('app.providers').factory('iconProvider', IconProvider);

    IconProvider.$inject = ['$q', 'wowService', 'globalConstants', 'globalEnum', 'logger'];

    function IconProvider($q, wowService, globalConstants, globalEnum, logger) {
        //=====================================================================
        // Constants.
        //=====================================================================
        var blizzIconSizes = {
            small: 18,
            medium: 36,
            large: 56
        };

        var iconExt = '.jpg';

        //=====================================================================
        // Public functions.
        //=====================================================================
        function blizzIconLink(name, size) {
            return globalConstants.BLIZZ_ICONS_ROOT +
                '/' + blizzIconSizes[size.enumVal.toLowerCase()] +
                '/' + name + iconExt;
        }

        function zamIconLink(name, size) {
            return globalConstants.ZAM_ICONS_ROOT +
                '/' + size.enumVal.toLowerCase() +
                '/' + name + iconExt;
        }

        function factionIconLink(factionBlizzId, size) {
            var factionStr = 'alliance';
            if (factionBlizzId === 1) {
                factionStr = 'horde';
            }

            var queryStr = 'faction_' + factionStr.toLowerCase();

            return zamIconLink(queryStr, size);
        }

        function classIconLink(classBlizzId, size) {
            var classKey = _.findKey(globalEnum.class, function (aClass) {
                return classBlizzId === aClass.blizzId;
            });

            var classStr = globalEnum.class[classKey].enumVal;
            var queryStr = 'class_' + classStr.toLowerCase();

            return zamIconLink(queryStr, size);
        }

        function raceIconLink(raceBlizzId, genderBlizzId, size) {
            var raceKey = _.findKey(globalEnum.race, function (race) {
                return raceBlizzId === race.blizzId;
            });

            var genderKey = _.findKey(globalEnum.gender, function (gender) {
                return genderBlizzId === gender.blizzId;
            });

            var raceStr = globalEnum.race[raceKey].enumVal;
            var genderStr = globalEnum.gender[genderKey].enumVal;
            var queryStr = 'race_' + raceStr.toLowerCase() + '_' + genderStr;

            return zamIconLink(queryStr, size);
        }

        function classIconPromise(classBlizzId, size) {
            var deferred = $q.defer();

            wowService.getClasses()
                .then(function (response) {
                    var classObj = _.find(response.data.classes, function(aClass) {
                        return classBlizzId === aClass.id;
                    });

                    var classStr = classObj.name.replace(/\s/g, '').toLowerCase();
                    var queryStr = 'class_' + classStr;
                    var link = zamIconLink(queryStr, size);

                    return deferred.resolve({ link: link });
                });

            return deferred.promise;
        }

        function raceIconPromise(raceBlizzId, genderBlizzId, size) {
            var deferred = $q.defer();

            var genderStr = 'male';
            if (genderBlizzId === 1) {
                genderStr = 'female';
            }

            wowService.getRaces()
                .then(function (response) {
                    var raceObj = _.find(response.data.races, function(race) {
                        return raceBlizzId === race.id;
                    });

                    var raceStr = raceObj.name.replace(/\s/g, '').toLowerCase();
                    if (raceStr === 'undead') {
                        raceStr = 'scourge';
                    }

                    var queryStr = 'race_' + raceStr + '_' + genderStr;
                    var link = zamIconLink(queryStr, size);

                    return deferred.resolve({ link: link });
                });

            return deferred.promise;
        }

        // TODO: put this in another service, and only call zamIconLink from now on.
        function specIconPromise(specBlizzId, size) {
            var deferred = $q.defer();

            var classObj = _.find(globalEnum.class, function(aClass) {
                return aClass.specs.indexOf(specBlizzId) >= 0;
            });
            var specIndex = classObj.specs.indexOf(specBlizzId);

            wowService.getTalents()
                .then(function (response) {
                    var specObj = response.data[classObj.blizzId].specs[specIndex];
                    var link = zamIconLink(specObj.icon, size);

                    return deferred.resolve({ link: link });
                });

            return deferred.promise;
        }

        //=====================================================================
        // Expose functions.
        //=====================================================================
        return {
            blizzIconLink: blizzIconLink,
            zamIconLink: zamIconLink,
            factionIconLink: factionIconLink,
            classIconLink: classIconLink,
            raceIconLink: raceIconLink,
            classIconPromise: classIconPromise,
            raceIconPromise: raceIconPromise,
            specIconPromise: specIconPromise
        };
    }

})();