(function () {
    'use strict';

    angular.module('app.providers').factory('iconProvider', IconProvider);

    IconProvider.$inject = ['globalConstants', 'logger'];

    function IconProvider(globalConstants, logger) {
        //=====================================================================
        // Constants.
        //=====================================================================
        var SUPPORTED_SIZES = [18, 36, 56];
        var ROUTE = '/icons';
        var ICON_EXT = '.jpg';

        //=====================================================================
        // Public functions.
        //=====================================================================
        function iconLink(name, size) {
            if (SUPPORTED_SIZES.indexOf(size) < 0) {
                logger.error(IconProvider, iconLink, 'Icon size not supported: ' + size + '.');
                return null;
            }

            return globalConstants.WOW_MEDIA_ROOT + ROUTE +
                '/' + size +
                '/' + name + ICON_EXT;
        }

        //=====================================================================
        // Expose functions.
        //=====================================================================
        return {
            iconLink: iconLink
        };
    }

})();