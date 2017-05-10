import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  providers: []
})
export class DiscussionComponent implements OnInit {
 title = {
    title: "Questions",
    placeholder: "Ask a question",
    ifempty: "There is no questions yet ..",
    join: "to Add Your question"
  };
  @Input() challenge;
  constructor() { }
  challengeNid;
  collabs = [];
  obvfn;
  
  ngOnInit() {
    this.challengeNid = this.challenge.nid // challenge id
  }
}
