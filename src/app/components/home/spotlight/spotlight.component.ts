import { Component, OnInit } from '@angular/core';
import { ViewService } from './../../../d7services/view/view.service';
import { UserCardComponent } from '../../shared/user-card/user-card.component';

@Component({
  selector: 'app-spotlight',
  templateUrl: './spotlight.component.html',
})
export class SpotlightComponent implements OnInit {
  spotlights = [];
  constructor(
    private viewService: ViewService,
  ) { }

  ngOnInit() {
    this.viewService.getView('home_page_maker_spotlight').subscribe(data => {
      this.spotlights = data;
      console.log(data)
    }, err => {

    });
  }

}
