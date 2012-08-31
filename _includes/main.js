
var Main = (function() {
    var my = {};

    return my;
}());

var Resize = (function() {
    var my = {};
    var content_height;
    var $posts = $('#posts, #footer_content');

    my.set_large_size = function() {
        $posts = $posts.length ? $posts : $('#posts, #footer_content');
        $posts.css({
            'margin-left': '220px',
            'width': '500px',
            'min-width': '200px',
            'max-width': '500px'
        });
    };

    my.set_mobile_size = function() {
        $posts = $posts.length ? $posts : $('#posts, #footer_content');
        $posts.css({
            'margin-left': 'inherit',
            'width': 'inherit',
            'min-width': 'inherit',
            'max-width': 'inherit'
        });
    };

    my.on_resize = function(e) {
        e = e || {};
        $posts = $posts || $('#posts, #footer_content');
        //console.log(e);
        var width = $(window).width();
        if (width < 500) {
            my.set_mobile_size();
            return;
        }
        my.set_large_size();

        var margin = Math.max(220 - (1200 - width), 0);
        $posts.css({
            'margin-left': margin
        });

    };

    my.set_doc_height = function(height) {
        height = height || $(window).height();
        var $page_content = $('#page_content');
        var $page_footer = $('#page_footer');
        content_height = content_height || $('#thepage').height() + $('.post_footer').height() + 5;
        var height_to_set = content_height > height ? content_height : height;
        $page_content.height(height_to_set);
        $page_footer.addClass('grey_bg').show();
    };

    return my;
}());

function setup_events() {
    $(window).on('resize', function(e) {
        Resize.on_resize();
        Resize.set_doc_height();
    });
}

$().ready(function() {

    Resize.on_resize();
    if (!$('#posts img').length) {
        Resize.set_doc_height();
    }
    setup_events();
});

$(window).load(function() {
    if ($('#posts img').length) {
        Resize.set_doc_height();
    }
});

