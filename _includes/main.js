
var Main = (function() {
    var my = {};

    return my;
}());

var Resize = (function($) {
    var my = {};
    var content_height;
    var $posts = $('#posts, #footer_content');

    my.set_doc_height = function(height) {
        height = height || $(window).height();
        var $page_content = $('#page_content');
        var $page_footer = $('#page_footer');

        content_height = $posts.outerHeight() + 100;
        var height_to_set = content_height > height ? content_height : height;

        $page_content.height(height_to_set);
        $page_footer.addClass('grey_bg').show();
    };

    my.stop_waiting = false;
    window.overall_timeout = null;
    my.wait_for_disqus = function() {
        if (my.stop_waiting) return;
        if (!window.overall_timeout && $('#disqus_thread iframe').length) {
            window.overall_timeout = setTimeout(function() {
                my.stop_waiting = true;
            }, 20000);
        }

        var $disqus = $('#disqus_thread iframe');
        if (!$disqus.length) {
            setTimeout(my.wait_for_disqus, 50);
            return;
        }
        my.set_doc_height();

        if (window.overall_timeout) {
            clearTimeout(window.overall_timeout);
        }
    };

    return my;
}(jQuery));

function setup_events() {
    $(window).on('resize', function(e) {
        //Resize.on_resize();
        Resize.set_doc_height();
    });

    $('#posts').on({
        'mouseenter': function(e) {

        },
        'mouseout': function(e) {

        }
    }, 'img');
}

$().ready(function() {

    Main.$post_images = $('#posts img');
    $('#posts.all_posts img').hide();

    //Resize.on_resize();
    if (!Main.$post_images.length) {
        Resize.set_doc_height();
    }
    setup_events();
});

$(window).load(function() {
    if (Main.$post_images && Main.$post_images.length) {
        Resize.set_doc_height();
    }

    Resize.wait_for_disqus();
});

