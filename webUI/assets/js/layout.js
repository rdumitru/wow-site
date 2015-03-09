(function ($, window, document) {

    //==========================================================================
    // Global variables.
    //==========================================================================

    // IDs.
    var footerId = '#footer';

    // Classes.
    var navbarClass = '.navbar';

    //==========================================================================
    // Events.
    //==========================================================================
    $(document).ready (function () {
        // Add handle to adjust footer on resize.
        handleFooterResize();
    });

    $(window).load(function () {
        // Adjust footer on load.
        $(window).trigger('resize');
    });

    //==========================================================================
    // Footer resize handlers.
    //==========================================================================
    function handleFooterResize() {
        var windowHandle = $(window);
        windowHandle.resize(adjustBodyPadding);
    }

    function adjustBodyPadding() {
        _.delay(function () {
            var footerHeight = $(footerId).outerHeight();

            $('body').css({
                'padding-bottom': footerHeight
            });
        }, 0);
    }

})(window.jQuery, window, document);