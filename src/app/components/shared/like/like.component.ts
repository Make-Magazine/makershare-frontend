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
  @Input() showcase = false;
  @Input() project = false;
  @Output() countNumber = new EventEmitter<number>();
  userId;
  hideloadmorelike = false;
  closeResult: string;
  pages: number = 0;
  whoLikeMini = [];
  whoLikeFull = [];
  countlikes:number = 0;
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
      }
    });
  }
  countLikes() {
    this.flagService.flagCount(this.nodeNid, 'like').subscribe(response => {
      this.countlikes = response['count']? response['count']:0;
      this.countNumber.emit(this.countlikes);
    })
  }

  likeThis(e: Event) {
    e.preventDefault();
    this.toggleFlag = this.isLiked? 'unflag':'flag';
    this.flagService[this.toggleFlag](this.nodeNid, this.userId, 'like').subscribe(response => {
      this.countlikes = this.isLiked? this.countlikes--:this.countlikes++;
      this.isLiked = !this.isLiked;
      this.like = this.isLiked? "Unlike this idea": "Like this idea";
      this.whoLikeMini = this.whoLikeFull = [];
      this.pages = 0;
      this.getWhoLike();
    });
  }
  getWhoLike() {
    this.viewService.getView('who-liked', [['nid', this.nodeNid],['page',this.pages]]).subscribe(data => {
      this.whoLikeFull = this.whoLikeFull.concat(data);
      if(this.whoLikeMini.length == 0){
        this.whoLikeMini = data;
        if(this.whoLikeMini.length > 7){
          this.whoLikeMini.length = 7;
        }
      }
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
  loadMoreLike() {
    this.pages++;
    this.getWhoLike();
  }
  loadMoreVisibilty() {
      this.hideloadmorelike = (this.countlikes >= this.whoLikeFull.length)? true:false;
  }
  goToProfile(path: string) {
    if(window.location.href.indexOf('portfolio') != -1){
      window.location.href = '/portfolio/'+path;
    }else{
      this.router.navigate(['/portfolio/', path]);
    }
  }
}
