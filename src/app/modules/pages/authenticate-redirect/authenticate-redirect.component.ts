import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Singleton } from '../../../core/';
import { ViewService } from '../../../core/d7services';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-authenticate-redirect',
  templateUrl: './authenticate-redirect.component.html',

})
export class AuthenticateRedirectComponent implements OnInit {
  communityManagers = [];
  makeIntel = [];
  partners = [];
  constructor(
    private viewService: ViewService,
    private loaderService: LoaderService,
    title: Title,
    meta: Meta

  ) { 
     title.setTitle('Authenticating Redirect | Maker Share');
    meta.addTags([
      {
        name: 'og:description', content: 'Login Redirect'
      },
      {
        name: 'og:image', content: Singleton.Settings.appURL + 'assets/images/logos/maker-share-logo-clr@2x-100.jpg.jpg'
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
