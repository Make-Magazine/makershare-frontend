import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ShowcaseCard } from '../../../models';
import { Auth } from '../../../auth0/auth.service';


@Component({
  selector: 'app-showcase-card',
  templateUrl: './showcase-card.component.html',
})
export class ShowcaseCardComponent implements OnInit {
  userId;
  Manager;
  @Input() showcaseCard: ShowcaseCard;
  @Output() Featured = new EventEmitter<boolean>();
  constructor(
    private router: Router,
    private auth: Auth

  ) {}
  ngOnInit() {
         this.Manager = this.auth.IsCommuintyManager();
         this.userId = localStorage.getItem('user_id');
  }
  ShowSingleShowcase(path) {
    this.router.navigate(['showcases', path]);
  }
  emitFeatured(){
    this.Featured.emit()
  }
}
