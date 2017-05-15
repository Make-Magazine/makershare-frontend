import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, FormArray } from '@angular/forms';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor(
    private notificationBarService: NotificationBarService,
  ) { }

  ngOnInit() {
  }
  validateEmail(email) {
    var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(regexp.test(email)){
        this.notificationBarService.create({ message: 'Thank you for subscribing!', type: NotificationType.Success, allowClose: true, autoHide: false, hideOnHover: false });
    }
  }
}
