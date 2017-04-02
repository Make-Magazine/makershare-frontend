import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../../d7services/view/view.service';
@Component({
  selector: 'app-challenge-follow',
  templateUrl: './challenge-follow.component.html',
})
export class ChallengeFollowComponent implements OnInit {

  challenges = [];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,

  ) { }
  ngOnInit() {
    this.getChallengeFollow();
  }
  getChallengeFollow() {

    // get Challenge following from a view
    this.viewService.getView('follow').subscribe(res => {
      this.challenges = res;

    }, err => {

    });
  }

}
