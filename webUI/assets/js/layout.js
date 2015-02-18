(function ($, window, document) {

    $(document).ready (function () {
        // Footer resize.
        handleFooterResize();
    });

    $(window).load(function () {
        // Initial footer resize.
        adjustBodyPadding();
    });

    //==========================================================================
    // Footer resize.
    //==========================================================================
    function handleFooterResize() {
        var windowHandle = $(window);
        windowHandle.resize(adjustBodyPadding);
    }

    function adjustBodyPadding() {
        var footerHeight = $('#footer').height();

        $('body').css({
            'padding-bottom': footerHeight
        });
    }

})(window.jQuery, window, document);