import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  providers: [],
})
export class DiscussionComponent implements OnInit {
  @Input() challenge;

  challengeNid;
  collabs = [];
  obvfn;
  title = {
    title: 'Questions',
    placeholder: 'Ask a question',
    ifempty: 'Be the first to ask a question.',
    join: 'to Add Your question',
  };

  constructor() {}

  ngOnInit() {
    this.challengeNid = this.challenge.nid;
  }
}
