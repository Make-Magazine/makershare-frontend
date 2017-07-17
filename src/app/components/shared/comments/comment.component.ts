import { Component, OnInit, Input } from '@angular/core';

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
     placeholder: "Share your thoughts",
     ifempty: "",
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
