import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';

@Component({
  selector: 'app-single-showcases',
  templateUrl: './singleShowcase.component.html',
})
export class SinglShowcaseComponent implements OnInit {

  showcase = [];
  projects = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
  ) { }

  ngOnInit() {
    // load the showcase data
             //challenge data
    this.route.params
    .switchMap((nid) => this.viewService.getView('showcase',[['nid',nid['nid']]]))
    .subscribe(data =>{
      this.showcase = data[0];
      console.log(this.showcase);

    });
    //load showcaseproject
    

  }

}
