import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { FlagService } from '../../../d7services/flag/flag.service';
import { UserService } from '../../../d7services/user/user.service';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';


@Component({
  selector: 'app-fork',
  templateUrl: './fork.component.html',
  
})
export class ForkComponent implements OnInit {
@Input() nodeNid;
@Input() user;// Current User Data
currentuser;
isForked;
constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService,
    private notificationBarService: NotificationBarService,
   
  ) { }
  ngOnInit() {

  }

    /* function fork */
  forkThis(e: Event) {
    e.preventDefault();
      this.flagService.flag(this.nodeNid, this.user.uid, 'fork').subscribe(response => {
        this.notificationBarService.create({ message: 'A private version of this project is now available for editing from Drafts in your Portfolio.', type: NotificationType.Success});
        this.router.navigate(['/profile']);
      }, err => {
        this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
      });
  }
  /* end function fork */


}
