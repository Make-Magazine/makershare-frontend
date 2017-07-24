import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ShowcaseCard } from '../../../models';

@Component({
  selector: 'app-showcase-card',
  templateUrl: './showcase-card.component.html',
})
export class ShowcaseCardComponent implements OnInit {
  userId;
  @Input() showcaseCard: ShowcaseCard;
  constructor(private router: Router) {}
  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
  }
  ShowSingleShowcase(path) {
    this.router.navigate(['showcases', path]);
  }
}
