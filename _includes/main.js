
var Main = (function() {
    var my = {};

    return my;
}());

var Resize = (function() {
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

    return my;
}());

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
});

