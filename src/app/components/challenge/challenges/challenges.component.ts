import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';
import { RouterModule, Router } from '@angular/router';
import { FlagService } from '../../../d7services/flag/flag.service';
import { IChallenge } from '../../../models/challenge/challenge';
import { LoaderService } from '../../shared/loader/loader.service';
import { UserService } from '../../../d7services/user/user.service';
import { MetaService } from '@nglibs/meta';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
})
export class ChallengesComponent implements OnInit {
  challenges: IChallenge[] = [];
  pageNumber = 0;
  allstatuses = [];
  statusesCount = {};
  currentStatusName = 'All';
  currentStatusId = 0;
  hideloadmore = true;
  currentCount = 0;
  challenge;
  constructor(
    private viewService: ViewService,
    private router: Router,
    private flagService: FlagService,
    private loaderService: LoaderService,
    private userService: UserService,
    private meta: MetaService

  ) { }

  ngOnInit() {
    this.challengesCount();
    this.getStatuses();
    this.getChallenges();
    this.meta.setTitle(`Maker Share | Missions`);
    this.meta.setTag('og:image', '/assets/logo.png');
    this.meta.setTag('og:description', 'Missions Missions Missions Missions Missions Missions Missions Missions Missions ');

  }
  /* function to get challenges and count followers  */
  getChallenges() {
    // show spinner
    this.loaderService.display(true);

    var status_arg = [];
    var page_arg = [];
    if (this.currentStatusId != 0) {
      status_arg = ['status', this.currentStatusId];
      this.currentCount = this.statusesCount[this.currentStatusId];
    } else {
      this.currentCount = this.statusesCount['0'];
    }
    if (this.pageNumber >= 0) {
      page_arg = ['page', this.pageNumber];
    }
    this.viewService.getView('challenges', [status_arg, page_arg]).subscribe(data => {
      // console.log(data);
      this.challenges = this.challenges.concat(data);

      this.loadMoreVisibilty();
      if (!this.currentCount) {
        this.currentCount = this.statusesCount['0'];
      }
      // count followers
      for (let challenge of this.challenges) {
        this.flagService.flagCount(challenge.nid, 'follow').subscribe(data => {
          Object.assign(challenge, data)
        }, err => {
        });
      }
      // hide spinner
      this.loaderService.display(false);
    }, err => {
      // hide spinner
      this.loaderService.display(false);      
    });
  }
  /* end function to get challenges and count followers  */

  /* function to get more click */
  loadmore() {
    this.pageNumber++;
    this.getChallenges();
  }
  /* end  function get more  */
  /* function to Get challenges status to render them in the component */
  getStatuses() {
    this.viewService.getView('maker_taxonomy_category/14').subscribe(data => {
      let arr = [];
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          arr.push(data[key]);
        }
      }
      arr.unshift({ "tid": 0, "name": "All" });
      this.allstatuses = arr;
    }, err => {

    });

  }
  /* end function get challenge status */

  /* function to get the count of challenges per status*/
  challengesCount() {
    this.viewService.getView('maker_count_api', []).subscribe(data => {
      this.statusesCount = data;
    });
  }
  /* end function to get count of challenges*/

  /* function to click function on status */
  SetCurrentStatus(event) {
    if (this.currentStatusId != event.target.id) {
      this.challenges = [];
    }
    this.currentStatusName = event.target.name;
    this.currentStatusId = event.target.id;
    this.pageNumber = 0;
    this.getChallenges();
  }
  /* end function to click function  */

  /* function to  control load more button*/
  loadMoreVisibilty() {
    // get the challenges array count
    var ch_arr_count = this.challenges.length;
    if (this.statusesCount[this.currentStatusId] > ch_arr_count) {
      this.hideloadmore = true;
    } else {
      this.hideloadmore = false;
    }
  }
  /* end function to  control load more button */

  /* function to navigate to challenge summary page */
  ShowChallengeDetails(nid) {
    this.router.navigate(['/challenges', nid]);
  }

    enterToChallengeProject(nid) {
      
     this.userService.isLogedIn().subscribe(data => {
      //this.checkUserLogin = data;
      if (data == false) {
        //localStorage.setItem('redirectUrl', this.router.url);
        this.router.navigate(['/access-denied']);
      }else{
    this.router.navigate(['challenges/enter-challenge', nid]);
      }
          });
  }
}
