import { Component, OnInit, Input } from '@angular/core';
import { CommentComponent } from '../../../shared/shared.module';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  providers: []
})
export class DiscussionComponent implements OnInit {

  @Input() challenge;
  constructor() { }

  
  challengeNid;
  collabs = [];
  obvfn;


  ngOnInit() {
    this.challengeNid = this.challenge.nid // challenge id
  }
}
