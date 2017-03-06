import { Component, OnInit,Input } from '@angular/core';
import { CommentService } from '../../../../d7services/comment/comment.service';
import { Observable } from "rxjs";
import { UserService } from '../../../../d7services/user/user.service';
import { ViewService } from '../../../../d7services/view/view.service'

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  providers:[CommentService]
})
export class DiscussionComponent implements OnInit {
  @Input() challenge; 
   constructor(
    private nodeComment:CommentService,
    private viewService:ViewService,
    private userService:UserService
  ){}
  CollabNid;
 CommenterNid;
 comments;
 collabs = [];
 obvfn;
 
  ngOnInit() {
     this.CollabNid = this.challenge.nid
    // console.log(this.CollabNid);
         this.nodeComment.getNodeCommentsById(this.CollabNid).subscribe(data => {
         this.comments = data;
  
        console.log(this.comments);
    });

  }


}
