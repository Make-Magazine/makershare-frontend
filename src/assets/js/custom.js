
$(window).bind("load resize slid.bs.carousel", function () {
	var imageHeight = $(".active .holder").height();
	$(".controllers").height(imageHeight);
});
function myToggle(a, e, b) {
	e.preventDefault();
	a.addClass('active');
	a.parent().siblings().children('a').removeClass('active');
	id = a.attr('id');
	$('.' + id).siblings().hide();
	$('.' + id).show();
	if (b) {
		$('.' + id + b).siblings().hide();
		$('.' + id + b).show();
	}
};
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
	$(document).on('click', '.project-aside a', function (e) {
		e.preventDefault();
		id = $(this).parent().attr('id');
		$('#' + id).addClass('active');
		$('#' + id).siblings().removeClass('active');
		$('.' + id).show();
		$('.' + id).siblings().hide();

	})

	$(document).on('click', "#cover-upload-link", function (e) {
		e.preventDefault();
		$("#cover-upload:hidden").trigger('click');
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

	// navigating the create project page tabs

	// navigating the create profile page tabs
	$(document).on('click', '.create-nav li a', function (e) {
		myToggle($(this), e);
	});

	// Toggle profile grid and square view
	// $(document).on('click', '.square-view', function () {
	// 	// $(this).children().toggle();
	// 	if (squareView) {
	// 		$('.projects-grid .project-item ').removeClass('col-lg-6');
	// 		$('.projects-grid .project-item ').addClass('col-lg-12');
	// 		$('.projects-grid .project-item .content-side p.project-text-grid').css({ display: 'block' });
	// 		$('.projects-grid .project-stats').css({
	// 			display: 'block',
	// 			bottom: '120px'
	// 		});
	// 		$('.projects-grid .categories').css({
	// 			display: 'block',
	// 		});
	// 		squareView = false;
	// 	} 
	// });
	// $(document).on('click', '.grid-view', function () {
	// 	// $(this).children().toggle();
	// 	if (!squareView) {
	// 		$('.projects-grid .project-item').removeClass('col-lg-12');
	// 		$('.projects-grid .project-item').addClass('col-lg-6');
	// 		$('.projects-grid .project-item .content-side p.project-text-grid').css({ display: 'none' });
	// 		$('.projects-grid .project-stats').css({
	// 			display: 'none',
	// 			bottom: '120px'
	// 		});
	// 		$('.projects-grid .categories').css({
	// 			display: 'none',
	// 		});
	// 		squareView = true;
	// 	}
	// });
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
			if($(this).find('.latest-project-image').length > 0 ){
				$(this).find('.latest-project-image').stop();			
				$(this).find('.latest-project-image').fadeIn(800);
				$(this).find('.maker-card-photo').stop();
				$(this).find('.maker-card-photo').fadeOut(800);
			}
			
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
			if($(this).find('.latest-project-image').length > 0 ){			
				$(this).find('.latest-project-image').stop();			
				$(this).find('.latest-project-image').fadeOut(800);
				$(this).find('.maker-card-photo').stop();
				$(this).find('.maker-card-photo').fadeIn(800);			
			}
		}
	});
	$(document).on('click','#search-icon', function(){
		$('#search-box-input').focus();
	})
	// $(document).on('click', '.display-style p',function(){
	// 	if($(this).hasClass('active')) {
			
	// 	}else {
	// 		$(this).addClass('active');
	// 		$(this).siblings().removeClass('active');			
	// 	}
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



