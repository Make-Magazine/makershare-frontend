import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../../../../d7services/comment/comment.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from "rxjs";
import { UserService } from '../../../../d7services/user/user.service';
import { ViewService } from '../../../../d7services/view/view.service'
import { IComment } from '../../../../models/challenge/comment';


@Component({
  selector: 'app-project-story',
  templateUrl: './project-story.component.html',
  providers: [CommentService]
})
export class ProjectStoryComponent implements OnInit {

  @Input() project;
  constructor(
    private commentService: CommentService,
    private fb: FormBuilder,
    private viewService: ViewService,
    private userService: UserService

  ) { }
  currentUser;
  CommenterNid;
  comments;
  collabs = [];
  commentForm: FormGroup;
  commentData: IComment = {
    subject: '',
    comment_body: { und: [{ value: '' }] },
    nid: 0,
  };
  ngOnInit() {
    debugger
    console.log(this.project);
    this.viewService.getView('maker_profile_card_data', [['uid', localStorage.getItem('user_id')],]).subscribe(data => {
      this.currentUser = data[0];
      // console.log(this.currentUser)
    })
    this.getComments();
    this.buildForm();
    var i = 0;
    // var source = Observable.create(observer => {
      for (let maker of this.project.field_collaborators) {
        // observer.next(
          this.viewService.getView('maker_profile_card_data', [['uid', maker['target_id']],]).subscribe(data => {
            this.collabs[i] = {};
            this.collabs[i] = data[0];
            // console.log(this.collabs[i])
            i++;
          })
          // )
      }
      // observer.onCompleted();

    // }
    // );

    // var subscription = source.subscribe(
    // x => console.log('onNext: %s', x),
    // e => console.log('onError: %s', e),
    // () => console.log('onCompleted'));

  }//End ngOnInit

  getComments() {
    this.viewService.getView('node-comments', [['nid', this.project.nid],]).subscribe(data => {
      this.comments = data;
      //console.log(this.comments)

    });
  }

  /* function build form */
  buildForm() {
    this.commentForm = this.fb.group({
      "subject": ['Commenter', Validators.required],
      "comment_body": ['', Validators.required],
    });

  }
  onSubmit(e) {
    if (this.commentForm.valid) {
      e.preventDefault();
      this.commentData.subject = this.commentForm.value.subject;
      this.commentData.comment_body.und[0].value = this.commentForm.value.comment_body;
      this.commentData.nid = this.project.nid;
      this.commentService.createComment(this.commentData).subscribe(res => {
        // this.comments.push(this.commentData)
        let tempComm = {
          subject: this.commentData.subject,
          comment: this.commentData.comment_body.und[0].value ,
          update_date : new Date(),
          first_name : this.currentUser.first_name,
          last_name : this.currentUser.last_name,
          nickname : this.currentUser.nickname,
          photo : this.currentUser.photo,
        }
        // console.log(tempComm)
        // console.log(this.commentData)
        // this.getComments();
        this.comments.push(tempComm)
        // console.log(tempComm)
      }, err => {
      });
    }
    this.commentForm.reset();
  }
  /* end function build form */



}// End export
