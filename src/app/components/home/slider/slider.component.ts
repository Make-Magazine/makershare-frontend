import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
})
export class SliderComponent implements OnInit {
  sliders = [];

  constructor(
    private ViewService: ViewService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {

    // loading the slider from the API
    this.ViewService.getView('home_banner').subscribe(data => {
      this.sliders = data;
    }, err => {

    });
  }

  loadMoreData(nid,type){
    if(type=="Learning Sequence"){
  this.router.navigate(['/learn', nid]);

    }else{
       this.router.navigate(['/challenges', nid]);
    }
  }

}
