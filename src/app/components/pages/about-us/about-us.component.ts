import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services';
import { LoaderService } from '../../shared/loader/loader.service';
import { Meta, Title } from '@angular/platform-browser';
import * as globals from '../../../d7services/globals';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',

})
export class AboutUsComponent implements OnInit {
  communityManagers = [];
  makeIntel = [];
  partners = [];
  constructor(
    private viewService: ViewService,
    private loaderService: LoaderService,
    title: Title,
    meta: Meta

  ) { 
     title.setTitle('About Us | Maker Share');
    meta.addTags([
      {
        name: 'og:description', content: 'The Maker Share Team'
      },
      {
        name: 'og:image', content: globals.appURL + '/assets/images/logos/maker-share-logo-clr@2x-100.jpg.jpg'
      }
    ])
  }

  ngOnInit() {
    this.getMakers();
  }

   getMakers() {
    this.loaderService.display(true);

    // get community managers
    this.viewService.getView('about-comunnity-managers').subscribe( users => {
      this.communityManagers = users;
    });

    this.viewService.getView('about-make-intel').subscribe( users => {
      this.makeIntel = users;
      this.loaderService.display(false);
    });

    this.viewService.getView('about-partners').subscribe( users => {
      this.partners = users;
    });

  }

}
