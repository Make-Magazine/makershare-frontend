import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services';
import { LoaderService } from '../../shared/loader/loader.service';
import { Auth } from '../../../auth0/auth.service';
import { Meta, Title } from '@angular/platform-browser';
import * as globals from '../../../d7services/globals';

@Component({
  selector: 'app-why-portfolio',
  templateUrl: './why-portfolio.component.html',
})
export class WhyPortfolioComponent implements OnInit {

  title = '';
  body = ''
  constructor(
    private viewService: ViewService,
    private loaderService: LoaderService,
    public auth: Auth,
    private meta_title: Title,
    private meta: Meta
  ) { }

  ngOnInit() {
    this.loaderService.display(true);
    this.viewService.getView('pages', [['nid', 1546]]).subscribe(data => {
      this.title = data[0].title;
      this.body = data[0].body;

      this.meta_title.setTitle( this.title + ' | Maker Share');
      this.meta.addTags([
        {
          name: 'description', content: this.body
        },
        {
          name: 'image', content: globals.appURL + '/assets/images/logos/maker-share-logo-clr@2x-100.jpg.jpg'
        }
      ])

      // this.meta.setTitle(`Maker Share | ${this.title}`);
      // this.meta.setTag('og:image', '/assets/logo.png');
      // this.meta.setTag('og:description', this.body);
      this.loaderService.display(false);
    }, err => {
      this.loaderService.display(false);
    });
  }

}
