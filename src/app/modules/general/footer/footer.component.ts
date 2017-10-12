import { Component, OnInit } from '@angular/core';
import { Auth } from '../../auth0/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  constructor(
    private authService: Auth,
  ) { }

  ngOnInit() {
  }
  validateEmail(email) {
    const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (regexp.test(email)) {
      this.authService.signupNewsletter(email).subscribe(data => {
        console.log(data);
      });
        // this.notificationBarService.create({ message: 'Thank you for subscribing!', type: NotificationType.Success, allowClose: true, autoHide: false, hideOnHover: false });
    }
  }
}
