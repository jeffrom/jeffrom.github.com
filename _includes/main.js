
var PreLoad = (function() {
    var my = {};
    var cache = {};

    my.bg_url = '/img/bg.jpg';
    my.fade_interval = 500;

    my.preload_success = function(urls) {

    };

    my.check_finished = function(urls, callback) {
        callback = callback === undefined ? my.preload_success : callback;
        var i, l;
        var url, img;

        for (i = 0, l = urls.length; i < l; i++) {
            url = urls[i];
            img = cache[url];
            if (!img.complete) {
                setTimeout(function() {
                    my.check_finished(urls, callback);
                }, 20);
                return;
            }
        }

        if (callback) {
            callback(urls);
        }

        for (i = 0, l = urls.length; i < l; i++) {
            url = urls[i];
            cache[url] = null;
            delete cache[url];
        }

    };

    var $bg_elem = [];
    my.get_bg_elem = function() {
        $bg_elem = $bg_elem.length ? $bg_elem : $('#bg_image');
        return $bg_elem;
    };

    my.set_bg_url = function(url) {
        my.get_bg_elem().css({
            'background-image': 'url(' + url + ')'
        })
    };

    my.preload_bg = function(url) {
        url = url || my.bg_url;
        var img = new Image();
        img.src = url;

        if (img.complete) { // already cached
            my.set_bg_url(url);
            my.get_bg_elem().show();
            return;
        }

        cache[url] = img;

        function bg_loaded(urls) {
            var url = urls[0];
            my.set_bg_url(url);
            my.get_bg_elem().fadeIn(my.fade_interval);
        }

        setTimeout(function() {
            my.check_finished([url], bg_loaded);
        }, 5);

    };

    /*
     * run this in $(window).load() for the cache test to work
     */
    my.init = function() {
        if ($(window).width() > 320) {
            my.preload_bg();
        }
    };

    return my;
}());

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
    my.wait_for_disqus = function(callback) {
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

        if (window.overall_timeout) {
            clearTimeout(window.overall_timeout);
        }

        if (callback) {
            callback();
        }
    };

    my.get_window_height = function() {
        var inner_h = window.innerHeight;
        if (!inner_h) {
            if (document.compatMode || $.support.boxModel) {
                var dom_obj = document.compatMode === 'CSS1Compat' ?
                    document.documentElement :
                    document.body
                inner_h = dom_obj.innerHeight;
            }
        }
        return inner_h;
    };

    my.elem_in_view = function($elem) {
        var inner_h = my.get_window_height();
        var off_h = window.pageYOffset || document.scrollTop || document.body.scrollTop;

        var elem_height = $elem.height();
        var elem_top = $elem.offset().top;

        if (elem_top + elem_height > off_h
                && elem_top < off_h + inner_h) {
                    return (off_h + inner_h) - elem_top ;
            }
        return false;
    };

    var $background_image = [];
    var $page_footer = [];
    var footer_set;
    my.handle_background_image = function(e) {
        $background_image = $background_image.length ? $background_image : $('#bg_image');
        $page_footer = $page_footer.length ? $page_footer : $('#page_footer');
        var pixels_from_bottom = my.elem_in_view($page_footer);

        if (pixels_from_bottom) {
            $background_image.css('margin-top', -pixels_from_bottom + 'px');
            footer_set = true;
        } else {
            if (!footer_set) return;

            $background_image.css('margin-top', 'inherit');
            footer_set = false;
        }
    };

    return my;
}(jQuery));

function setup_events() {
    $(window).on({
        'resize': function(e) {
            Resize.set_doc_height();
            Resize.handle_background_image();
        },
        'scroll': function(e) {
            Resize.handle_background_image(e);
        }
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

    if (!Main.$post_images.length) {
        Resize.set_doc_height();
    }

    Resize.handle_background_image();
    setup_events();
});

$(window).load(function() {
    PreLoad.init();

    if (Main.$post_images && Main.$post_images.length) {
        Resize.set_doc_height();
    }

    Resize.wait_for_disqus(function() {
        Resize.set_doc_height();
        Resize.handle_background_image();
    });
});

