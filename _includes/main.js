
var Main = (function() {
    var my = {};

    return my;
}());

var Resize = (function() {
    var my = {};

    my.on_resize = function(e) {
        console.log(e);
    };

    return my;
}());

function setup_events() {
    $(window).on('resize', function(e) {
        var $window = $(window);
        var height = $window.height();
        var width = $window.width();
    });
}

$().ready(function() {


    setup_events();
});

