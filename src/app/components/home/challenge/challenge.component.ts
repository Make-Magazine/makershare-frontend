import { Component, OnInit } from '@angular/core';
import { ViewService } from './../../../d7services/view/view.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
})
export class ChallengeComponent implements OnInit {
  challenge = {};
  constructor(
    private viewService: ViewService,
    private router: Router,
  ) { }

  ngOnInit() {
    // load the challenge from the api
    this.viewService.getView('home_page_challenge').subscribe(data =>{
      this.challenge = data[0];
      console.log(this.challenge);
    }, err => {

    });
  }
  ShowChallengeDetails(nid) {
    this.router.navigate(['/challenges', nid]);
  }
}
