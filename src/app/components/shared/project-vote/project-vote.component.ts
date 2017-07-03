import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService,FlagService,UserService } from '../../../d7services';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';
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
  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService,
    private notificationBarService: NotificationBarService,
  ) {
    this.router = router;
  }
  ngOnInit() {
        this.userId = localStorage.getItem('user_id');
        this.checkUserVote();

  }

  checkUserVote(){
          this.flagService.isFlagged(this.nodeNid, this.userId, 'project_vote').subscribe(data => {
          this.isVoted = data[0];
          /* initialize Button Follow*/
          if (this.isVoted == false) {/* start if  */
            this.ButtonVoted = 'Vote';
          } else {
            this.ButtonVoted = 'Voted';
          }/* end else if  */
        }, err => {
          //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
        })
  }

  voteThis(e: Event){
        this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data == false) {
        this.router.navigate(['/access-denied']);
      }
      e.preventDefault();
   
        this.flagService.flag(this.nodeNid, this.userId, 'project_vote').subscribe(response => {
          this.isVoted = true;
          this.ButtonVoted = 'Voted';

        }, err => {
          //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
        });
      
    });//end if check user login
  }
}
