import { Component, OnInit, Input } from '@angular/core';
// import { MakerCardComponent } from '../maker-card/maker-card.component';

@Component({
  selector: 'social-stats',
  templateUrl: './social-stats.component.html'
})
export class SocialStats implements OnInit {
  @Input() profileViews;
  @Input() projectsCount;
  @Input() profileView;
  @Input() uid;
  constructor(

  ) {}
  ngOnInit() {
    // nothing to see here
  }
}