
var Main = (function() {
    var my = {};

    return my;
}());

var Resize = (function() {
    var my = {};
    var content_height;

    my.on_resize = function(e) {
        console.log(e);
    };

    my.set_doc_height = function(height) {
        height = height || $(window).height();
        var $page_content = $('#page_content');
        var $page_footer = $('#page_footer');
        content_height = content_height || $('#thepage').height() + $('.post_footer').height() + 5;
        var height_to_set = content_height > height ? content_height : height;
        $page_content.height(height_to_set);
        $page_footer.addClass('grey').show();
    };

    return my;
}());

function setup_events() {
    $(window).on('resize', function(e) {
        Resize.set_doc_height();
    });
}

$().ready(function() {


    Resize.set_doc_height();
    setup_events();
});

