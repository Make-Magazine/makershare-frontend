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
	 $(' .contributers').slick({
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		arrows:false,

  	});
	$('.carousel').bind('slide.bs.carousel', function (e) {
		setTimeout(function(){
			$('.contributers').slick('unslick');
		 $('.contributers').slick({
			dots: true,
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			arrows:false,
		}
			,200)
	  });
	});
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

		$(document).on('click',"#cover-upload-link", function(e){
        e.preventDefault();
        $("#cover-upload:hidden").trigger('click');
    });

    // Adding another makerspace
    $(document).on('click','.another-space',function(e){
    	e.preventDefault();
    	spaceArray = ["makerspace-","url-"]
		addNewField($(this),spaceArray,$('.maker-group'),$('.makerspace div.maker-group'));   	
    });

    // navigating the create project page tabs
    $(document).on('click','.nav-create li a', function(e){
    	myToggle($(this),e,'-guide');
    });
    // navigating the create profile page tabs
    $(document).on('click','.create-nav li a', function(e){
    	myToggle($(this),e);
    });

    // Toggle profile grid and square view
    $(document).on('click', '.switch', function(){
    	$(this).children().toggle();
    	if($('.project').hasClass('col-md-4')){
    		$('.project').removeClass('col-md-4');
    		$('.project').addClass('col-md-12');
    		$('.project-stats').css({
				display: 'block',
				bottom: '120px'
			});
    		squareView = false;
    	} else {
    		$('.project').removeClass('col-md-12');
    		$('.project').addClass('col-md-4');
    		$('.project-stats').css({
				display: 'none',
				bottom: '120px'
			});
    		squareView = true;
    	}

    });

    // Show and hide project stats on project card
    $(document).on('mouseenter', '.project', function(){
		if (squareView){
			$(this).find('i.video-icon, i.badge-icon').hide('400');
			$(this).children('.teaser').show();
			$(this).find('.winner').show('400');
			$(this).find('.overlay').fadeIn('400');
			$(this).children('.project-stats').show('400');
		}
    });
    $(document).on('mouseleave', '.project', function(){
		if (squareView){
			$(this).find('i.video-icon, i.badge-icon').show('400');
			$(this).find('.winner').hide('400');
			$(this).find('.overlay').fadeOut('400');
			$(this).children(' .winner').hide('400');
			$(this).children('.teaser').hide();
			$(this).children('.project-stats').hide('400');
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
