import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService, FlagService, UserService } from '../../../d7services';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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
  hideloadmorelike = true;
  closeResult: string;
  pages: number = 0;
  currentuser;
  whoLike = [];
  whoLike2 = [];
  LoadCount: number;
  checkUserLogin = false;
  countlikes = 0;
  countLikers: number = 0;
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
    private modalService: NgbModal,

  ) {
    this.router = router;
    config.placement = 'bottom';
    config.triggers = 'hover';
  }
  ngOnInit() {
    this.countLikes();
    this.getWhoLike();
    this.getWhoLike2()
    this.userId = localStorage.getItem('user_id');
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data == false) {

      } else {
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
  getWhoLike() {
    this.viewService.getView('who-liked', [['nid', this.nodeNid]]).subscribe(data => {
      this.whoLike = data;
      if (this.whoLike.length > 7) {
        this.LoadCount = this.whoLike.length - 7;
      }
      // console.log(this.whoLike.length)
    });
  }
  getWhoLike2() {
    this.viewService.getView('who-liked2', [['nid', this.nodeNid], ['page', this.pages]]).subscribe(data => {
      if (data[0]) {
        // console.log(data[0]['likes_count'])
        this.countLikers = data[0]['likes_count'];
      }
      this.whoLike2 = this.whoLike2.concat(data);
      this.loadMoreVisibilty();
    });
  }
  open(content) {

    this.modalService.open(content, { size: 'sm' }).result.then((result) => {
      this.closeResult = 'Closed with: ${result}';
    }, (reason) => {
      this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
    });


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
  goToProfile(path: string) {
    
    this.router.navigate(['/portfolio/', path]);
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
      if (this.isLiked && data == true) {
        this.flagService.unflag(this.nodeNid, this.user, 'like').subscribe(response => {
          this.isLiked = false;
          this.countlikes--;
          this.countNumber.emit(this.countlikes);
          this.like = "Like this idea";
          this.whoLike = [];
          this.getWhoLike();
          this.whoLike2 = [];
          this.getWhoLike2();
        }, err => {
          //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
          // console.log(err);
        });
      } else if (!this.isLiked && data == true) {
        this.flagService.flag(this.nodeNid, this.user, 'like').subscribe(response => {
          this.isLiked = true;
          this.countlikes++;
          this.countNumber.emit(this.countlikes);
          this.like = "Unlike this idea";
          this.whoLike = [];
          this.getWhoLike();
          this.whoLike2 = [];
          this.getWhoLike2();
        }, err => {
          //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
          // console.log(err);
        });
      }
    });//end if check user login

  }
  /* end function like */

  /* function load more  */
  loadMoreLike() {
    this.pages++;
    this.getWhoLike2();
  }
  /* end function load more  */
  // Function to control load more button
  loadMoreVisibilty() {
    // get the challenges array count
    if (this.countLikers >= this.whoLike2.length) {

      this.hideloadmorelike = true;

    } else if (this.countLikers > this.whoLike2.length) {
      this.hideloadmorelike = false;
    }
  }
  /* END FUNCTION loadMoreVisibilty */
}
