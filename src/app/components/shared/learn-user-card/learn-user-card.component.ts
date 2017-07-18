import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ViewService } from '../../../d7services';
import { NotificationBarService, NotificationType } from 'ngx-notification-bar/release';
import { FormGroup } from '@angular/forms';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-learn-user-card',
  templateUrl: './learn-user-card.component.html',
  providers: [NgbTooltipConfig],
})
export class LearnUserCardComponent implements OnInit {
  closeResult: string;
  card = {};
  projectCount = {};
  projectCount2 = {};
  badges = [];
  active = true;
  userId;
  user;
  hideMessage = false;
  messageForm: FormGroup;
  messageObj = {
    recipients: '',
    subject: '',
    body: '',
  };
  @Input() uid;
  @Input() leader;
  @Input() name;
  constructor(
    private router: Router,
    private viewService: ViewService,
    private notificationBarService: NotificationBarService,
    private config: NgbTooltipConfig, )
     {
    this.config.placement = 'bottom';
    this.config.triggers = 'hover';
  }

  ngOnInit() {
     this.getcard();
  
  }
   getcard() {
    // get card profile
    // service to get profile card 
    this.viewService.getView('maker_profile_card_data2', [['uid', this.uid]]).subscribe(data => {
      this.card = data[0];

    }, err => {
      // notification error  in service 
      this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error, allowClose: true, autoHide: false, hideOnHover: false });
    });
  }

      userProfile(fName, lName) {
    var name = fName + '-' + lName;
    this.router.navigate(['/portfolio/', name]);
  }


}
