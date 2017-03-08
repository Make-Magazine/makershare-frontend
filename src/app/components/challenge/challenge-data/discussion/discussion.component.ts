import { Component, OnInit,Input } from '@angular/core';
import { CommentService } from '../../../../d7services/comment/comment.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from "rxjs";
import { UserService } from '../../../../d7services/user/user.service';
import { ViewService } from '../../../../d7services/view/view.service'
import { IComment } from '../../../../models/challenge/comment';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  providers:[CommentService]
})
export class DiscussionComponent implements OnInit {

  @Input() challenge; 
   constructor(
    private fb: FormBuilder,
    private commentService:CommentService,
    private viewService:ViewService,
    private userService:UserService,
  ){}

newcomment;
  CollabNid;
  CommenterNid;
  comments;
  collabs = [];
  obvfn;
  commentForm: FormGroup;
  commentData:IComment = {
    subject: '',
    comment_body: {und:[{value:''}]},
    nid: 0,
  };


  ngOnInit() {
     
    this.CollabNid = this.challenge.nid
    this.commentService.getNodeCommentsById(this.CollabNid).subscribe(data => {
      this.comments = data;
      console.log(this.challenge.discussion);
    });

   

   /* var comment = {
      "subject":"liJmJfpqMX",
      "comment_body":{"und":[{"value":"9DyaNZi3lA"}]},
      "nid": "16"
    }*/


  
    this.buildForm();
    this.getcomments();
  }


  buildForm (){
    this.commentForm = this.fb.group({
      "subject": ['', Validators.required],
      "comment_body": ['', Validators.required],
    });

  }

  onSubmit(e) {
    if(this.commentForm.valid){ 
       
      e.preventDefault();
      var body_value = {

      }
      this.getcomments();
      this.commentData.subject = this.commentForm.value.subject; 
      this.commentData.comment_body.und[0].value = this.commentForm.value.comment_body;
      this.commentData.nid = this.CollabNid;
      this.commentService.createComment(this.commentData).subscribe( res =>{
      // this.newcomment = this.commentData;
       // console.log(this.newcomment.comment_body.und[0].value);/* commnet value */
      console.log( this.comments.comment_body);
      }, err => {
       // console.log(err);
      });
    }
    this.commentForm.reset();
  }
    getcomments(){
       this.viewService.getView('node-comments',[['nid',this.CollabNid]]).subscribe(data => {
      this.comments  =  data;
      //console.log(this.comments[1].comment);  
    });
  }



}
