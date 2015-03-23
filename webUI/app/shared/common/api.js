(function () {
    'use strict';

    angular.module('app.common').factory('api', Api);

    Api.$inject = [];

    function Api() {
        var prefix = '/api';

        return {
            wow: {
                data: {
                    classes:    '/wow/data/character/classes',
                    races:      '/wow/data/character/races',
                    talents:    '/wow/data/talents'
                },
                pvp: {
                    leaderboard: '/wow/leaderboard/:bracket'
                },
                realm: {
                    statuses: '/wow/realm/status'
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

