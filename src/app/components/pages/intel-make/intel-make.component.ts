import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services';
import { LoaderService } from '../../shared/loader/loader.service';
import { Meta, Title } from '@angular/platform-browser';
import * as globals from '../../../d7services/globals';

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
    private meta_title: Title,
    private meta: Meta
  ) {
    this.meta_title.setTitle( this.title + ' | Maker Share');
      this.meta.addTags([
        {
          name: 'og:description', content: this.body
        },
        {
          name: 'og:image', content: globals.appURL + '/assets/images/logos/maker-share-logo-clr@2x-100.jpg.jpg'
        }
      ])
  }

  ngOnInit() {
    this.loaderService.display(true);
    this.viewService.getView('pages', [['nid', 1535]]).subscribe(data => {
      this.title = data[0].title;
      this.body = data[0].body;
      this.video = data[0].field_introductory_video;

      // this.meta.setTitle(`In Support of Open Innovation | Maker Share | By Make: + Intel`);
      // this.meta.setTag('og:image', '/assets/logo.png');
      // this.meta.setTag('og:description', ' Why Make: and Intel started a global community for makers to connect like they do at Maker Faires. Listen as Dale Dougherty explains his vision.');

      this.loaderService.display(false);
    }, err => {
      this.loaderService.display(false);
    });
  }

}
