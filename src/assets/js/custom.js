setTimeout(function () {
  if ($('.profile-sidebar').length) {
    var st,
      $ot = $('.profile-sidebar'),
      ot = $ot.offset().top,
      hh = $('.universal-nav').outerHeight(true),
      pad = 30,
      $c = $('.card', $ot),
      cd;
    $(document).on('scroll', function () {
      st = $('body').scrollTop();

      if (st >= (hh - ot + pad)) {
        $c.addClass('short').removeClass('tall');
        $c.css({
          'position': 'fixed',
          'top': hh + pad, // cannot used the cached version
          'left': $ot.offset().left,
          'width': $ot.width(),
          'z-index': 99
        });
        ch = $c.outerHeight();

        $ot.addClass('collapsed').css({
          'padding-top': ch * 2
        });
        // $c.css({
        // 	'position': 'fixed',
        // 	'top': st + hh + pad,
        // 	'left': $ot.offset().left
        // });

      } else {
        $ot.removeClass('collapsed').removeAttr('style');
        $c.addClass('tall').removeClass('short').removeAttr('style');
      }
    });
  }
}, 6000); // need a promise here instead of relying on this timeoutf
// look into promise for dom content loaded

$('.mobile-menu-item').each(function() {
  $(this).on('click', function() {
    $('#makerMenu').hide();
  })
})
/// olllllld javascript
////////////////////////


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
/*var */

$(document).ready(function () {
  if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    $('html').addClass('ff');
  }
  (function detectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');
    var edge = ua.indexOf('Edge/');
    if (msie > 0) {
      // IE 10 or older
      //Do some stuff
      $('html').addClass('ie');
    }
    else if (trident > 0) {
      // IE 11
      //Do some stuff
      $('html').addClass('ie ie-11');
    }
    else if (edge > 0) {
      // Edge
      //Do some stuff
      $('html').addClass('ie ie-plus');
    }
    else
      // other browser
      return false;
  })();
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
	
	
   // set the localStorage for a page to redirect back too
	$("#qsLoginBtn").click(function(e) {
		if(location.href.indexOf('authenticate-redirect') >= 0){
			localStorage.setItem('redirect_to', "/");
		}else{
			localStorage.setItem('redirect_to',location.href);
			localStorage.setItem('onsite', 'true');
		}
		e.preventDefault();
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
    window.location.replace('/search?query=' + searchVal);
  })

  // Show and hide project stats on project card
  $(document).on('mouseenter', '.project , .maker-card', function () {
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

  // set height to parent div on why-portfolio-page
  $(window).on('load', function () {
    var div1height = $('#div1height').height();
    var div2height = $('#div2height').height();
    var div3height = $('#div3height').height();
    var div4height = $('#div4height').height();
    var divparent = $('#parallax-bg-div').height();
    var divsheight = div1height + div2height + div3height + div4height;
    $('.why-portfolio-page #parallax-bg-div').css({'height': divsheight + 40});
    $('.community-guidelines-page #parallax-bg-div').css({'height': div3height + 40});


  });

  $(window).scroll(function () {
    var div1height = $('#div1height').height();
    var div2height = $('#div2height').height();
    var div3height = $('#div3height').height();
    var div4height = $('#div4height').height();
    var divparent = $('#parallax-bg-div').height();
    var divsheight = div1height + div2height + div3height + div4height;
    $('.why-portfolio-page #parallax-bg-div').css({'height': divsheight + 40});
    $('.community-guidelines-page #parallax-bg-div').css({'height': div3height + 40});


  });


  $('.icon-search.nav-link').on('click', function () {
    setTimeout(function() {
      $('#search-box-input').focus();
    }, 200);
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
  $(document).on('mouseover', '.projects-count', function () {

    $(this).find('.new-tooltiptext').show();

  })
  $(document).on('mouseleave', '.projects-count', function () {
    a = $(this).find('.new-tooltiptext')

    setTimeout(function () {
      a.hide();
    }, 500);

  })
  // 		$(document).on('mouseleave','.new-tooltip', function(){
  // 	$('.new-tooltiptext').delay(8000);
  // })
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
// this stuff seems redundant
$(window).scroll(function () {
  var $sticky = $('header'),
    scroll = $(window).scrollTop();
  if (jQuery(window).width() >= 526) {
    if (scroll >= 1 && !$sticky.hasClass('shrink')) {
      $sticky.addClass('shrink');
    }
    if (scroll < 1 && $sticky.hasClass('shrink')) {
      $sticky.removeClass('shrink');
    }
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
    $('.parallax-scroll').each(function () {
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


// Home page hero image randomizer - run only on homepage

jQuery(window).on('load', function () {
  if ( window.location.pathname == '/' && $('#homeBanner').length ){
      var images = ['3DPrint-4.jpg','Art-15.jpg','Biology-7.jpg','CNC-5.jpg','Cosplay-1.jpg','Electronics-3.jpg','Electronics-7.jpg','Engineering-2.jpg','Engineering-4.jpg','Fashion-9.jpg','Food-7.jpg','Home-2.jpg','Kinetic-2.jpg','MetalArt-1.jpg','Microcontrollers-6.jpg','Music-3.jpg','Robotics-3.jpg','Robotics-8.jpg','Rocketry-4.jpg','Science-1.jpg','Science-7.jpg','Science-11.jpg','Science-16.jpg','SustainNature.jpg','Vehicles-2.jpg','Vehicles-11.jpg','Wearables-2.jpg','Yarncraft-5.jpg'];
      jQuery('#homeBanner').css('background', 'url(../assets/images/home-hero-images/' + images[Math.floor(Math.random() * images.length)] + ')');
	   // also for the home page make the build portfolio button act as a Login button
	  jQuery("#homeBanner button").on( "click", function() {
			jQuery("#qsLoginBtn").click(); 
	  });
  }
});

//////////////////////////////////////
/////// Navigation and Search ////////
//////////////////////////////////////
                           
$(window).on('load', function () {
   var topElementOffset = jQuery("#menu- secondary_universal_menu").height();
	
	$('#hamburger-icon, #hamburger-text, .nav-flyout-underlay').click(function() {
		$('#hamburger-icon').toggleClass('open');
		$('#hamburger-text').animate({opacity: 'toggle'});
		$('#nav-flyout').animate({opacity: 'toggle'});
		$('body').toggleClass('nav-open-no-scroll');
		$('html').toggleClass('nav-open-no-scroll');
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
  var y_pos = $(".nav-level-2").offset().top; // 75

  $(window).on('resize', function(){
	  if( document.querySelector(".sumome-smartbar-popup") != null ) {
			topElementOffset += jQuery(".sumome-smartbar-popup").height();
		}
      if ($(window).width() < 767) {
          y_pos = 0;
          $(".main-container").css("margin-top", topElementOffset + "px");
      }else{
          y_pos = 75;
          $(".main-container").css("margin-top", "0px");
      }
  });
  jQuery(document).scroll(function() {
      var scrollTop = $(this).scrollTop();
      if(scrollTop > y_pos && $(window).width() > 767){
          $("body").addClass("scrolled");
          e.addClass("main-nav-scrolled");
          hamburger.addClass("ham-menu-animate");
			 if( document.querySelector(".sumome-smartbar-popup") != null) {
					jQuery(".nav-hamburger .container").css("margin-top", jQuery(".sumome-smartbar-popup").height() * 2.2 + "px");
					jQuery("#nav-flyout").css("margin-top", jQuery(".sumome-smartbar-popup").height() + "px");
				} else {
					jQuery(".nav-hamburger .container, #nav-flyout").css("margin-top", "0px");
				}
			 hamburger.css("margin-top", topElementOffset + "px");
          $(".main-container").css("margin-top", topElementOffset + "px");
      }else if(scrollTop <= y_pos){
          $("body").removeClass("scrolled");
          e.removeClass("main-nav-scrolled");
			 jQuery(".nav-hamburger .container").css("margin-top", "0px");
          hamburger.removeClass("ham-menu-animate");
          $(".main-container").css("margin-top", "0px");
      }
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
    case "maker-share":
    case "makershare":
    case "preview.makershare.com":
    case "makershare.com":
        universalNavActive("share-p")
        break;
    default:
        break;
  }
  switch(shareSection) {
    case "maker-share/learning":
    case "makershare/learning":
    case "preview.makershare.com/learning":
    case "makershare.com/learning":
        universalNavActive("share")
        break;
    default:
        break;
  }

		  
	// fix nav to top on scrolldown, stay fixed for transition from mobile to desktop
		if (jQuery(window).width() < 578) {
			jQuery(".auth-target").append(jQuery(".nav-level-1-auth"));
		}
});

// Newsletter code
// When you submit a newsletter
jQuery(document).ready(function(){
jQuery("#subscribe-form").submit(function( event ) {
	var email = jQuery('#EMAIL').val();
	var fname = jQuery('#FNAME').val();
	var lname = jQuery('#LNAME').val();
	if(!email || !fname || !lname) {
		jQuery("#EMAIL").next().removeClass('hidden');
		jQuery("#FNAME").next().removeClass('hidden');
		jQuery("#LNAME").next().removeClass('hidden');
		return;
	} else {
		jQuery.post('https://makermedia.us9.list-manage.com/subscribe/post?u=4e536d5744e71c0af50c0678c&amp;id=64d256630b', jQuery('#subscribe-form').serialize());
		jQuery("#EMAIL").next().addClass('hidden');
		jQuery("#FNAME").next().addClass('hidden');
		jQuery("#LNAME").next().addClass('hidden');
		jQuery("#EMAIL").val("");
		jQuery("#FNAME").val("");
		jQuery("#LNAME").val("");
		jQuery('.fancybox-thx').trigger('click');
	}
	event.preventDefault();
});
});
var toggledClosed = false;
/*
function beltOff() {
	jQuery(".newsletter-footer").removeClass("scrolling");
   localStorage.setItem("newsletterClosed", "yes");
   toggledClosed = true;
}
jQuery(document).ready(function(){
  if(!localStorage.newsletterClosed && !jQuery('html').hasClass('mobile')) {
	  var footerHeight = jQuery(".universal-footer").height();
	  jQuery(".newsletter-footer").addClass("scrolling");
	  jQuery(window).on('resize', function(){
		  footerHeight = jQuery(".universal-footer").height();
	  });
	  jQuery(document).scroll(function() {
			if (toggledClosed == false && (window.innerHeight + window.pageYOffset + (jQuery(".universal-footer").height() - jQuery(".newsletter-footer").innerHeight())) <= document.body.offsetHeight - 25) {		
			  jQuery(".newsletter-footer").addClass("scrolling");
			} else  {
			  jQuery(".newsletter-footer").removeClass("scrolling");
			}
	  });
  }
  beltOff();
  jQuery('#mc-embedded-subscribe, #wc-embedded-subscribe').on('click',function(event) {
      //don't fire reCAPTCHA until we have a valid input
      var input,
         emailHasValue = false;

      input = jQuery('#wc-email');
      emailHasValue = input[0].checkValidity();

      if(emailHasValue) {
         input.next().addClass('hidden');
         event.preventDefault();
         grecaptcha.execute();
      } else {
			grecaptcha.reset();
         input.next().removeClass('hidden');
      }

   });

  //get current year for footer, if we could include a php file from a different domain, we'd do it that way
  var currentYear = (new Date()).getFullYear();
  jQuery(".footer-copyright .current-year").text(currentYear);
	
  jQuery(".close-newsletter").on('click', function(){
	  jQuery(".newsletter-footer").removeClass("scrolling");
	  localStorage.setItem("newsletterClosed", "yes");
	  toggledClosed = true;
  });
	
});
*/

jQuery(document).ready(function(jQuery){
  // Thank you modal with more newsletter options
  jQuery(".fancybox-thx").fancybox({
    autoSize : false,
    width  : 400,
    autoHeight : true,
    padding : 0,
    afterLoad   : function() {
      this.content = this.content.html();
    }
  });
  // reCAPRCHA error message
  jQuery(".nl-modal-error").fancybox({
    autoSize : false,
    width  : 250,
    autoHeight : true,
    padding : 0,
    afterLoad   : function() {
      this.content = this.content.html();
    }
  });
});


////////////////////////////////////////////////
//////////////// Auth0.js stuff ////////////////
////////////////////////////////////////////////
/*
var AUTH0_CALLBACK_URL = window.location.hostname + "/authenticated/";
var AUTH0_REDIRECT_URL = location.href;

window.addEventListener('load', function() {
  // buttons and event listeners
  var loginBtn    = document.getElementById('qsLoginBtn');
  var logoutBtn   = document.getElementById('qsLogoutBtn');
  loginBtn.addEventListener('click', function(e) {
    alert('you clicked me');
    e.preventDefault();
    localStorage.setItem('redirect_to',AUTHAUTH0_REDIRECT_URL);
    auth0.authorize();
  });
});*/
/*var AUTH0_CLIENT_ID    = '0sR3MQz8ihaSnLstc1dABgENHS5PQR8d';
var AUTH0_DOMAIN       = 'makermedia.auth0.com';


window.addEventListener('load', function() {
  // buttons and event listeners
  var loginBtn    = document.getElementById('qsLoginBtn');
  var logoutBtn   = document.getElementById('qsLogoutBtn');
  var profileView = document.getElementById('profile-view');
  //default profile view to hidden
  //loginBtn.style.display    = 'none';
  profileView.style.display = 'none';

  var userProfile;
  var webAuth = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: AUTH0_CALLBACK_URL,
    audience: 'https://' + AUTH0_DOMAIN + '/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile',
    leeway: 60
  });

  loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.setItem('redirect_to',AUTH0_REDIRECT_URL);
    webAuth.authorize();
  });

  logoutBtn.addEventListener('click', logout);

  function setSession(authResult) {
    // Set the time that the access token will expire at
    var expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  function logout() {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    displayButtons();
  }

  function isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  function handleAuthentication() {
    webAuth.parseHash(function(err, authResult) {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        setSession(authResult);
        // error here is keeping the login invisible
        //loginBtn.style.display = 'none';

        //after login redirect to previous page (after 5 second delay)
        var redirect_url = localStorage.getItem('redirect_to');
        setTimeout(function(){location.href=redirect_url} , 3000);

      } else if (err) {
        console.log(err);
        alert(
          'Error: ' + err.error + '. Check the console for further details.'
        );
      }
      displayButtons();
    });
  }

  function displayButtons() {
    if (isAuthenticated()) {
      loginBtn.style.display = 'none';
      getProfile();
      profileView.style.display = 'flex';
    } else {
      loginBtn.style.display = 'flex';
      profileView.style.display = 'none';
    }
  }

  function getProfile() {
    if (!userProfile) {
      var accessToken = localStorage.getItem('access_token');

      if (!accessToken) {
        console.log('Access token must exist to fetch profile');
      }

      webAuth.client.userInfo(accessToken, function(err, profile) {
        if (profile) {
          userProfile = profile;
          displayProfile();
        }
      });
    } else {
      displayProfile();
    }
  }

  function displayProfile() {
    // display the avatar
    document.querySelector('#profile-view img').src = userProfile.picture;
  }

  //handle authentication
  handleAuthentication();
});*/


// Add styles for Safari
(function($){
    // console.log(navigator.userAgent);
    /* Adjustments for Safari on Mac */
    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Mac') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
        // console.log('Safari on Mac detected, applying class...');
        $('html').addClass('safari-mac'); // provide a class for the safari-mac specific css to filter with
    }
})(jQuery);