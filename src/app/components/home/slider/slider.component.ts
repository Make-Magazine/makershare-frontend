import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

declare var jQuery: any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styles: [`
    .carousel{
        overflow:hidden;
        width:100%;
    }
    .slides{
        list-style:none;
        position:relative;
        width:500%; /* Number of panes * 100% */
        overflow:hidden; /* Clear floats */
            /* Slide effect Animations*/
        -moz-animation:carousel 30s infinite;
        -webkit-animation:carousel 30s infinite;
        animation:carousel 30s infinite;
    }
    .slides > li{
        position:relative;
        float:left;
        width: 20%; /* 100 / number of panes */
    }
    .carousel img{
        display:block;
        width:100%;
        max-width:100%;
    }
    .carousel h2{
        margin-bottom: 0;
        font-size:1em;
        padding:1.5em 0.5em 1.5em 0.5em;
        position:absolute;
        right:0px;
        bottom:0px;
        left:0px;
        text-align:center;
        color:#fff;
        background-color:rgba(0,0,0,0.75);
        text-transform: uppercase;
    }
    @keyframes carousel{
        0%    { left:-5%; }
        11%   { left:-5%; }
        12.5% { left:-105%; }
        23.5% { left:-105%; }
        25%   { left:-205%; }
        36%   { left:-205%; }
        37.5% { left:-305%; }
        48.5% { left:-305%; }
        50%   { left:-405%; }
        61%   { left:-405%; }
        62.5% { left:-305%; }
        73.5% { left:-305%; }
        75%   { left:-205%; }
        86%   { left:-205%; }
        87.5% { left:-105%; }
        98.5% { left:-105%; }
        100%  { left:-5%; }
    }
  `],
  providers: [NgbCarouselConfig] // add NgbCarouselConfig to the component providers

})
export class SliderComponent implements OnInit {
  sliders = [];
  images= [
    {src:'./assets/images/slider/Maker-Share-Intro-1.jpg'},
    {src:'./assets/images/slider/Maker-Share-Intro-2.jpg'},
    {src:'./assets/images/slider/Maker-Share-Intro-3.jpg'},
    {src:'./assets/images/slider/Maker-Share-Intro-4.jpg'},
    {src:'./assets/images/slider/Maker-Share-Intro-7.jpg'},
    {src:'./assets/images/slider/Maker-Share-Intro-8.jpg'},
    {src:'./assets/images/slider/Maker-Share-Intro-9.jpg'},
    {src:'./assets/images/slider/Maker-Share-Intro-10.jpg'},
    {src:'./assets/images/slider/Maker-Share-Intro-13.jpg'},
    {src:'./assets/images/slider/Maker-Share-Intro-16.jpg'},
    {src:'./assets/images/slider/Maker-Share-Intro-18.jpg'},
    {src:'./assets/images/slider/Maker-Share-Intro-19.jpg'},
    {src:'./assets/images/slider/Maker-Share-Intro-20.jpg'},
    {src:'./assets/images/slider/Maker-Share-Intro-21.jpg'},
    {src:'./assets/images/slider/Maker-Share-Intro-22.jpg'},
    {src:'./assets/images/slider/Maker-Share-Intro-25.jpg'},
    {src:'./assets/images/slider/Maker-Share-Intro-26.jpg'},
    {src:'./assets/images/slider/Maker-Share-Intro-30.jpg'},
    {src:'./assets/images/slider/Maker-Share-Intro-31.jpg'},
    {src:'./assets/images/slider/Maker-Share-Intro-35.jpg'},
  ]
  constructor(
    private ViewService: ViewService,
  ) {
    
   }
  ngOnInit() {
	jQuery('.carousel-slider-slick').slick({
			arrows: false,
			infinite: true,
			speed: 3000,
			autoplay: true,
			autoplaySpeed: 500,
			adaptiveHeight: true,
			slidesToShow: 5,
			draggable: true,
			swipe: true,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 4
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 3
					}
				}
			]
		});
    // // loading the slider from the API
    // this.ViewService.getView('home_banner').subscribe(data => {
    //   this.sliders = data;
    // }, err => {

    // });
  }
}
