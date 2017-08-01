import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-badges',
  templateUrl: './card-badges.component.html'
})
export class CardBadges implements OnInit {
  @Input() badges;
  constructor(

  ) {}
  ngOnInit() {
    // nothing to see here
  }
}