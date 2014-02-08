
var PreLoad = (function() {
  var my = {};
  var cache = {};

  my.bg_url = '/img/bg.jpg';
  my.fade_interval = 500;

  my.preload_success = function(urls) {
    //console.log('success\n' + urls.join('\n'));
    //console.log($('#bg_image').css('background-image'));
  };

  my.get_img = function(url) {
    var img = cache[url];
    if (!img) {
      img = new Image();
      img.src = url;
      cache[url] = img;
    }
    return img;
  };

  my.check_finished = function(urls, callback) {
    callback = callback === undefined ? my.preload_success : callback;
    var i, l;
    var url, img;

    for (i = 0, l = urls.length; i < l; i++) {
      url = urls[i];
      img = my.get_img(url);
      if (!img.complete) {
        setTimeout(function() {
          my.check_finished(urls, callback);
        }, 10);
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
    return;
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
  my.$posts = $('.post');
  my.$post_images = $('#posts img');

  my.show_first_image = function() {
    var $post;
    var i, l;

    for (i = 0, l = my.$posts.length; i < l; i++) {
      $post = $(my.$posts[i]);
      if (!$post.length) continue;

      var $post_images = $post.find('img');
      if (!$post_images.length) continue;

      var $container = $post.parent().parent();
      var $post_link = $container.find('a');
      var href;
      if ($post_link.length) {
        href = $post_link[0].href;
      }
      if (href === undefined) continue;

      var $image = $($post_images[0]);
      $image.addClass('post_image_preview')
      .wrap("<a class='preview_wrapper' href='" + href + "' />")
      .show();
    }

  };

  my.set_article_links = function() {
    var $links = $('a');
    var $link;
    var href;
    var i, l;

    for (i = 0, l = $links.length; i < l; i++) {
      $link = $($links[i]);
      href = $link.attr('href') || [];
      if (href[0] !== '/' && href.slice(0, 6) !== 'mailto') {
        $link.attr('target', '_blank');
      }
    }
  };

  my.handle_page = function() {
    if (window.location.pathname === '/') {
      my.handle_read_more();
      $('#posts.all_posts img').hide();
      my.show_first_image();
      Resize.set_doc_height();
    } else {
      Main.set_article_links();
      if (!my.$post_images.length) {
        Resize.set_doc_height();
      }
    }
  };

  my.get_comments = function($el) {
    var el = $el[0];

    function traverse(el) {
      if (el === undefined) return [];

      var comments = [];
      if (el.nodeName == '#comment' || el.nodeType == 8) {
        comments[comments.length] = el;
      } else if (el.childNodes.length) {
        for (var i = 0, l = el.childNodes.length; i < l; i++) {
          comments = comments.concat(traverse(el.childNodes[i]));
        }
      }
      return comments;
    }

    return traverse(el);
  };

  my.handle_read_more = function() {
    var $post, comments;
    var i, l;

    for (i = 0, l = my.$posts.length; i < l; i++) {
      $post = $(my.$posts[i]);
      comments = my.get_comments($post);
      if (!comments.length) {
        $post.find('a:last').hide();
      }
    }
  }

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
          document.body;
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
          return (off_h + inner_h) - elem_top;
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

  var $posts = $('#posts');
  $posts.on({
    'mouseenter': function(e) {

    },
    'mouseout': function(e) {

    }
  }, 'img');
}

$().ready(function() {
  //PreLoad.check_finished(['http://0.0.0.0:4000/img/bg.jpg']);
  Main.handle_page();

  Resize.handle_background_image();
  setup_events();
});

$(window).load(function() {
  PreLoad.init();

  if (Main.$post_images && Main.$post_images.length) {
    Resize.set_doc_height();
  }

  Resize.handle_background_image();

  Resize.set_doc_height();
  Resize.wait_for_disqus(function() {
    Resize.set_doc_height();
  });
});

