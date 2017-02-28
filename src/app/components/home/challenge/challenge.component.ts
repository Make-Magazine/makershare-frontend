import { Component, OnInit } from '@angular/core';
import { ViewService } from './../../../d7services/view/view.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  challenge = {};
  constructor(
    private viewService: ViewService,
  ) { }

  ngOnInit() {
    // load the challenge from the api
    this.viewService.getView('home_page_challenge').subscribe(data =>{
      this.challenge = data[0];
    }, err => {

    });
  }

}
