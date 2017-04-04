import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CommentService } from '../../../../d7services/comment/comment.service';
import { ViewService } from '../../../../d7services/view/view.service'
import { UserService } from '../../../../d7services/user/user.service'
import { IComment } from '../../../../models/challenge/comment';
import { Auth } from '../../../../auth0/auth.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  providers: [CommentService]
})


export class CommentFormComponent implements OnInit {
  @Input('nodeId') nodeId;
  checkUserLogin=false;
  @Input('comments') comments;
  title: string = 'Comments';
  commentForm: FormGroup;
  currentuser;
  newcomment;
  CommenterNid;
  commentData: IComment = {
    subject: '',
    comment_body: { und: [{ value: '' }] },
    nid: 0,
  };


  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private viewService: ViewService,
    private userService: UserService,    
        private auth: Auth

  ) { }

  ngOnInit() {
    this.checkLogin();//check login to disable comments for anonymous user
    /* service to get user data */
    this.viewService
      .getView('maker_profile_card_data', [['uid', localStorage.getItem('user_id')]])
      .subscribe(data => {
        this.currentuser = data[0];
      });
    /*end of service */    
      this.buildForm();
  }

  /* function build form */
  buildForm() {
    this.commentForm = this.fb.group({
      "comment_body": ['', Validators.required],
    });

  }
  /* end function build form */

  /* function on submit post comment */
  onSubmit(e) {
    if (this.commentForm.valid) {
      e.preventDefault();

      this.commentData.subject = this.currentuser.author;
      this.commentData.comment_body.und[0].value = this.commentForm.value.comment_body;
      this.commentData.nid = this.nodeId;
      this.commentService.createComment(this.commentData).subscribe(res => {
        var newComment = {
          photo: this.currentuser.photo,
          nickname: this.currentuser.nickname,
          comment: this.commentData.comment_body.und[0].value,
        }
        this.comments.value.unshift(newComment);
      }, err => { });
    }
    this.commentForm.reset();
  }
  /* end function on submit post comment */

  /* function get comments */
  getcomments() {
    this.viewService.getView('node-comments', [['nid', this.nodeId]]).subscribe(data => {
      this.comments.value = data;
    });
  }
  /* end function  get comments */
    /* function check login */
  checkLogin() {
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      console.log(this.checkUserLogin);
    });
  }
  /* end function  check login */
    

}
