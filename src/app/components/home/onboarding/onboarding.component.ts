import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../auth0/auth.service';

@Component({
	selector: 'app-onboarding',
	templateUrl: './onboarding.component.html'
})
export class OnboardingComponent implements OnInit {

	constructor(
		public auth: Auth
	) { }
	ngOnInit() {

	}

}
