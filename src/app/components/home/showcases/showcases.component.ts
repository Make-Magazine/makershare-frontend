import { Component, OnInit } from '@angular/core';
import { ViewService } from './../../../d7services/view/view.service';

@Component({
  selector: 'app-showcases',
  templateUrl: './showcases.component.html',
  styleUrls: ['./showcases.component.css']
})
export class ShowcasesComponent implements OnInit {
  showcases = [];
  constructor(
    private viewService: ViewService,
  ) { }

  ngOnInit() {
    // load the showcases
    this.viewService.getView('showcases').subscribe(data => {
      this.showcases = data;
    }, err => {

    });
  }

}
