var $sidebar   = $("#post_meta"),
    $window    = $(window),
    offset     = $sidebar.offset(),
    topPadding = 15;

if ($sidebar.length) {
    $window.scroll(function () {
        if ($window.scrollTop() > offset.top) {
            $sidebar.stop().animate({
                marginTop: $window.scrollTop() - offset.top + topPadding
            });
        } else {
            $sidebar.stop().animate({
                marginTop: 0
            });
        }
    });
}