import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../../../../d7services/comment/comment.service';
import { Observable } from "rxjs";
import { UserService } from '../../../../d7services/user/user.service';
import { ViewService } from '../../../../d7services/view/view.service'


@Component({
  selector: 'app-project-story',
  templateUrl: './project-story.component.html',
  providers:[CommentService]
})
export class ProjectStoryComponent implements OnInit {

@Input() project;
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
    this.CollabNid = this.project.nid
    this.nodeComment.getNodeCommentsById(this.CollabNid).subscribe(data => {
      this.comments = data;
      //console.log(this.project.field_collaborators)
      for( let element of this.comments){
        this.viewService.getView('maker_profile_card_data',[['uid',element['uid']],]).subscribe(data => {
          Object.assign(element, data[0]);
        });
      }
      //  console.log(this.comments);
    });
    // var i = 0;
    // var source = Observable.create(observer => {
    //   for( let maker of this.project.field_collaborators){
    //     observer.next(
    //     this.viewService.getView('maker_profile_card_data',[['uid',maker['target_id']],]).subscribe(data => {
    //       this.collabs[i] = {};
    //       this.collabs[i] = data[0];
    //       console.log(this.collabs[i])
    //       i++;
    //     }))
    //   }
    //     observer.onCompleted();
    //
    // });
    // var subscription = source.subscribe(
    // x => console.log('onNext: %s', x),
    // e => console.log('onError: %s', e),
    // () => console.log('onCompleted'));

 }//End ngOnInit



}// End export
