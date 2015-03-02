(function () {
    'use strict';

    var appCommon = angular.module('app.common');

    //=========================================================================
    // Global constants.
    //=========================================================================
    var blizzIconsRoot = 'http://media.blizzard.com/wow/icons';
    var zamIconsRoot = 'http://wow.zamimg.com/images/wow/icons';

    var globalConstantsObj = {
        BLIZZ_ICONS_ROOT: blizzIconsRoot,
        ZAM_ICONS_ROOT: zamIconsRoot,
        BNET_ROOT_EU: 'http://eu.battle.net',
        BNET_ROOT_US: 'http://us.battle.net',
        CACHE_MINUTES: 60
    };

    appCommon.constant(
        'globalConstants', globalConstantsObj
    );

})();
