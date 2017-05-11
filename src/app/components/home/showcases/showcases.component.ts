import { Component, OnInit } from '@angular/core';
import { ViewService } from './../../../d7services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showcases',
  templateUrl: './showcases.component.html',
})
export class ShowcasesComponent implements OnInit {
  showcases = [];
  constructor(
    private viewService: ViewService,
    private router: Router,
  ) { }

  ngOnInit() {
    // load the showcases
    this.viewService.getView('home_page_showcase').subscribe(data => {
      this.showcases = data;
    }, err => {

    });
  }
  ShowSingleShowcase(nid){
     this.router.navigate(['/showcases', nid]);
  }

}
