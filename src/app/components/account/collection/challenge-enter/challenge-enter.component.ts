import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../../d7services/view/view.service';
@Component({
  selector: 'app-challenge-enter',
  templateUrl: './challenge-enter.component.html',
})
export class ChallengeEnterComponent implements OnInit {
  challenges = [];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
  ) { }
  ngOnInit() {
    this.getChallengeEntered();
  }
  getChallengeEntered() {
    // get Maker Challenge entered  from a view
    this.viewService.getView('maker-challenge-entered').subscribe(res => {
      this.challenges = res;
    }, err => {

    });
  }
}
