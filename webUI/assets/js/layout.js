(function ($, window, document) {

    $(document).ready (function () {
        // Add handle to adjust footer on resize.
        handleFooterResize();
    });

    $(window).load(function () {
        // Adjust footer on load.
        adjustBodyPadding();
    });

    //==========================================================================
    // Global variables.
    //==========================================================================

    // IDs.
    var footerId = '#footer';

    // Classes.
    var navbarClass = '.navbar';

    //==========================================================================
    // Footer resize.
    //==========================================================================
    function handleFooterResize() {
        var windowHandle = $(window);
        windowHandle.resize(adjustBodyPadding);
    }

    function adjustBodyPadding() {
        var footerHeight = $(footerId).height();

        $('body').css({
            'padding-bottom': footerHeight
        });
    }

})(window.jQuery, window, document);