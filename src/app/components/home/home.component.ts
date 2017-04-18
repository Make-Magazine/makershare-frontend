import { Component, OnInit } from '@angular/core';
import { ViewService } from './../../d7services/view/view.service';
import { MetaService } from '@nglibs/meta';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  homeCards;

  constructor(
    private viewService: ViewService,
    private meta: MetaService

  ) { }

  ngOnInit() {
    this.viewService.getView('maker_homepage_api').subscribe(data =>{
      this.homeCards = data;

      this.meta.setTitle(`Maker Share`);
      this.meta.setTag('og:image', '/assets/logo.png');
      this.meta.setTag('og:description', 'Maker Share Maker Share Maker Share Maker Share Maker Share Maker Share Maker Share ');
      // for (let r of data)
      // if(r.type=="project"){
      //   //console.log(r)
      // }
      //console.log(data)
    })
  }

}
