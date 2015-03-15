(function () {
    'use strict';

    angular.module('app.providers').factory('iconProvider', IconProvider);

    IconProvider.$inject = ['globalConstants', 'globalEnum', 'logger'];

    function IconProvider(globalConstants, globalEnum, logger) {
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

        //=====================================================================
        // Expose functions.
        //=====================================================================
        return {
            blizzIconLink: blizzIconLink,
            zamIconLink: zamIconLink,
            factionIconLink: factionIconLink,
            classIconLink: classIconLink,
            raceIconLink: raceIconLink
        };
    }

})();