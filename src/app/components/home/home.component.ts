import { Component, OnInit } from '@angular/core';
import { ViewService } from './../../d7services';
import { MetaService } from '@nglibs/meta';
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
    private meta: MetaService,
    private loaderService: LoaderService,
    public auth: Auth,
  ) { } 

  ngOnInit() {
    this.loaderService.display(true);
    this.viewService.getView('maker_homepage_api').subscribe(data =>{
      this.homeCards = data;

      this.meta.setTitle(`Maker Share`);
      this.meta.setTag('og:image', '/assets/logo.png');
      this.meta.setTag('og:description', 'Maker Share Maker Share Maker Share Maker Share Maker Share Maker Share Maker Share ');
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
