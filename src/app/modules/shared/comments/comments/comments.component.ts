import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewService, UserService } from '../../../../core/d7services';
import { IComment } from '../../../../core/models/mission/comment';

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
  CurrentLoggedUserId: number;
  pages: number = 0;
  hideloadmorecomment = true;
  page_arg;
  commentCount: number;
  constructor(
    private viewService: ViewService,
    private router: Router, private userService: UserService,
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
    this.userService.getStatus().subscribe(data => {
      if (data.user.uid > 0) {
        this.CurrentLoggedUserId = data.user.uid;
      }
    });
    this.getcommentsByID(this.nodeId);
  }
  /* function get comments */
  getcommentsByID(id) {
    //console.log(this.page_arg)
    this.viewService.getView('node-comments', [['nid', this.nodeId], ['page', this.pages]]).subscribe(data => {
      this.comments.value = this.comments.value.concat(data);
      console.log(data)
      // this.loadMoreVisibilty();
      if (this.comments.value.length == 1) {
        this.hideloadmorecomment = true;
      } else {
        this.loadMoreVisibilty();
      }

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
    this.commentCount = this.comments.value[0].comment_count
    // get the comment array count
    if (this.commentCount == this.comments.value.length) {
      this.hideloadmorecomment = true;
    }
    else {
      this.hideloadmorecomment = false;
    }
  }
  /* END FUNCTION loadMoreVisibilty */
  /* function go To profile */
  goToPortfolio(fName, lName) {
    var fName, lName;
    var FullName = (fName + "-" + lName).toLowerCase();
    this.router.navigate(['/portfolio/' + FullName]);
  }

}
