import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ShowcaseCard } from '../../../models';
import { Auth } from '../../../auth0/auth.service';

@Component({
  selector: 'app-showcase-card',
  templateUrl: './showcase-card.component.html',
})
export class ShowcaseCardComponent implements OnInit {
  @Input() showcaseCard: ShowcaseCard;
  @Input() projectsCount: number;
  @Input() singleView: boolean = false;
  @Output() Featured = new EventEmitter<boolean>();

  private userId;
  private numLikes: number = 0;
  private Manager;

  constructor(private router: Router, private auth: Auth) {}

  ngOnInit() {
    this.Manager = this.auth.IsCommuintyManager();
    this.userId = localStorage.getItem('user_id');
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

  emitFeatured() {
    this.Featured.emit();
  }
}
