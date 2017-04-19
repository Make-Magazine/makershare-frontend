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
  hideloadmorecomment = false;
  page_arg;
  commentCount :number;
  


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
    this.viewService.getView('node-comments', [['nid', this.nodeId]]).subscribe(data => {
      this.comments.value = this.comments.value.concat (data);
      this.commentCount=this.comments.value[0].comment_count
      this.loadMoreVisibilty();
      
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

      this.hideloadmorecomment = true;

    } else if (this.commentCount > this.comments.value.length) {
      this.hideloadmorecomment = false;
    }
  }
  /* END FUNCTION loadMoreVisibilty */


}
