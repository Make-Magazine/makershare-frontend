$(window).bind("load resize slid.bs.carousel", function() {
  var imageHeight = $(".active .holder").height();
  $(".controllers").height( imageHeight );
});
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
});
