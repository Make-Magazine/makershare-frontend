import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Auth } from '../../../auth0/auth.service';

declare var jQuery: any;

@Component({
	selector: 'app-onboarding',
	templateUrl: './onboarding.component.html'
})
export class OnboardingComponent implements OnInit {

	constructor(
		private auth: Auth
	) { }

	ngOnInit() {
		jQuery('.carousel-slider-slick').slick({
			arrows: false,
			infinite: true,
			speed: 3000,
			autoplay: true,
			autoplaySpeed: 500,
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
