import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from "rxjs";
import { CommentsComponent } from './comments/comments.component';
import { CommentFormComponent } from './comments/comment-form.component';

interface comment {
  author:string;
  comment:string,
  first_name:string,
  last_name:string,
  nickname:string,
  photo:string,
  update_date:string,
}

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
})
export class CommentComponent implements OnInit {

  @Input() nid;
  
  comments = {
    value:[],
  };
  constructor(

  ) { }


  ngOnInit() {
    
  }


}
