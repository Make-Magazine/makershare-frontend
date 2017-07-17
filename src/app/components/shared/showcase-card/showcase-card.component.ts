import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService, FlagService } from '../../../d7services';
import { Auth } from '../../../auth0/auth.service';
import { ShowcaseCard } from '../../../models/cards/showcaseCard'
@Component({
  selector: 'app-showcase-card',
  templateUrl: './showcase-card.component.html',
})
export class ShowcaseCardComponent implements OnInit {
  userId;
  @Input() showcaseCard:ShowcaseCard;
  test:ShowcaseCard;
  constructor(private route: ActivatedRoute,
    private router: Router,
    // private viewService: ViewService,
    // private flagService: FlagService,
    // public auth: Auth,
  ) { }
  ngOnInit() {
    console.log(this.test);
    this.userId = localStorage.getItem('user_id');
  }
  ShowSingleShowcase(path) {
    this.router.navigate(['showcases', path]);
  }
}
