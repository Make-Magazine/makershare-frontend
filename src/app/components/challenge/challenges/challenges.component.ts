import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
})
export class ChallengesComponent implements OnInit {
  challenges = [];
  challengescounter = [];
  challengescounterStatus=[];
  challengesclosed=null;
  challengesopen=null;
  nextChallenges = [];
  loadChallenge = 0;
  challengesstatus=null;
  hideloadmore = false;
  CurrentFilter = null;
  constructor(private viewService: ViewService,
        private router: Router) { }

  ngOnInit() {
    this.moreChallenge();
    this.challengeCounter();
  }

  moreChallenge() {
    this.hideloadmore = true;
    // get the challenges
    this.viewService.getView('challenges', [['page',this.loadChallenge]]).subscribe(data => {
      this.challenges = this.challenges.concat(data);
    });
    this.loadChallenge ++;
    this.viewService.getView('challenges', [['page',this.loadChallenge]]).subscribe(data => {
      if(data.length !== 0){
        this.nextChallenges = data;
        this.hideloadmore = false;
      }
    });
  }

  challengeCounter(){
      // get the challenge Counter
    this.viewService.getView('challenge-counter', []).subscribe(data => {
       data.forEach((element,index)=> {
        if(this.challengescounterStatus[element.challenge_status]){
          this.challengescounterStatus[element.challenge_status]++;
        }else{
         this.challengescounterStatus[element.challenge_status] = 1;
        }
      });
      this.challengescounterStatus['total'] = data.length;
    });
  }

  SetCurrentFilter(Filter){
    if(Filter === "total"){
      this.CurrentFilter = null;
    }else{
      this.CurrentFilter = this.challengescounterStatus[Filter];
    }
  }
     ShowChallengeDetails(nid){
     this.router.navigate(['/challenge-data', nid]);
  }

}
