import { Component, OnInit, Input } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';
import { FlagService } from '../../../d7services/flag/flag.service';
import { UserService } from '../../../d7services/user/user.service';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-report-comment',
  templateUrl: './report-comment.component.html',
})
export class ReportCommentComponent implements OnInit {
  userId;
  isReported = false;
  checkUserLogin = false;

  @Input() commentReportId;

  constructor(private viewService: ViewService,
    private router: Router,
    private userService: UserService,
    private flagService: FlagService,
    private notificationBarService: NotificationBarService, ) { }

  ngOnInit() {
              console.log(this.commentReportId)

    this.userId = localStorage.getItem('user_id');
    this.flagService.isFlagged(this.commentReportId, this.userId, 'reportcomment').subscribe(data => {
      this.isReported = data[0];
      console.log(this.isReported);

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
          console.log(this.commentReportId)

          this.notificationBarService.create({ message: 'Comment has been reported.', type: NotificationType.Success });
        }, err => {
        });

      }
    });//end if check user login
  }
  /* end function report user */
}
