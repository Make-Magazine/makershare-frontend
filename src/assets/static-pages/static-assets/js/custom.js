$(window).bind('load resize slid.bs.carousel', function () {
  var imageHeight = $('.active .holder').height();
  $('.controllers').height(imageHeight);
});
// function myToggle(a, e, b) {
// 	e.preventDefault();
// 	a.addClass('active');
// 	a.parent().siblings().children('a').removeClass('active');
// 	id = a.attr('id');
// 	$('.' + id).siblings().hide();
// 	$('.' + id).show();
// 	if (b) {
// 		$('.' + id + b).siblings().hide();
// 		$('.' + id + b).show();
// 	}
// };
// addNewField ( $(this) , arrayOfFieldsIds,group to clone,conatiner to get length)
function addNewField(a, b, g, c) {
  d = c.length + 1;
  newResource = a.prev(g).clone();

  for (i = 0; i <= b.length; i++) {
    newResource.children('label:nth-of-type(' + i + 1 + ')').attr('for', b[i] + d);
    newResource.children('input:nth-of-type(' + i + 1 + ')').attr('id', b[i] + d);
    newResource.children('select:nth-of-type(' + i + 1 + ')').attr('id', b[2 + i] + d);
  }
  newResource.insertBefore(a);
}

function addCollab() {
  var numItems = $('.add-collaborate').length + $('.collaborate').length;
  i = numItems + 1;
  add = '<div class="row add-collaborate">' +
    '<div class="col-md-7">' +
    '<div class="form-group">' +
    '<label for="collab-name-' + i + '">Name</label>' +
    '<input type="text" class="form-control" id="collab-name-' + i + '" placeholder="Start typing a name, then select">' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="collab-role-' + i + '">Role</label>' +
    '<input type="text" class="form-control" id="collab-role-' + i + '" placeholder="Start typing a name, then select">' +
    '</div>	' +
    '</div>' +
    '<div class="col-md-3 col-md-offset-2">' +
    '<div class="form-group sort">' +
    '<label for="collab-order-' + i + '">Sort Order</label>' +
    '<input type="text" id="collab-order-' + i + '" placeholder="' + i + '">' +
    '<div class="carets">' +
    '<i class="fa fa-2x fa-caret-up"></i>' +
    '<i class="fa fa-2x fa-caret-down"></i>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<a href="" class="btn btn-transparent remove">Remove</a>' +
    '</div><!-- End add-collaborate -->';
  return add;
}

var squareView = true;
var window_width;
var window_height;


// Splash page url params
function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      console.log(sParameterName[1])
      if (sParameterName[1] == 'subscription') {
        $('.subscribe-success').addClass('show');
      }
      // return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};


/*var */
$(document).ready(function () {

  var subscriptionParam = getUrlParameter('status');

  $('.navbar-header button,#navbar').hover(function () {
    $('#navbar').show();
    setTimeout(function () {
    }, 200);
  }, function () {

    $('#navbar').hide();
  });

  // mouse over display of project categories
  $(document).on('mouseover', '.explore-tags li a', function () {
    id = $(this).attr('id');
    ul = 'ul.' + id;
    $('.submenus div ' + ul).parent('div').siblings().hide();
    $('.submenus div ' + ul).parent('div').show();
    $('.submenus div ' + ul).show();

  });

  $(document).on('click', '#cover-upload-link', function (e) {
    e.preventDefault();
    $('#cover-upload:hidden').trigger('click');
  });

  $(document).on('click', 'a[href=\'#rules\']', function (e) {
    e.preventDefault();
    $('#rules-route').trigger('click');
  });
  $(document).on('click', '.resource-file', function (e) {
    e.preventDefault();
    $(this).parent().find('.file').trigger('click');
  });

  // Adding another makerspace
  $(document).on('click', '.another-space', function (e) {
    e.preventDefault();
    spaceArray = ['makerspace-', 'url-']
    addNewField($(this), spaceArray, $('.maker-group'), $('.makerspace div.maker-group'));
  });

  // Splash SignUp
  $(document).on('click', '#trigger-click', function (e) {
    $('#splash-signup').click();
  })

  // 404 Search
  $(document).on('click', '#static-search-term', function () {
    let searchVal = $('#search-box-input-404').val();
    window.location.replace('http://preview.makershare.com/search?query=' + searchVal);
  })

  // Show and hide project stats on project card
  $(document).on('mouseenter', '.project, .maker-card', function () {
    if (squareView) {
      $(this).find('.icons').stop();
      $(this).find('.icons').fadeOut('400');
      $(this).find('.teaser').stop();
      $(this).find('.teaser').fadeIn('400');
      $(this).find('.overlay').stop();
      $(this).find('.overlay').fadeIn('400');
      $(this).find('.overlay-portfolio').stop();
      $(this).find('.overlay-portfolio').fadeIn(400);
      // $(this).find('.overlay-portfolio').addClass('d-flex');
      // $(this).find(".overlay-portfolio" ).animate({opacity: 1});
      // $(this).find(".overlay-portfolio" ).animate({opacity: 1});
      $(this).find('.profile-edit-buttons').stop();
      $(this).find('.profile-edit-buttons').fadeIn(400);
    }
  });
  $(document).on('mouseleave', '.project , .maker-card', function () {
    if (squareView) {
      $(this).find('.icons').stop();
      $(this).find('.icons').fadeIn('400');
      $(this).find('.overlay').stop();
      $(this).find('.overlay').fadeOut('400');
      $(this).find('.overlay-portfolio').stop();
      $(this).find('.overlay-portfolio').fadeOut(400);
      $(this).find('.profile-edit-buttons').stop();
      $(this).find('.profile-edit-buttons').fadeOut(400);
      // $(".overlay-portfolio" ).animate({opacity: 0},400, function(){
      // 	$(this).find('.overlay-portfolio').removeClass('d-flex');
      // })
      $(this).find('.teaser').stop();
      $(this).find('.teaser').fadeOut('400');
    }
  });

  $(document).on('click', '#search-icon', function () {
    $('#search-box-input').focus();
  })

  // Toggle profile sidebar view
  $(document).on('click', '.toggleProfile', function () {
    $('.toggleProfile').children().toggle();
    $('.hideData').toggle();
    $('.profile-overlay').toggle();
    if ($('.profile-container').hasClass('indexProfile')) {
      $('.profile-container').removeClass('indexProfile')
    } else {
      $('.profile-container').addClass('indexProfile')
    }
  })
  //Index page parallax bg
  window_width = $(window).width();
  window_height = $(window).height();

  makerShare.initAnimationsCheck();
  makerShare.checkScrollForParallax();
});


$(window).on('load', function () {
  //after the content is loaded we reinitialize all the waypoints for the animations
  makerShare.initAnimationsCheck();
  $('html,body').animate({scrollTop: 0}, 'slow');

});
$(window).scroll(function () {
  var sticky = $('header'),
    scroll = $(window).scrollTop();

  if (scroll >= 100 && !sticky.hasClass('shrink')) {
    sticky.addClass('shrink');
    $('html,body').animate().stop();
  }
  if (scroll < 100 && sticky.hasClass('shrink')) {
    sticky.removeClass('shrink');
    $('html,body').animate({scrollTop: 0}, 'slow');

  }
});

$(window).on('scroll', function () {
  if (window_width > 992) {
    makerShare.checkScrollForParallax();
  }
});


makerShare = {
  initAnimationsCheck: function () {
    $('[class*="add-animation"]').each(function () {
      var waypoints = $(this).waypoint(function (direction) {
        if (direction == 'down') {
          $(this.element).addClass('animate');
        } else {
          $(this.element).removeClass('animate');
        }
      }, {
        offset: '115%'
      });
    });
  },

  checkScrollForParallax: debounce(function () {
    no_of_elements = 0;

    $('[data-el="parallax-scroll"]').each(function () {
      var $elem = $(this);

      if (isElementInViewport($elem)) {
        var parent_top = $elem.offset().top;
        var window_bottom = $(window).scrollTop();
        var $image = $('.parallax-bg img');
        var $redLines = $('.parallax-red-line');
        var oVal = ((window_bottom - parent_top) / 3);
        var oVal2 = ((window_bottom - parent_top) / 7);
        $image.css('transform', 'translate3d(0px, ' + oVal + 'px, 0px)');
        $redLines.each(function () {
          $redLines.children().css('transform', 'translate3d(0px, ' + oVal2 + 'px, 0px)');
        });
      }
    });
  }, 6)
}


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}


function isElementInViewport(elem) {
  var $elem = $(elem);

  // Get the scroll position of the page.
  var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
  var viewportTop = $(scrollElem).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  // Get the position of the element on the page.
  var elemTop = Math.round($elem.offset().top);
  var elemBottom = elemTop + $elem.height();

  return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}

//////////////////////////////////////
/////// Navigation and Search ////////
//////////////////////////////////////

(function($) {   
  $('#hamburger-icon, #hamburger-makey, .nav-flyout-underlay').click(function() {
    $('#hamburger-icon').toggleClass('open');
    $('#hamburger-makey').animate({opacity: 'toggle'});
    $('#nav-flyout').animate({opacity: 'toggle'});
    $('body').toggleClass('nav-open-no-scroll');
    $('.nav-flyout-underlay').animate({opacity: 'toggle'});
  });

  $('.nav-flyout-column').on('click', '.expanding-underline', function(event) {
    if ($(window).width() < 577) { 
      event.preventDefault();
      $(this).toggleClass('underline-open');
      $(this).next('.nav-flyout-ul').slideToggle();
    }
  });
  // fix nav to top on scrolldown, stay fixed for transition from mobile to desktop
  var e = $(".universal-nav");
  var hamburger = $(".nav-hamburger");
  var y_pos = $(".nav-level-2").offset().top;
  var nextItemUnderNav = $("#home-featured");
    if($(".second-nav").length) {
        nextItemUnderNav = $(".second-nav");
    }
  $(window).on('resize', function(){
      if ($(window).width() < 767) {
          y_pos = 0;
          nextItemUnderNav.css("margin-top", "55px");
      }else{
          y_pos = 75;
          nextItemUnderNav.css("margin-top", "0px");
      }
  });
  jQuery(document).scroll(function() {
      var scrollTop = $(this).scrollTop();
      if(scrollTop > y_pos && $(window).width() > 767){
          e.addClass("main-nav-scrolled"); 
          hamburger.addClass("ham-menu-animate");
          nextItemUnderNav.css("margin-top", "55px");
      }else if(scrollTop <= y_pos){
          e.removeClass("main-nav-scrolled"); 
          hamburger.removeClass("ham-menu-animate");
          if ($(window).width() > 767) {
            nextItemUnderNav.css("margin-top", "0px");
          }
      }
  });
    
  $("#search-modal").fancybox({
        wrapCSS : 'search-modal-wrapper',
        autoSize : true,
        //width  : 400,
        autoHeight : true,
        padding : 0,
        overlay: {
            opacity: 0.8, // or the opacity you want 
            css: {'background-color': '#ff0000'} // or your preferred hex color value
        }, // overlay 
        closeClick  : false, 
        afterShow   : function() {
            // keep it from reloading upon clicks
            $('#search-modal').bind('click', false);
            $(".sb-search-submit").click(function(e){
                if($("#search").val() && $("#search").val() != ""){
                    var searchForm = $(".search-form");
                    window.location.href = searchForm.attr("action") +"?s=" + $("#search").val();
                }else{
                    $("#search").attr('placeholder', "Please enter in some text to search for...");            
                }
            });
            $(".sb-search-input").focus();
        },
        afterClose: function () {
            $('#search-modal').unbind('click', false);
        }
  });

  $(".fa-search").click(function(e){
       $("#search-modal").trigger('click');
       // essb sharing popup is being triggered when logged in to admin
       $(".essb-live-customizer-main, .essb-live-buttons-customizer").attr('style', 'display: none !important');
  });
    
  // to keep this nav universal, let's not have each site's style sheet highlight a different active manually
  var site = window.location.hostname;
  var firstpath = $(location).attr('pathname');
    firstpath.indexOf(1);
    firstpath.toLowerCase();
    firstpath = firstpath.split("/")[1];
  var shareSection = site + "/" + firstpath;
  function universalNavActive( site ) {
    jQuery(".nav-" + site).addClass("active-site");
    jQuery(".nav-" + site + " .nav-level-2-arrow").addClass("active-site")
  }
  // each one has to apply to a number of environments
  switch(site) {
    case "make-zine":
    case "makezine":
    case "makezine.wpengine.com":
    case "makezine.staging.wpengine.com":
    case "makezine.com":
        universalNavActive("zine");
        break;
    case "makeco":
    case "makeco.wpengine.com":
    case "makeco.staging.wpengine.com/":
    case "makeco.com":
        universalNavActive("make");
        break;
    case "makershed.com":
        universalNavActive("shed")
        break;  
    case "maker-faire":
    case "makerfaire":
    case "makerfaire.wpengine.com":
    case "makerfaire.staging.wpengine.com":
    case "makerfaire.com":
        universalNavActive("faire")
        break;
    default:
          break;
  }
  switch(shareSection) {
    case "maker-share/learning":
    case "makershare/learning":
    case "makeshare.wpengine.com/learning":
    case "makershare.staging.wpengine.com/learning":
    case "makershare.com/learning":
        universalNavActive("share")
        break;
    case "maker-share/makers":
    case "makershare/makers":
    case "makeshare.wpengine.com/makers":
    case "makershare.staging.wpengine.com/makers":
    case "makershare.com/makers":
        universalNavActive("share-p")
        break;
    default:
          break;
  }
})(jQuery);