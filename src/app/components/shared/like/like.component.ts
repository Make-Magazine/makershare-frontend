import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ViewService, FlagService, UserService } from '../../../d7services';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  providers: [NgbTooltipConfig],

})
export class LikeComponent implements OnInit {
  @Input() nodeNid;
  // DKY user is input??
  @Input() user;
  @Input() showcase = false;
  @Input() project = false;
  // Emits Count to parent Component
  @Output() countNumber = new EventEmitter<number>();
  userId;
  hideloadmorelike = true;
  closeResult: string;
  pages: number = 0;
  whoLikeMini = [];
  whoLikeFull = [];
  countlikes:number = 0;
  countLikers: number = 0;
  liked = false;
  toggleFlag:string;
  like: string;
  isLiked = false;
  constructor(
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService,
    private config: NgbTooltipConfig,
    private modalService: NgbModal,
  ) {
    this.config.placement = 'bottom';
    this.config.triggers = 'hover';
  }
  ngOnInit() {
    this.countLikes();
    this.getWhoLike();
    this.userId = localStorage.getItem('user_id');
    this.userService.isLogedIn().subscribe(data => {
      if (data && this.userId) {
        this.flagService.isFlagged(this.nodeNid, this.userId, 'like').subscribe(data => {
          this.isLiked = data[0];
          this.like = this.isLiked? "Unlike this idea": "Like this idea";
        })
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
    e.preventDefault();
    this.toggleFlag = this.isLiked? 'unflag':'flag';
    this.flagService[this.toggleFlag](this.nodeNid, this.userId, 'like').subscribe(response => {
      this.countlikes = this.isLiked? this.countlikes--:this.countlikes++;
      this.isLiked = !this.isLiked;
      this.like = this.isLiked? "Unlike this idea": "Like this idea";
      this.whoLikeMini = [];
      this.whoLikeFull = [];
      this.getWhoLike();
    });
  }
  getWhoLike() {
    this.viewService.getView('who-liked', [['nid', this.nodeNid]]).subscribe(data => {
      this.whoLikeFull = this.whoLikeFull.concat(data);
      if(this.whoLikeMini.length == 0){
        this.whoLikeMini = data;
        if(this.whoLikeMini.length > 7){
          this.whoLikeMini.length = 7;
        }
      }
    });
  }
  open(content) {
    this.modalService.open(content, { size: 'sm' }).result.then((result) => {
      this.closeResult = 'Closed with: ${result}';
    }, (reason) => {
      this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
    });
  }
  loadMoreLike() {
    this.pages++;
    this.getWhoLike();
  }
  loadMoreVisibilty() {
    if (this.countLikers >= this.whoLikeFull.length) {
      this.hideloadmorelike = true;
    } else if (this.countLikers > this.whoLikeFull.length) {
      this.hideloadmorelike = false;
    }
  }
  goToProfile(path: string) {
    if(window.location.href.indexOf('portfolio') != -1){
      window.location.href = '/portfolio/'+path;
    }else{
      this.router.navigate(['/portfolio/', path]);
    }
  }
}
