
$(window).bind("load resize slid.bs.carousel", function() {
  var imageHeight = $(".active .holder").height();
  $(".controllers").height( imageHeight );
});
function myToggle(a,e,b){
	e.preventDefault();
	a.addClass('active');
	a.parent().siblings().children('a').removeClass('active');
	id = a.attr('id');
	$('.' + id).siblings().hide();
	$('.' + id).show();
	if(b){
		$('.' + id + b).siblings().hide();
		$('.' + id + b).show();
	}
};
// addNewField ( $(this) , arrayOfFieldsIds,group to clone,conatiner to get length)
function addNewField(a,b,g,c) {
	d = c.length +1;
	console.log(c.length);
	console.log(d)
	newResource = a.prev(g).clone();

	for (i = 0; i <= b.length; i++) { 
	    newResource.children('label:nth-of-type(' + i+1 + ')').attr("for",b[i] + d);
	    newResource.children('input:nth-of-type(' + i+1 + ')').attr("id",b[i] + d);
	    newResource.children('select:nth-of-type(' + i+1 + ')').attr("id",b[2+i] + d);
	}
	newResource.insertBefore(a);
}
function addCollab(){
	var numItems = $('.add-collaborate').length + $('.collaborate').length;
	i = numItems+1;
	add = '<div class="row add-collaborate">'+
					'<div class="col-md-7">' +
						'<div class="form-group">' +
							'<label for="collab-name-'+i+'">Name</label>' +
							'<input type="text" class="form-control" id="collab-name-'+i+'" placeholder="Start typing a name, then select">'+
						'</div>' +
						'<div class="form-group">' +
							'<label for="collab-role-'+i+'">Role</label>' +
							'<input type="text" class="form-control" id="collab-role-'+i+'" placeholder="Start typing a name, then select">'+
						'</div>	' +
					'</div>' +
					'<div class="col-md-3 col-md-offset-2">' +
						'<div class="form-group sort">' +
							'<label for="collab-order-'+i+'">Sort Order</label>' +
							'<input type="text" id="collab-order-'+i+'" placeholder="'+i+'">' +
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
/*var */
$(document).ready(function() {
	//  $(' .contributers').slick({
	// 	dots: true,
	// 	infinite: true,
	// 	speed: 300,
	// 	slidesToShow: 1,
	// 	arrows:false,

  // 	});
	// $('.carousel').bind('slide.bs.carousel', function (e) {
	// 	setTimeout(function(){
	// 		$('.contributers').slick('unslick');
	// 	 $('.contributers').slick({
	// 		dots: true,
	// 		infinite: true,
	// 		speed: 300,
	// 		slidesToShow: 1,
	// 		arrows:false,
	// 	}
	// 		,200)
	//   });
	// });
	$('.navbar-header button,#navbar').hover(function() {
		$('#navbar').show();
		setTimeout(function(){},200);
	}, function() {

			$('#navbar').hide();
	});

	// mouse over display of project categories
  $(document).on('mouseover', '.explore-tags li a', function() {
    id = $(this).attr('id');
    ul = "ul."+id;
    $('.submenus ' + ul).siblings().hide();
    $('.submenus ' + ul).show();

  });
  $(document).on('click','.project-aside a', function(e){
  	e.preventDefault();
  	id = $(this).parent().attr('id');
  	$('#'+id).addClass('active');
  	$('#'+id).siblings().removeClass('active');
  	$('.'+id).show();
  	$('.'+id).siblings().hide();

  })

	$(document).on('click',"#cover-upload-link", function(e){
        e.preventDefault();
        $("#cover-upload:hidden").trigger('click');
    });

		$(document).on('click',".resource-file", function(e){
        e.preventDefault();
        $(this).parent().find(".file").trigger('click');
    });

    // Adding another makerspace
    $(document).on('click','.another-space',function(e){
    	e.preventDefault();
    	spaceArray = ["makerspace-","url-"]
		addNewField($(this),spaceArray,$('.maker-group'),$('.makerspace div.maker-group'));   	
    });

    // navigating the create project page tabs

    // navigating the create profile page tabs
    $(document).on('click','.create-nav li a', function(e){
    	myToggle($(this),e);
    });

    // Toggle profile grid and square view
    $(document).on('click', '.square-view , .grid-view', function(){
    	// $(this).children().toggle();
    	if(squareView){
    		$('.projects-grid .project-item ').removeClass('col-lg-6');
    		$('.projects-grid .project-item ').addClass('col-lg-12');
				$('.projects-grid .project-item .content-side p.project-text-grid').css({display: 'block'});
    		$('.projects-grid .project-stats').css({
				display: 'block',
				bottom: '120px'
			});
			$('.projects-grid .categories').css({
				display: 'block',
			});
    		squareView = false;
    	} else {
    		$('.projects-grid .project-item').removeClass('col-lg-12');
    		$('.projects-grid .project-item').addClass('col-lg-6');
				$('.projects-grid .project-item .content-side p.project-text-grid').css({display: 'none'});
    		$('.projects-grid .project-stats').css({
					display: 'none',
					bottom: '120px'
				});
				$('.projects-grid .categories').css({
					display: 'none',
				});
    		squareView = true;
    	}
    });

    // Show and hide project stats on project card
    $(document).on('mouseenter', '.project', function(){
		if (squareView){
			$(this).find('.icons').stop();
			$(this).find('.icons').fadeOut('400');
			$(this).find('.teaser').stop();
			$(this).find('.teaser').fadeIn('400');
			$(this).find('.overlay').stop();
			$(this).find('.overlay').fadeIn('400');
		}
    });
    $(document).on('mouseleave', '.project', function(){
		if (squareView){
			$(this).find('.icons').stop();
			$(this).find('.icons').fadeIn('400');
			$(this).find('.overlay').stop();
			$(this).find('.overlay').fadeOut('400');
			$(this).find('.teaser').stop();
			$(this).find('.teaser').fadeOut('400');
		}
    });

    /*$(document).on('click','.tools a, .materials a, .parts a', function(e){
    	e.preventDefault();
    	var $tr    = $(this).siblings('div').children(' table tbody tr');
    	console.log('s')
		var $clone = $tr.clone();
		$tr.after($clone);
		$clone.find(':text').val('');
    });*/
});
