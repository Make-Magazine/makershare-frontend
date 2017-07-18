import { Component, OnInit, Input } from '@angular/core';
import { FlagService,UserService } from '../../../d7services';
import { NotificationBarService, NotificationType } from 'ngx-notification-bar/release';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-comment',
  templateUrl: './report-comment.component.html',
})
export class ReportCommentComponent implements OnInit {
  userId;
  isReported = false;
  checkUserLogin = false;

  @Input() commentReportId;

  constructor(
    private router: Router,
    private userService: UserService,
    private flagService: FlagService,
    private notificationBarService: NotificationBarService, ) { }

  ngOnInit() {

    this.userId = localStorage.getItem('user_id');
    this.flagService.isFlagged(this.commentReportId, this.userId, 'reportcomment').subscribe(data => {
      this.isReported = data[0];

    });
  }
  /* function report user */
  onSubmit(e: Event) {
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data == false) {
        this.router.navigate(['/access-denied']);
      }
      e.preventDefault();
      if ((this.isReported == false)) {

        this.flagService.flag(this.commentReportId, this.userId, 'reportcomment').subscribe(response => {
          this.isReported = true;

          this.notificationBarService.create({ message: 'Comment has been reported.', type: NotificationType.Success,allowClose: true, autoHide: false, hideOnHover: false });
        }, err => {
        });

      }
    });//end if check user login
  }
  /* end function report user */
}
