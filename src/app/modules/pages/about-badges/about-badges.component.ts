import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Singleton } from '../../../core/';
import { ViewService } from '../../../core/d7services';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-about-badges',
  templateUrl: './about-badges.component.html',
})
export class AboutBadgesComponent implements OnInit {
  title = '';
  body = ''

  makerBadge = [];
  projectBadge = [];
  constructor(
    private viewService: ViewService,
    private loaderService: LoaderService,
    private meta_title: Title,
    private meta: Meta
  ) {

  }

  ngOnInit() {
    this.loaderService.display(true);
    this.viewService.getView('pages', [['nid', 1537]]).subscribe(data => {
      this.title = data[0].title;
      this.body = data[0].body;
      this.loaderService.display(false);

      this.meta_title.setTitle(this.title + ' | Maker Share');
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

    }, err => {
      this.loaderService.display(false);
    });
    this.viewService.getView('api_all_badges_data').subscribe(data => {
      // this.makerBadge = data;
      // this.projectBadge = data;
      // console.log(data);

      for (let badge of data) {
        if (badge.category == "Maker Badge") {
          this.makerBadge.push(badge);


        } else {
          this.projectBadge.push(badge)

        }
      }
    });
  }

}
