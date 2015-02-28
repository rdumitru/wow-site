(function () {
    'use strict';

    var appCommon = angular.module('app.common');

    //=========================================================================
    // Global constants.
    //=========================================================================
    var blizzardMediaRoot = 'http://media.blizzard.com';

    var globalConstantsObj = {
        BLIZZARD_MEDIA_ROOT: blizzardMediaRoot,
        WOW_MEDIA_ROOT: blizzardMediaRoot + '/wow',
        BNET_ROOT_EU: 'http://eu.battle.net',
        BNET_ROOT_US: 'http://us.battle.net',
        CACHE_MINUTES: 60
    };

    appCommon.constant(
        'globalConstants', globalConstantsObj
    );

})();
