import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { FlagService } from '../../../d7services/flag/flag.service';
import { UserService } from '../../../d7services/user/user.service';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  providers: [NgbTooltipConfig],

})
export class LikeComponent implements OnInit {
  @Input() nodeNid;
  @Input() user;
  @Input() showcase = false;
  @Input() project = false;
  userId;
  currentuser;
  checkUserLogin = false;
  countlikes = 0;
  liked = false;
  @Output() countNumber = new EventEmitter<number>();
  like: string;
  isLiked = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService,
    private notificationBarService: NotificationBarService,
    private config: NgbTooltipConfig,

  ) {
    this.router = router;
    config.placement = 'bottom';
    config.triggers = 'hover';
  }
  ngOnInit() {
    this.countLikes();
    this.userId = localStorage.getItem('user_id');
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data == false) { } else {
        /*like start */
        this.flagService.isFlagged(this.nodeNid, this.userId, 'like').subscribe(data => {
          this.isLiked = data[0];
          if (this.isLiked) { this.like = "Unlike this idea"; }
          else { this.like = "Like this idea"; }
          // console.log(this.isLiked)
        }, err => {
          //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
          // console.log(err);
        })

        /*like end*/
      }//end else 
    });//end userservice isLogedIn

  }
  countLikes() {
    this.flagService.flagCount(this.nodeNid, 'like').subscribe(response => {
      this.countlikes = response['count'];

      if (this.countlikes >= 1) {
        this.countNumber.emit(this.countlikes);
      } else {
        this.countlikes = 0;
        this.countNumber.emit(this.countlikes);
      }
    })
  }

  /* function like */
  likeThis(e: Event) {
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data == false) {
        //localStorage.setItem('redirectUrl', this.router.url);
        this.router.navigate(['/access-denied']);
      }
      e.preventDefault();
      if (this.isLiked) {
        this.flagService.unflag(this.nodeNid, this.user, 'like').subscribe(response => {
          this.isLiked = false;
          this.countlikes--;
          this.countNumber.emit(this.countlikes);
          this.like = "Like this idea";
        }, err => {
          //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
          // console.log(err);
        });
      } else {
        this.flagService.flag(this.nodeNid, this.user, 'like').subscribe(response => {
          this.isLiked = true;
          this.countlikes++;
          this.countNumber.emit(this.countlikes);
          this.like = "Unlike this idea";
        }, err => {
          //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
          // console.log(err);
        });
      }
    });//end if check user login

  }
  /* end function like */

}
