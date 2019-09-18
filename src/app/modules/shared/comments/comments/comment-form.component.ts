import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService, UserService, ViewService } from '../../../../core/d7services';
import { IComment } from '../../../../core/models/mission/comment';
import { Auth } from '../../../auth0/auth.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  providers: [CommentService],
})
export class CommentFormComponent implements OnInit {
  @Input('nodeId') nodeId;
  // @Input() titlecomment: Object;
  @Input() titlecomment;
  checkUserLogin = false;
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
    public auth: Auth,
  ) {}

  ngOnInit() {
    this.checkLogin(); //check login to disable comments for anonymous user
    /* service to get user data */
    this.viewService
      .getView('maker_profile_card_data', [
        ['uid', localStorage.getItem('user_id')],
      ])
      .subscribe(data => {
        this.currentuser = data[0];
      });
    /*end of service */

    this.buildForm();
  }

  /* function build form */
  buildForm() {
    this.commentForm = this.fb.group({
      comment_body: ['', Validators.required],
		comment_link: ['', Validators.required],
    });
  }
  /* end function build form */


  /* function on submit post comment */
  onSubmit(e) {
	 console.log("Comment Link: " + this.commentForm.value.comment_link);
	 if(this.commentForm.value.comment_link == '') {
	   console.log("nothing!");
	 }
	 if(this.commentForm.value.comment_link == null) {
	   console.log("null");
	 }
	 if(this.commentForm.value.comment_link == undefined) {
	   console.log("undefined");
	 }
    if (this.commentForm.valid && this.commentForm.value.comment_link == '') {
      e.preventDefault();

      this.commentData.subject = this.currentuser.author;
      this.commentData.comment_body.und[0].value = this.commentForm.value.comment_body;
      this.commentData.nid = this.nodeId;
      this.commentService.createComment(this.commentData).subscribe(
        res => {
          this.getcomments();
        },
        err => {},
      );
    }
    this.commentForm.reset();
  }
  /* end function on submit post comment */

  /* function get comments */
  getcomments() {
    this.viewService
      .getView('node-comments', [['nid', this.nodeId]])
      .subscribe(data => {
        this.comments.value = data;
      });
  }
  /* end function  get comments */
  /* function check login */
  checkLogin() {
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
    });
  }
  /* end function  check login */
}
