import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewService } from '../../../../d7services/view/view.service';
import { FlagService } from '../../../../d7services/flag/flag.service';
//import { LoaderComponentService } from '../../../shared/loader-component/loader-component.service';

@Component({
  selector: 'app-challenge-follow',
  templateUrl: './challenge-follow.component.html',
})
export class ChallengeFollowComponent implements OnInit {
@Input()countFollow;
  deletedArr = [];
  challenges = [];
  userId;
  pages: number = 0;
  hideloadmorefollowchallenge = true;
  page_arg;
  constructor(
    private viewService: ViewService,
    private flagService: FlagService,
  //  private loaderComponentService: LoaderComponentService,

  ) { }
  ngOnInit() {

  //  this.loaderComponentService.display(true);
    this.getChallengeFollow();
    this.userId = localStorage.getItem('user_id');

  }
  getChallengeFollow() {
    if (this.pages >= 0) {
      this.page_arg =
        ['page', this.pages];
    }
    if (this.pages == 0) {
      this.challenges = [];
    }


    // get Challenge following from a view
    this.viewService.getView('follow',[this.page_arg]).subscribe(res => {
      this.challenges = this.challenges.concat(res);
      this.loadMoreVisibilty();
       // this.loaderComponentService.display(false);
    }, err => {
     // this.loaderComponentService.display(false);
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
    /* function load more  */
  loadMoreFollowChallenge() {
    this.pages++;
    this.getChallengeFollow();
  }
  /* end function load more  */
    // Function to control load more button
  loadMoreVisibilty() {
    // get the challenges array count
    if (this.countFollow == this.challenges.length) {

      this.hideloadmorefollowchallenge = true;

    } else if (this.countFollow > this.challenges.length) {
      this.hideloadmorefollowchallenge = false;
    }
  }
  /* END FUNCTION loadMoreVisibilty */
}
