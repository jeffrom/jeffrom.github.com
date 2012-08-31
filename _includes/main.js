
var Main = (function() {
    var my = {};

    return my;
}());

var Resize = (function() {
    var my = {};
    var content_height;
    var $posts = $('#posts');

    my.set_large_size = function() {
        $posts = $posts.length ? $posts : $('#posts');
        $posts.css({
            'margin-left': '220px'
        });
    };

    my.on_resize = function(e) {
        e = e || {};
        $posts = $posts || $('#posts');
        //console.log(e);
        var width = $(window).width();
        if (width >= 1200) {
            my.set_large_size();
            return;
        }

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

