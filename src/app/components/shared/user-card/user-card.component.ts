import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { FlagService } from '../../../d7services/flag/flag.service';
import { UserService } from '../../../d7services/user/user.service';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  
})
export class UserCardComponent implements OnInit {
card = {};
@Input() uid;
    constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService,
    private notificationBarService: NotificationBarService,

  ) { }
  ngOnInit() {
    this.getcard();
  }

  getcard(){

        // get card profile
        // service to get profile card 
    this.viewService.getView('maker_profile_card_data2', [['uid',this.uid]]).subscribe(data => {
      this.card = data[0];
    }, err => {
      // notification error  in service 
      this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
    });
  }
  

}
