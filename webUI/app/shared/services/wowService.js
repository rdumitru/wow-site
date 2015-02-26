(function () {
    'use strict';

    angular.module('app.services').factory('wowService', WowService);

    WowService.$inject = ['$http', 'globalConstants', 'logger'];

    function WowService($http, globalConstants, logger) {
        //=====================================================================
        // Public functions.
        //=====================================================================
        function getPvpLeaderboard(pvpBracket) {
            // TODO: Create EU and US in enum.
            // TODO: Create an api.js with route.
            // TODO: Try using jsonp.
            return $http.get('http://eu.battle.net//api/wow/leaderboard/' + pvpBracket.enumVal);
        }

        //=====================================================================
        // Expose functions.
        //=====================================================================
        return {
            getPvpLeaderboard: getPvpLeaderboard
        };
    }

})();