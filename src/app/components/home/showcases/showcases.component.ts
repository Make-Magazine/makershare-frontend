import { Component, OnInit } from '@angular/core';
import { ViewService } from './../../../d7services/view/view.service';

@Component({
  selector: 'app-showcases',
  templateUrl: './showcases.component.html',
})
export class ShowcasesComponent implements OnInit {
  showcases = [];
  constructor(
    private viewService: ViewService,
  ) { }

  ngOnInit() {
    // load the showcases
    this.viewService.getView('home_page_showcase').subscribe(data => {
      this.showcases = data;
    }, err => {

    });
  }

}
