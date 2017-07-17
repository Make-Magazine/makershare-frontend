import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  constructor(
  ) { }

  ngOnInit() {
  }
  validateEmail(email) {
    var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(regexp.test(email)){
        //this.notificationBarService.create({ message: 'Thank you for subscribing!', type: NotificationType.Success, allowClose: true, autoHide: false, hideOnHover: false });
    }
  }
}
