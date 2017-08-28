import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'social-stats',
  templateUrl: './social-stats.component.html',
})
export class SocialStatsComponent implements OnInit {
  @Input() profileViews;
  @Input() projectsCount;
  @Input() followerCount;
  @Input() profileView;
  @Input() uid;
  @Input() nid;
  @Input() like;
  constructor() {}
  ngOnInit() {
    // nothing to see here
  }
}
