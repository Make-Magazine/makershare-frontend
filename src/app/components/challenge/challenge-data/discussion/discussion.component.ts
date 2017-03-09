import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../../../../d7services/comment/comment.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from "rxjs";
import { UserService } from '../../../../d7services/user/user.service';
import { ViewService } from '../../../../d7services/view/view.service'
import { IComment } from '../../../../models/challenge/comment';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  providers: [CommentService]
})
export class DiscussionComponent implements OnInit {

  @Input() challenge;
  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private viewService: ViewService,
    private userService: UserService,
  ) { }

  newcomment;
  challengeNid;
  CommenterNid;
  comments;
  collabs = [];
  obvfn;
  currentuser;
  commentForm: FormGroup;
  commentData: IComment = {
    subject: '',
    comment_body: { und: [{ value: '' }] },
    nid: 0,
  };


  ngOnInit() {
    /* service to get user data */
    this.viewService
      .getView('maker_profile_card_data', [['uid', localStorage.getItem('user_id')]])
      .subscribe(data => {
        this.currentuser = data[0];
      });
    /*end of service */

    this.challengeNid = this.challenge.nid // challenge id
    this.buildForm();
    this.getcomments();

  }

  /* function build form */
  buildForm() {
    this.commentForm = this.fb.group({
      "subject": ['', Validators.required],
      "comment_body": ['', Validators.required],
    });

  }
  /* end function build form */

  /* function on submit post comment */
  onSubmit(e) {
    if (this.commentForm.valid) {
      e.preventDefault();

      this.commentData.subject = this.commentForm.value.subject;
      this.commentData.comment_body.und[0].value = this.commentForm.value.comment_body;
      this.commentData.nid = this.challengeNid;
      this.commentService.createComment(this.commentData).subscribe(res => {
        var newComment = {
          photo: this.currentuser.photo,
          nickname: this.currentuser.nickname,
          comment: this.commentData.comment_body.und[0].value,
        }
        this.comments.push(newComment);
        console.log(this.newcomment.nickname);
      }, err => { });
    }
    this.commentForm.reset();
  }

  /* end function on submit post comment */

  /* function get comments */
  getcomments() {
    this.viewService.getView('node-comments', [['nid', this.challengeNid]]).subscribe(data => {
      this.comments = data;
    });
  }
  /* end function  get comments */




}
