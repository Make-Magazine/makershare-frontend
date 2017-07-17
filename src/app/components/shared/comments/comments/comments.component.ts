import { Component, OnInit, Input } from '@angular/core';
import { ViewService } from '../../../../d7services';
import { FormGroup } from '@angular/forms';
import { IComment } from '../../../../models/challenge/comment';
import { Router} from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  providers: []
})
export class CommentsComponent implements OnInit {
  title: string = 'Comment';
  @Input("nodeId") nodeId;
  @Input("comments") comments;
  @Input() titlecomment;
  pages: number = 0;
  //countProject :any;
  hideloadmorecomment = true;
  page_arg;
  commentCount: number;



  // @Output() comments = new EventEmitter<any>();
  constructor(
    private viewService: ViewService,
        private router: Router,

  ) { }
  newcomment;
  challengeNid;
  CommenterNid;

  collabs = [];
  obvfn;
  commentForm: FormGroup;
  commentData: IComment = {
    subject: '',
    comment_body: { und: [{ value: '' }] },
    nid: 0,
  };

  ngOnInit() {

    this.getcommentsByID(this.nodeId);
  }


  /* function get comments */
  getcommentsByID(id) {
    //console.log(this.page_arg)
    this.viewService.getView('node-comments', [['nid', this.nodeId], ['page', this.pages]]).subscribe(data => {
      this.comments.value = this.comments.value.concat(data);
      // this.loadMoreVisibilty();
     // console.log(this.comments.value.length == 1)
      if (this.comments.value.length == 1) {
        this.hideloadmorecomment = true;
      } else {
        this.loadMoreVisibilty();

      }
     // console.log(this.commentCount)

    });
  }
  /* end function  get comments */
  /* function load more  */
  loadMoreComments() {
    this.pages++;
    this.getcommentsByID(this.nodeId);
  }
  /* end function load more  */
  // Function to control load more button
  loadMoreVisibilty() {
    this.commentCount = this.comments.value[0].comment_count

    //console.log(this.commentCount);
   // console.log(this.comments.value.length)
    // get the challenges array count
    if (this.commentCount == this.comments.value.length) {
      // this.comments.value=[];
      this.hideloadmorecomment = true;

    }
    // else if (this.commentCount > this.comments.value.length) {
    //   this.hideloadmorecomment = true;
    // }
    else {
      this.hideloadmorecomment = false;
    }
  }
  /* END FUNCTION loadMoreVisibilty */
  /* function go To profile */
  goToPortfolio(fName,lName) {
    var fName,lName;
    var FullName=(fName+"-"+lName).toLowerCase();
     this.router.navigate(['/portfolio/' +FullName]);

  }

}
