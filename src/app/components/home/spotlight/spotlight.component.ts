import { Component, OnInit } from '@angular/core';
import { ViewService } from './../../../d7services';

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
    }, err => {

    });
  }

}
