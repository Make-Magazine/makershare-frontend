import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { FlagService } from '../../../d7services/flag/flag.service';
import { UserService } from '../../../d7services/user/user.service';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';


@Component({
  selector: 'app-fork',
  templateUrl: './fork.component.html',
  
})
export class ForkComponent implements OnInit {
@Input() nodeNid;
@Input() user;// Current User Data
userId;
    checkUserLogin = false;

currentuser;
isForked;
constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService,
    private notificationBarService: NotificationBarService,
   
  ) {  this.router = router; }
  ngOnInit() {
        this.userId = localStorage.getItem('user_id');

  }

    /* function fork */
  forkThis(e: Event) {
         this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data == false) {
        //localStorage.setItem('redirectUrl', this.router.url);
        this.router.navigate(['/access-denied']);
      }
    e.preventDefault();
      this.flagService.flag(this.nodeNid, this.userId, 'fork').subscribe(response => {
        //this.notificationBarService.create({ message: 'A private version of this project is now available for editing from Drafts in your Portfolio.', type: NotificationType.Success});
        this.router.navigate(['/portfolio']);
      }, err => {
        //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
      });
          });//end if check user login

  }
  /* end function fork */


}
