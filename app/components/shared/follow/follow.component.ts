import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FlagService,UserService } from '../../../d7services';
@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
})
export class FollowComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private flagService: FlagService,
  ) {
    this.router = router;
  }
  @Input() nodeNid;
  @Input() user;
  @Output() countNumber = new EventEmitter<number>();
  @Output() HideLoadMore = new EventEmitter();
  userId;
  currentuser;
  checkUserLogin = false;
  isFollowed;
  ButtonFollow;
  countFollowers = 0;
  ngOnInit() {
    this.flagService.flagCount(this.nodeNid, 'follow').subscribe(response => {
      if(response['count'] >=1){
      this.countFollowers = response['count'];
      this.countNumber.emit(this.countFollowers);
      }else{
                this.countFollowers = 0;
      this.countNumber.emit(this.countFollowers);
      }
    }, err => {
         

      // this.notificationBarService.create({ message: 'Sorry Error msg, somthing went wrong, try again later.', type: NotificationType.Error });
    });
    this.userId = localStorage.getItem('user_id');
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data == false) {
        this.ButtonFollow = 'Follow';
      } else {
        this.flagService.isFlagged(this.nodeNid, this.userId, 'follow').subscribe(data => {
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
        this.flagService.unflag(this.nodeNid, this.userId, 'follow').subscribe(response => {
          this.isFollowed = false;
          this.ButtonFollow = 'Follow';
          this.countFollowers--;
          this.countNumber.emit(this.countFollowers);
          this.HideLoadMore.emit();
          this.nodeNid=this.nodeNid;
        }, err => {
          //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
        });
      } else {
        this.flagService.flag(this.nodeNid, this.userId, 'follow').subscribe(response => {
          this.isFollowed = true;
          this.ButtonFollow = 'Following';
          this.countFollowers++;
          this.countNumber.emit(this.countFollowers);
          this.HideLoadMore.emit();
        }, err => {
          //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
        });
      }
    });//end if check user login
  }
  /* end function follow */
  /* function check login */
  checkLogin() {
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data == false) {
        this.router.navigate(['/access-denied']);
      }
    });
  }
  /* end function  check login */
}