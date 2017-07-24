import { Component, OnInit } from '@angular/core';
import { Auth } from '../../auth0/auth.service';
import { LoaderService } from '../shared/loader/loader.service';
import { ViewService } from './../../d7services';
import { Meta, Title } from '@angular/platform-browser';
import * as globals from '../../d7services/globals';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  homeCards;

  constructor(private viewService: ViewService,
    private loaderService: LoaderService,
    public auth: Auth,
    title: Title,
    meta: Meta
  ) {
    
    title.setTitle(' Maker Share | Create. Connect. Learn. | By Make: + Intel');
    meta.addTags([
      {
        name: 'og:description', content: 'Where Makers come to show & tell what they can do. Create your Maker Portfolio and share your projects, participate in community missions, and learn new skills.'
      },
      {
        name: 'og:image', content: globals.appURL + '/assets/images/logos/maker-share-logo-clr@2x-100.jpg.jpg'
      }
    ])
  }

  ngOnInit() {
    this.loaderService.display(true);
    this.viewService.getView('maker_homepage_api').subscribe(data => {
      // this.homeCards = data;
      // console.log(this.homeCards[0].id)
      for(var i = 0; i < data.length; i++) {
        data[i].forcedNarrow = false; // set them all to false by default

        if(i > 0) {
          if(data[i-1].type == 'challenge') { //wide
            data[i].forcedNarrow = true;
          }
        }
      }
      this.homeCards = data;
      // this.meta.setTitle(` Maker Share | Create. Connect. Learn. | By Make: + Intel`);
      // this.meta.setTag('og:image', '/assets/logo.png');
      // this.meta.setTag('og:description', 'Where Makers come to show & tell what they can do. Create your Maker Portfolio and share your projects, participate in community missions, and learn new skills.');
      this.loaderService.display(false);
      // for (let r of data)
      // if(r.type=="project"){
      //   //console.log(r)
      // }
      // console.log(data)
    }, err => {
      this.loaderService.display(true);
    });
  }

}
