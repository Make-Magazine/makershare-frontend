import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../../d7services/view/view.service';
import { FlagService } from '../../../../d7services/flag/flag.service';

@Component({
  selector: 'app-challenge-follow',
  templateUrl: './challenge-follow.component.html',
})
export class ChallengeFollowComponent implements OnInit {
    deletedArr = [];

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
    valueChanged(mid, event) {
    // add to deletedArr
    if (event.target.checked === true) {
      this.deletedArr.push(mid);

      // console.log(this.deletedArr)
    } else {
      // remove from deletedArr
      var index = this.deletedArr.indexOf(mid, 0);
      if (index > -1) {
        this.deletedArr.splice(index, 1);
      }
    }
  }
    /**
* delete selected messages
*/
  deleteMessages() {
    console.log(this.deletedArr);
    for (var i = 0; i < this.deletedArr.length; i++) {
      this.flagService.unflag(this.deletedArr[i], this.userId, 'follow').subscribe(response => {
        this.getChallengeFollow();
      }, err => {
        //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
      });
}
  }

  deleteMessage(i) {

    this.flagService.unflag(this.challenges[i]['nid'], this.userId, 'follow').subscribe(response => {
      this.getChallengeFollow();
    }, err => {
      //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
    });
    // console.log(this.projects[i]['nid']);

  }
    checkAll(ev) {
    this.challenges.forEach(x => x.state = ev.target.checked)
    for (var _i = 0; _i < this.challenges.length; _i++) {
      if (ev.target.checked === true) {
        this.deletedArr.push(this.challenges[_i].nid);
        console.log(this.challenges[_i].nid)
      } else {
        var index = this.deletedArr.indexOf(this.challenges[_i].nid, 0);
        if (index > -1) {
          this.deletedArr.splice(index, 1);
        }
      }
    }
  }
  isAllChecked() {

    return this.challenges.every(_ => _.state);
  }
}
