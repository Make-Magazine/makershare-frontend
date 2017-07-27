import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShowcaseCard } from '../../../models';

@Component({
  selector: 'app-showcase-card',
  templateUrl: './showcase-card.component.html',
})
export class ShowcaseCardComponent implements OnInit, OnChanges {
  @Input() showcaseCard: ShowcaseCard;
  @Input() singleView: boolean = false;

  private userId;
  private numLikes: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
  }

  ngOnChanges() {
    console.log(this.showcaseCard);
  }

  /**
   * showSingleShowcase
   *
   * @param path
   * @constructor
   */
  showSingleShowcase(path) {
    if (!this.singleView) {
      this.router.navigate(['showcases', path]);
    }
  }

  /**
   * likesCounter
   *
   * @param count
   */
  likesCounter(count) {
    this.numLikes = count;
  }
}
