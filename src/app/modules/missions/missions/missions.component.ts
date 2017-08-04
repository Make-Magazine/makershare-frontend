import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Singleton } from 'app/CORE';
import {
  FlagService,
  UserService,
  ViewService,
} from 'app/CORE/d7services';
import { MissionData } from 'app/CORE/models/mission/mission-data';
import { LoaderService } from 'app/modules/shared/loader/loader.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
})
export class MissionsComponent implements OnInit {
  challenges: MissionData[] = [];
  pageNumber = 0;
  allstatuses = [];
  statusesCount = {};
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
          Singleton.Settings.AppURL +
          '/assets/images/logos/maker-share-logo-clr@2x-100.jpg.jpg',
      },
    ]);
  }

  ngOnInit() {
    this.challengesCount();
    this.getStatuses();
    this.getChallenges();
    // this.meta.setTag('og:image', '/assets/logo.png');
  }

  /* function to get challenges and count followers  */
  getChallenges() {
    // show spinner
    this.loaderService.display(true);

    let status_arg = [];
    let page_arg = [];
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
        this.challenges = this.challenges.concat(data);

        this.loadMoreVisibilty();
        if (!this.currentCount) {
          this.currentCount = this.statusesCount['0'];
        }
        // count followers
        for (let c = 0; c < this.challenges.length; c++) {
          const nid: number = this.challenges[c].nid;
          this.flagService.flagCount(nid, 'follow').subscribe(
            d => {
              this.challenges[c].nbFollowers = d.count;
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
        const arr = [];
        for (const key in data) {
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

  SetCurrentStatus(filterValue) {
    if (this.currentStatusId != filterValue) {
      this.challenges = [];
    }
    this.currentStatusId = filterValue;
    this.challenges = [];
    this.pageNumber = 0;
    this.getChallenges();
  }

  loadMoreVisibilty() {
    this.hideloadmore =
      this.statusesCount[this.currentStatusId] == this.challenges.length;
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
