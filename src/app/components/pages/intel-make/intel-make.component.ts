import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-about-badges',
  templateUrl: './intel-make.component.html'
})
export class IntelMakeComponent implements OnInit {
  title = '';
  body = '';
  video = '';
  constructor(
    private viewService: ViewService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {
    this.loaderService.display(true);
    this.viewService.getView('pages', [['nid', 1535]]).subscribe(data => {
      if(data[0]){
        this.title = data[0].title;
        this.body = data[0].body;
        this.video = data[0].field_introductory_video;
      }
      // this.meta.setTitle(`In Support of Open Innovation | Maker Share | By Make: + Intel`);
      // this.meta.setTag('og:image', '/assets/logo.png');
      // this.meta.setTag('og:description', ' Why Make: and Intel started a global community for makers to connect like they do at Maker Faires. Listen as Dale Dougherty explains his vision.');

      this.loaderService.display(false);
    }, err => {
      this.loaderService.display(false);
    });
  }

}
