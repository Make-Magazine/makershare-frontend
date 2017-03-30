import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';


@Component({
  selector: 'app-challenge-card',
  templateUrl: './challenge-card.component.html',
})
export class ChallengeCardComponent implements OnInit {
challenge=[];  
 @Input() challengeNid;
   constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,

  ){ }

  ngOnInit() {
   this.getChallenges();
    }

  getChallenges(){
     this.viewService.getView('shared-challenge-card',[['nid',this.challengeNid]]).subscribe(data => {
     this.challenge = data[0];
  }, err => {
      console.log(err);
  });
}
 /* function to navigate to challenge summary page */
  ShowChallengeDetails(nid) {
    this.router.navigate(['/challenges', nid]);
  }

    enterToChallengeProject(nid) {
    this.router.navigate(['challenges/enter-challenge', nid]);
  }

}
