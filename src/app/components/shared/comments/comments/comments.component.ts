import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentService } from '../../../../d7services/comment/comment.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ViewService } from '../../../../d7services/view/view.service'
import { IComment } from '../../../../models/challenge/comment';
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
    if(this.pages>0){
var page_arg=['page',this.pages]
    }
    console.log(this.page_arg)
    this.viewService.getView('node-comments', [['nid', this.nodeId],['page',this.pages]]).subscribe(data => {

      this.comments.value = this.comments.value.concat(data);
      console.log(this.comments.value.length == 1)
       if (this.comments.value.length ==1) {
              this.hideloadmorecomment = false;
      }else{
        this.loadMoreVisibilty();

      }
      this.commentCount = this.comments.value[0].comment_count
     
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
    // get the challenges array count
    if (this.commentCount == this.comments.value.length) {
      console.log(this.commentCount);
      console.log(this.comments.value.length)
      this.hideloadmorecomment = false;

    } else if (this.commentCount > this.comments.value.length) {
      this.hideloadmorecomment = true;
    }
  }
  /* END FUNCTION loadMoreVisibilty */


}
