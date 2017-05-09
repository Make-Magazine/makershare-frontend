import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Auth } from '../../../auth0/auth.service';

declare var jQuery: any;
import * as $ from 'jquery';
import 'slick-carousel/slick/slick';



@Component({
	selector: 'app-onboarding',
	templateUrl: './onboarding.component.html'
})
export class OnboardingComponent implements OnInit {

	constructor(
		private auth: Auth
	) { }
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
	ngOnInit() {
		jQuery('.carousel-slider-slick').slick({
			arrows: false,
			infinite: true,
			speed: 2000,
			autoplay: true,
			autoplaySpeed: 1000,
			adaptiveHeight: true,
			slidesToShow: 5,
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
	}
	AfterViewInit() {
		jQuery('.carousel-slider-slick').slick({
			// infinite: true,
            // slidesToShow: 1,
            // slidesToScroll: 1,
            // arrows: true,
            // autoplay:true,
            // autoplaySpeed: 5000,
            // cssEase: 'linear'
		});
	}


}
