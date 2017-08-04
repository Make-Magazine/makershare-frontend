import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FlagService, UserService } from '../../../CORE/d7services';
@Component({
  selector: 'app-project-vote',
  templateUrl: './project-vote.component.html',
})
export class ProjectVoteComponent implements OnInit {
  @Input() nodeNid;
  isVoted;
  ButtonVoted;
  userId;
  checkUserLogin;
  constructor(
    private router: Router,
    private userService: UserService,
    private flagService: FlagService,
  ) {
    this.router = router;
  }
  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    this.checkUserVote();
  }

  checkUserVote() {
    this.flagService
      .isFlagged(this.nodeNid, this.userId, 'project_vote')
      .subscribe(
        data => {
          this.isVoted = data[0];
          /* initialize Button Follow*/
          if (this.isVoted == false) {
            /* start if  */
            this.ButtonVoted = 'Vote';
          } else {
            this.ButtonVoted = 'Voted';
          } /* end else if  */
        },
        err => {
          // this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
        },
      );
  }

  voteThis(e: Event) {
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data == false) {
        this.router.navigate(['/access-denied']);
      }
      e.preventDefault();

      console.log(this.isVoted);

      this.flagService
        .flag(this.nodeNid, this.userId, 'project_vote')
        .subscribe(
          response => {
            this.isVoted = true;
            this.ButtonVoted = 'Voted';
          },
          err => {
            // this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
          },
        );
    }); // end if check user login
  }
}
