import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewService, FlagService, UserService } from '../../../d7services';
// import { NotificationBarService, NotificationType } from 'ngx-notification-bar/release';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-follow-user',
  templateUrl: './follow-user.component.html',
})
export class FollowUserComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService,
    // private notificationBarService: NotificationBarService,
    private modalService: NgbModal,
  ) { }
  @Input() userfollower;
  @Output() countNumber = new EventEmitter<number>();
  @Output() countNumberFollowing = new EventEmitter<number>();

  @Output() HideLoadMore = new EventEmitter();
  userId;
  currentuser;
  CurrentLoggedUserId: number;
  checkUserLogin = false;
  closeResult: string;
  whoFollow = [];
  whoFollowing = [];
  hideloadmorefollow = true;
  hideloadmorefollowing = true;
  pages: number = 0;



  isFollowed;
  ButtonFollow;
  countFollowers = 0;
  countFollowing = 0;

  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    this.flagService.flagCount(this.userfollower, 'follow_user').subscribe(response => {
      if (response['count'] >= 1) {
        this.countFollowers = response['count'];
        this.countNumber.emit(this.countFollowers);
      } else {
        this.countFollowers = 0;
        this.countNumber.emit(this.countFollowers);

      }
    }, err => {


      // this.notificationBarService.create({ message: 'Sorry Error msg, somthing went wrong, try again later.', type: NotificationType.Error });
    });
    this.flagService.getCountFollowing(this.userId).subscribe(response => {
      this.countFollowing = response[0];
      this.countNumberFollowing.emit(this.countFollowing);
    }, err => {


      // this.notificationBarService.create({ message: 'Sorry Error msg, somthing went wrong, try again later.', type: NotificationType.Error });
    });
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data == false) {
        this.ButtonFollow = 'Follow';
      } else {
        this.flagService.isFlagged(this.userfollower, this.userId, 'follow_user').subscribe(data => {
          this.isFollowed = data[0];
          /* initialize Button Follow*/
          if (this.isFollowed == false) {/* start if  */
            this.ButtonFollow = 'Follow';
          } else {
            this.ButtonFollow = 'Following';
          }/* end else if  */
        }, err => {
          //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
        })
      }//end else if
    });//end if check user login
    let userName = this.route.snapshot.params['user_name'];
    if (userName) {
      this.userService.getIdFromUrl(userName).subscribe(res => {
        this.CurrentLoggedUserId = res.uid;
        console.log(this.CurrentLoggedUserId)
        this.getWhoFollow();
        this.getWhoFollowing();
      }, err => {
      });
    }


  }
  /* function follow */
  followThis(e: Event) {
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data == false) {
        this.router.navigate(['/access-denied']);
      }
      e.preventDefault();
      if (this.isFollowed) {
        this.flagService.unflag(this.userfollower, this.userId, 'follow_user').subscribe(response => {
          this.isFollowed = false;
          this.ButtonFollow = 'Follow';
          this.countFollowers--;
          this.countNumber.emit(this.countFollowers);
          this.HideLoadMore.emit();
          // this.nodeNid = this.nodeNid;
          this.getWhoFollow();
          this.getWhoFollowing();
        }, err => {
          //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
        });

      } else {
        this.flagService.flag(this.userfollower, this.userId, 'follow_user').subscribe(response => {
          this.isFollowed = true;
          this.ButtonFollow = 'Following';
          this.countFollowers++;
          this.countNumber.emit(this.countFollowers);
          this.HideLoadMore.emit();
          this.getWhoFollow();
          this.getWhoFollowing();
        }, err => {
          //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
        });
      }
    });//end if check user login
  }

  follower(contentfollower) {

    this.modalService.open(contentfollower, { size: 'sm' }).result.then((result) => {
      this.closeResult = 'Closed with: ${result}';
    }, (reason) => {
      this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
    });
  }
  following(content) {

    this.modalService.open(content, { size: 'sm' }).result.then((result) => {
      this.closeResult = 'Closed with: ${result}';
    }, (reason) => {
      this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
    });
  }
  getWhoFollow() {
    if (this.CurrentLoggedUserId) {

      this.viewService.getView('who-follow', [['uid', this.CurrentLoggedUserId], ['page', this.pages]]).subscribe(data => {
        if (data[0]) {
          //this.countLikers = data[0]['likes_count'];
        }
        this.whoFollow = this.whoFollow.concat(data);
       // this.whoFollow = data;
        // console.log(data)
        this.loadMoreVisibilty();
      });
    }
  }
  getWhoFollowing() {
    if (this.CurrentLoggedUserId) {
      this.viewService.getView('who-following', [['uid', this.CurrentLoggedUserId]]).subscribe(data => {
        if (data[0]) {
          //this.countLikers = data[0]['likes_count'];
        }
        //this.whoFollowing = this.whoFollowing.concat(data);
        this.whoFollowing = data;
        // console.log(data)
        //this.loadMoreVisibilty();
      });
    }
  }
  /* function load more  */
  loadMoreFollow() {
    this.pages++;
    this.getWhoFollow();
  }
  /* end function load more  */
  // Function to control load more button
  loadMoreVisibilty() {
    // get the challenges array count
    if (this.countFollowers <= this.whoFollow.length) {

      this.hideloadmorefollow = true;

    } else if (this.countFollowers > this.whoFollow.length) {
      this.hideloadmorefollow = false;
    }
  }
  /* END FUNCTION loadMoreVisibilty */
   /* function load more  */
  loadMoreFollowing() {
    this.pages++;
    this.getWhoFollow();
  }
  /* end function load more  */
  // Function to control load more button
  loadMoreVisibiltyFollowing() {
    // get the challenges array count
    if (this.countFollowing <= this.whoFollowing.length) {

      this.hideloadmorefollowing = true;

    } else if (this.countFollowing > this.whoFollowing.length) {
      this.hideloadmorefollowing = false;
    }
  }
  /* END FUNCTION loadMoreVisibilty */

}
