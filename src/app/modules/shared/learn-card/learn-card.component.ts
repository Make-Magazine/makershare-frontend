import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ViewService } from 'app/CORE/d7services';
import { Auth } from 'app/modules/auth0/auth.service';

@Component({
  selector: 'app-learn-card',
  templateUrl: './learn-card.component.html',
})
export class LearnCardComponent implements OnInit {
  learn = [];
  countlessons;
  Manager: boolean = false;

  @Input() workshopNid;
  @Input() front;
  constructor(
    private router: Router,
    private viewService: ViewService,
    public auth: Auth,
  ) { }
  ngOnInit() {
    this.auth.IsCommuintyManager();
    this.Manager = this.auth.IsCommuintyManager();
    this.getWorkshop();
  }
  getWorkshop() {
    this.viewService.getView('shared-learn-card', [['nid', this.workshopNid]]).subscribe(data => {
      this.getCountlessons();
      this.learn = data[0];
    });
  }
  WorkshopDetails(path) {
    this.router.navigate(['/learning', path]);
  }

  getCountlessons() {
    this.viewService.getView('maker_count_lessons/' + this.workshopNid)
      .subscribe(data => {
        this.countlessons = data[0];
      });
  }
}

