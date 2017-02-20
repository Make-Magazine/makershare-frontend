$(window).bind("load resize slid.bs.carousel", function() {
  var imageHeight = $(".active .holder").height();
  $(".controllers").height( imageHeight );
});
function tagsHover(){

};
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
  $(document).on('mouseover', '.explore-tags li a', function() {
    id = $(this).attr('id');
    ul = "ul."+id;
    $('.submenus ' + ul).siblings().hide();
    $('.submenus ' + ul).show();

  });
  
	$('.explore-tags li a').mouseover(function() {
		id = $(this).attr('id');
		ul = "ul."+id;
		$('.submenus ' + ul).siblings().hide();
		$('.submenus ' + ul).show();
	});

	$("#cover-upload-link").on('click', function(e){
        e.preventDefault();
        $("#cover-upload:hidden").trigger('click');
    });
});
