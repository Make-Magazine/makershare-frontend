import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { FlagService, UserService } from '../../../core/d7services';
import { NotificationBarService, NotificationType } from 'ngx-notification-bar/release';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  providers: [NgbTooltipConfig],
})
export class LikesComponent implements OnInit {
  @Input() nodeNid;
  @Input() likesCount: number;
  @Output() countNumber = new EventEmitter<number>();
  @Input() userId;
  countlikes: number = 0;
  toggleFlag: string;
  isLiked = false;

  constructor(
    private userService: UserService,
    private flagService: FlagService,
    private config: NgbTooltipConfig,
    private notificationBarService: NotificationBarService,
  ) {
    this.config.placement = 'bottom';
    this.config.triggers = 'hover';
  }

  ngOnInit() {
    this.countLikes();
    this.userId = localStorage.getItem('user_id');
    this.userService.isLogedIn().subscribe(data => {
      if (data && this.userId) {
        this.flagService
          .isFlagged(this.nodeNid, this.userId, 'like')
          .subscribe(data => {
            this.isLiked = data[0];
          });
      }
    });
  }

  countLikes() {
    this.flagService.flagCount(this.nodeNid, 'like').subscribe(response => {
      // console.log('response');
      // console.log(response, this.nodeNid);
      this.countlikes = response['count'] ? response['count'] : 0;
      this.countNumber.emit(this.countlikes);
    });
  }

  likeThis(e: Event) {
    e.preventDefault();
    this.userService.isLogedIn().subscribe(status => {
      console.log(status);
      if(status == true){
        this.toggleFlag = this.isLiked ? 'unflag' : 'flag';
        this.flagService
          [this.toggleFlag](this.nodeNid, this.userId, 'like')
          .subscribe(response => {
            this.countlikes = this.isLiked ? --this.countlikes : ++this.countlikes;
            this.isLiked = !this.isLiked;
          });
      }else {
        this.notificationBarService.create({
          message:
            'LOGIN/SIGNUP to be able to Like projects.',
          type: NotificationType.Warning,
          autoHide: true,
          allowClose: true,
          hideOnHover: false,
          isHtml: true,
        });
      }
    });



    

  }
}
