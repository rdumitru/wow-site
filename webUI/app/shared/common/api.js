(function () {
    'use strict';

    angular.module('app.common').factory('api', Api);

    Api.$inject = [];

    function Api() {
        var prefix = '/api';
        var wowPrefix = '/wow';
        var wowDataPrefix = wowPrefix + '/data';

        return {
            wow: {
                data: {
                    classes: wowDataPrefix + '/character/classes',
                    races: wowDataPrefix + '/character/races',
                    talents: wowDataPrefix + '/talents'
                },
                pvp: {
                    leaderboard: '/wow/leaderboard/:bracket'
                }
            },
            route: route
        };

        function route(url, keyValues, queryStringValues) {
            url = prefix + url;

            if (keyValues) {
                var allKeys = Object.keys(keyValues);
                var currentPropertyName;

                for (var i = 0; i < allKeys.length; i++) {
                    currentPropertyName = allKeys[i];
                    url = url.replace('/:' + currentPropertyName, '/' + keyValues[currentPropertyName]);
                }
            }

            if (queryStringValues) {
                var queryStringKeys = Object.keys(queryStringValues);
                var currentQSPropertyName, separator;

                for (var j = 0; j < queryStringKeys.length; j++) {
                    currentQSPropertyName = queryStringKeys[j];
                    j === 0 ? separator = '?' : separator = '&';
                    url = url + separator + currentQSPropertyName + '=' + queryStringValues[currentQSPropertyName];
                }
            }

            return url;
        }
    }

})();

