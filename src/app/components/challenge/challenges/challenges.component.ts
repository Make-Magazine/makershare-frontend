import { Component, OnInit } from '@angular/core';
import { ViewService, FlagService, UserService } from '../../../d7services';
import { Router } from '@angular/router';
import { IChallenge } from '../../../models/challenge/challenge';
import { LoaderService } from '../../shared/loader/loader.service';
import { Meta, Title } from '@angular/platform-browser';
import * as globals from '../../../d7services/globals';

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
    meta: Meta,
    title: Title,
  ) {
    title.setTitle('Community Missions | Making that Matters | Maker Share');
    meta.addTags([
      {
        name: 'og:description',
        content:
          'Use your maker skills to positively impact people’s lives. Find a mission that inspires you to create. Maker Share is a project by Make: + Intel.',
      },
      {
        name: 'og:image',
        content:
          globals.appURL +
            '/assets/images/logos/maker-share-logo-clr@2x-100.jpg.jpg',
      },
    ]);
  }

  ngOnInit() {
    this.challengesCount();
    this.getStatuses();
    this.getChallenges();
    // this.meta.setTitle(`Community Missions | Making that Matters | Maker Share`);
    // this.meta.setTag('og:image', '/assets/logo.png');
    // this.meta.setTag('og:description', 'Use your maker skills to positively impact people’s lives. Find a mission that inspires you to create. Maker Share is a project by Make: + Intel.');
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
    this.viewService.getView('challenges', [status_arg, page_arg]).subscribe(
      data => {
        // console.log(data);
        this.challenges = this.challenges.concat(data);

        this.loadMoreVisibilty();
        if (!this.currentCount) {
          this.currentCount = this.statusesCount['0'];
        }
        // count followers
        for (let challenge of this.challenges) {
          this.flagService.flagCount(challenge.nid, 'follow').subscribe(
            data => {
              Object.assign(challenge, data);
            },
            err => {},
          );
        }
        // hide spinner
        this.loaderService.display(false);
      },
      err => {
        // hide spinner
        this.loaderService.display(false);
      },
    );
  }

  loadmore() {
    this.pageNumber++;
    this.getChallenges();
  }

  getStatuses() {
    this.viewService.getView('maker_taxonomy_category/14').subscribe(
      data => {
        let arr = [];
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            arr.push(data[key]);
          }
        }
        arr.unshift({ tid: 0, name: 'All' });
        this.allstatuses = arr;
      },
      err => {},
    );
  }

  challengesCount() {
    this.viewService.getView('maker_count_api', []).subscribe(data => {
      this.statusesCount = data;
    });
  }

  SetCurrentStatus(event) {
    if (this.currentStatusId != event.target.id) {
      this.challenges = [];
    }
    this.currentStatusName = event.target.name;
    this.currentStatusId = event.target.id;
    this.challenges = [];
    this.pageNumber = 0;
    this.getChallenges();
  }

  loadMoreVisibilty() {
    var ch_arr_count = this.challenges.length;
    if (this.statusesCount[this.currentStatusId] == ch_arr_count) {
      this.hideloadmore = true;
    } else {
      this.hideloadmore = false;
    }
  }

  ShowChallengeDetails(nid) {
    this.router.navigate(['challenges', nid]);
  }

  enterToChallengeProject(nid) {
    this.userService.isLogedIn().subscribe(data => {
      if (data == false) {
        this.router.navigate(['access-denied']);
      } else {
        this.router.navigate(['challenges/enter-challenge', nid]);
      }
    });
  }
}
