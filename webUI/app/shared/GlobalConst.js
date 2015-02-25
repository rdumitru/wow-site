(function () {
    'use strict';

    var app = angular.module('app');

    //=========================================================================
    // Global enums.
    //
    // Mandatory fields:
    //   - val
    //   - enumVal
    //   - display
    //=========================================================================

    app.constant(
        'GlobalConst', {
            TEST: 'test'
        }
    );

})();
