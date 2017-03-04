import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ViewService } from './../../../d7services/view/view.service';

@Component({
  selector: 'app-showcases',
  templateUrl: './showcasesCollection.component.html',
})
export class ShowcasesCollectionComponent implements OnInit {
  showcases = [];
  constructor(
    private viewService: ViewService,
    private router: Router,
  ) { }

  ngOnInit() {
    // load the showcases
    this.viewService.getView('showcases').subscribe(data => {
      this.showcases = data;
    }, err => {

    });
  }

  ShowSingleShowcase(nid){
     this.router.navigate(['/single-showcase', nid]);
  }

}
