import { Component, OnInit } from '@angular/core';
import { ViewService } from './../../d7services';
import { LoaderService } from '../shared/loader/loader.service';
import { Auth } from '../../auth0/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  homeCards;

  constructor(
    private viewService: ViewService,
    private loaderService: LoaderService,
    public auth: Auth,
  ) { } 

  ngOnInit() {
    this.loaderService.display(true);
    this.viewService.getView('maker_homepage_api').subscribe(data =>{
      this.homeCards = data;

      // this.meta.setTitle(` Maker Share | Create. Connect. Learn. | By Make: + Intel`);
      // this.meta.setTag('og:image', '/assets/logo.png');
      // this.meta.setTag('og:description', 'Where Makers come to show & tell what they can do. Create your Maker Portfolio and share your projects, participate in community missions, and learn new skills.');
      this.loaderService.display(false);
      // for (let r of data)
      // if(r.type=="project"){
      //   //console.log(r)
      // }
      //console.log(data)
    }, err => {
      this.loaderService.display(true);
    })
  }

}
