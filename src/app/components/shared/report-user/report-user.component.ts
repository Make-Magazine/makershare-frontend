import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { FlagService } from '../../../d7services/flag/flag.service';
import { UserService } from '../../../d7services/user/user.service';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';

@Component({
  selector: 'app-report-user',
  templateUrl: './report-user.component.html',
})
export class ReportUserComponent implements OnInit {
  userId;
  checkUserLogin = false;
  @Input() userReportId;
  currentuser;
  isReported = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService,
    private notificationBarService: NotificationBarService, ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    if(this.userId && this.userReportId){
      this.flagService.isFlagged(this.userReportId, this.userId, 'report').subscribe(data => {
          this.isReported = data[0];

      });
    }

  }
  /* function report user */
  reportThis(e: Event) {
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data == false) {
        this.router.navigate(['/access-denied']);
      } 
      e.preventDefault();
     if ((this.isReported == false)) {
        this.flagService.flag(this.userReportId, this.userId, 'report').subscribe(response => {
          this.isReported = true;
          this.notificationBarService.create({ message: 'User has been reported.', type: NotificationType.Success });
        }, err => {
        });
      }
    });//end if check user login
  }
  /* end function report user */
}
