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
  styleUrls:['comment.css'],
  templateUrl: './comment.component.html',
})
export class CommentComponent implements OnInit {

  @Input() nid;
  // @Input() titleform: Object;
  @Input() titleform= {
      title : "Feedback",
     placeholder: "What would you like to say?",
     ifempty: "be the first to post a comment ..",
     join:" to Add Your Comment",
  };
  
  
  comments = {
    value:[],
  };
  constructor(

  ) { }


  ngOnInit() {
    
  }


}
