import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent implements OnInit {
  challenges = null;

  constructor(private viewService: ViewService) { }

  ngOnInit() {

    // get the challenges
    this.viewService.getView('challenges', []).subscribe(data => {
      console.log(data);
      this.challenges = data;
    }, err => {

    });


  }

}
