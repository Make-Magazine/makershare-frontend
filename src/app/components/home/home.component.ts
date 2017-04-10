import { Component, OnInit } from '@angular/core';
import { ViewService } from './../../d7services/view/view.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  homeCards;

  constructor(
    private viewService: ViewService,

  ) { }

  ngOnInit() {
    this.viewService.getView('maker_homepage_api').subscribe(data =>{
      this.homeCards = data;
      console.log(this.homeCards)
      for (let r of data)
      if(r.type=="project"){
        //console.log(r)
      }
      //console.log(data)
    })
  }

}
