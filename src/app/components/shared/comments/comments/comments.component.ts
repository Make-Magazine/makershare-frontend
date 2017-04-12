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
      this.comments.value = data;
      console.log(data.length);
    });
  }
  /* end function  get comments */


}
