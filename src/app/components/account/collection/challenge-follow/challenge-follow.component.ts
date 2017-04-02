import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../../d7services/view/view.service';
import { FlagService } from '../../../../d7services/flag/flag.service';

@Component({
  selector: 'app-challenge-follow',
  templateUrl: './challenge-follow.component.html',
})
export class ChallengeFollowComponent implements OnInit {

  challenges = [];
  userId;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private flagService: FlagService,


  ) { }
  ngOnInit() {
    this.getChallengeFollow();
    this.userId = localStorage.getItem('user_id');

  }
  getChallengeFollow() {

    // get Challenge following from a view
    this.viewService.getView('follow').subscribe(res => {
      this.challenges = res;

    }, err => {

    });
  }
  deleteMessage(i) {

    this.flagService.unflag(this.challenges[i]['nid'], this.userId, 'follow').subscribe(response => {
      this.getChallengeFollow();
    }, err => {
      //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
    });
    // console.log(this.projects[i]['nid']);

  }
}
