import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Singleton } from '../../../core/';
import { ViewService } from '../../../core/d7services';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-about-badges',
  template: `
      <section class="page-node">
        <div class="container">
          <h3 class="page-title inner-html" *ngIf="title" [innerHTML]="title"></h3>
          <div class="page-body inner-html" *ngIf="body" [innerHTML]="body"></div>
        </div>
      </section>
  `,
})
export class MakerCampComponent implements OnInit {

  title = '';
  body = ''
  constructor(
    private viewService: ViewService,
    private loaderService: LoaderService,
    private meta_title: Title,
    private meta: Meta
  ) {

  }

  ngOnInit() {
    this.loaderService.display(true);
    this.viewService.getView('pages', [['nid', 1542]]).subscribe(data => {
      this.title = data[0].title;
      this.body = data[0].body;

      this.meta_title.setTitle( this.title + ' | Maker Share');
      this.meta.addTags([
        {
          name: 'og:description', content: this.body
        },
        {
          name: 'og:image', content: Singleton.Settings.appURL + 'assets/images/logos/maker-share-logo-clr@2x-100.jpg.jpg'
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
