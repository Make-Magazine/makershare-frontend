setTimeout(function() {
	if($('.profile-page').length) {
		console.log('yes');
		var st,
			$ot = $('.profile-sidebar'),
			ot = $ot.offset().top,
			hh = $('.main-header').outerHeight(true),
			pad = 30,
			$c = $('.card', $ot),
			cd;
		$(document).on('scroll', function() {
			st = $('body').scrollTop();

			// // console.log(st, ot);
			// if(st > 1) { // sucks that this checks the height every time
			// 	console.log('should only fire the first time');
			// }

			if(st >= (hh - ot + pad)) {
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
					'padding-top': ch *2
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
},6000); // need a promise here instead of relying on this timeoutf
// look into promise for dom content loaded




























/// olllllld javascript
////////////////////////



$(window).bind("load resize slid.bs.carousel", function () {
	var imageHeight = $(".active .holder").height();
	$(".controllers").height(imageHeight);
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
		newResource.children('label:nth-of-type(' + i + 1 + ')').attr("for", b[i] + d);
		newResource.children('input:nth-of-type(' + i + 1 + ')').attr("id", b[i] + d);
		newResource.children('select:nth-of-type(' + i + 1 + ')').attr("id", b[2 + i] + d);
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

	$('.navbar-header button,#navbar').hover(function () {
		$('#navbar').show();
		setTimeout(function () { }, 200);
	}, function () {

		$('#navbar').hide();
	});

	// mouse over display of project categories
	$(document).on('mouseover', '.explore-tags li a', function () {
		id = $(this).attr('id');
		ul = "ul." + id;
		$('.submenus div ' + ul).parent('div').siblings().hide();
		$('.submenus div ' + ul).parent('div').show();
		$('.submenus div ' + ul).show();

	});

	$(document).on('click', "#cover-upload-link", function (e) {
		e.preventDefault();
		$("#cover-upload:hidden").trigger('click');
	});

	$(document).on('click', "a[href='#rules']", function (e) {
		e.preventDefault();
		$("#rules-route").trigger('click');
	});
	$(document).on('click', ".resource-file", function (e) {
		e.preventDefault();
		$(this).parent().find(".file").trigger('click');
	});

	// Adding another makerspace
	$(document).on('click', '.another-space', function (e) {
		e.preventDefault();
		spaceArray = ["makerspace-", "url-"]
		addNewField($(this), spaceArray, $('.maker-group'), $('.makerspace div.maker-group'));
	});

	// Splash SignUp
	$(document).on('click', '#trigger-click', function(e){
		$('#splash-signup').click();
	})

	// 404 Search
	$(document).on('click','#static-search-term', function(){
		let searchVal = $('#search-box-input-404').val();
		window.location.replace("http://preview.makershare.com/search?query=" + searchVal);
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
	$(window).on("load", function(){
		 	var div1height = $('#div1height').height();
			var div2height = $('#div2height').height();
			var div3height = $('#div3height').height();
			var div4height = $('#div4height').height();
			var divparent  = $('#parallax-bg-div').height();
			var divsheight = div1height + div2height + div3height + div4height;
			$('.why-portfolio-page #parallax-bg-div').css({"height": divsheight + 40});
			$('.community-guidelines-page #parallax-bg-div').css({"height": div3height + 40});


	});

	$(window).scroll(function(){
		 	var div1height = $('#div1height').height();
			var div2height = $('#div2height').height();
			var div3height = $('#div3height').height();
			var div4height = $('#div4height').height();
			var divparent  = $('#parallax-bg-div').height();
			var divsheight = div1height + div2height + div3height + div4height;
			$('.why-portfolio-page #parallax-bg-div').css({"height": divsheight + 40});
			$('.community-guidelines-page #parallax-bg-div').css({"height": div3height + 40});


	});


	$(document).on('click','#search-icon', function(){
		$('#search-box-input').focus();
	})

	// Toggle profile sidebar view
	$(document).on('click','.toggleProfile', function(){
		$('.toggleProfile').children().toggle();
		$('.hideData').toggle();
		$('.profile-overlay').toggle();
		if($('.profile-container').hasClass('indexProfile')){
				$('.profile-container').removeClass('indexProfile')
		} else {
				$('.profile-container').addClass('indexProfile')
		}
	})
		$(document).on('mouseover','.projects-count', function(){

		 $(this).find('.new-tooltiptext').show();

	})
		$(document).on('mouseleave','.projects-count', function(){
				 a = $(this).find('.new-tooltiptext')

			setTimeout(function(){
				a.hide();
			},500);

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
		$('html,body').animate({ scrollTop: 0 }, 'slow');

});
$(window).scroll(function(){
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
    $('.parallax-scroll').each(function() {
			var $elem = $(this);

			if (isElementInViewport($elem)) {
				var parent_top = $elem.offset().top;
				var window_bottom = $(window).scrollTop();
				var $image = $('.parallax-bg img');
        var $redLines = $('.parallax-red-line');
				var oVal = ((window_bottom - parent_top) / 3);
				// console.log(parent_top);
				// console.log(window_bottom);
				// console.log($image);
				// console.log($redLines);
        var oVal2 = ((window_bottom - parent_top) / 7);
        $image.css('transform','translate3d(0px, ' + oVal + 'px, 0px)');
        $redLines.each(function() {
          $redLines.children().css('transform','translate3d(0px, ' + oVal2 + 'px, 0px)');
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




