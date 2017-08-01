import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ViewService, UserService } from '../../../CORE/d7services';
import {
  IChallengeStartDate,
  IChallengeData,
} from '../../../CORE/Models/challenge/challengeData';
import { Auth } from '../../../auth0/auth.service';

@Component({
  selector: 'app-challenge-card',
  templateUrl: './challenge-card.component.html',
})
export class ChallengeCardComponent implements OnInit {
  @Input() state;

  announce_date;
  countProjects = 0;
  challenge: IChallengeData = {
    title: '',
    cover_image: '',
    sponsored_by: '',
    public_voting: 0,
    body: '',
    rules: '',
    diffDays: 0,
    opened: false,
    display_entries: 0,
    nid: 0,
    path: '',
    status_id: 0,
    summary_trim: '',
    challenge_start_date: {
      value: '',
      timezone: '',
      timezone_db: '',
      date_type: '',
    },
    challenge_end_date: {
      value: '',
      timezone: '',
      timezone_db: '',
      date_type: '',
    },
    winners_announcement_date: {
      value: '',
      timezone: '',
      timezone_db: '',
      date_type: '',
    },
  };
  challangStartDate: IChallengeStartDate = {
    value: '',
    timezone: '',
    timezone_db: '',
    date_type: '',
  };
  challengeData = [];
  Manager: boolean = false;

  @Input() challengeNid;
  @Input() front: boolean = false;
  @Input() first: boolean = false;
  @Output() Featured = new EventEmitter<number>();
  
  
  constructor(
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    public auth: Auth,
  ) {}

  ngOnInit() {
    this.auth.IsCommuintyManager();
    this.Manager = this.auth.IsCommuintyManager();
    this.getChallenges();
    this.getCountProject();
  }

  getChallenges() {
    this.viewService
      .getView('shared-challenge-card', [['nid', this.challengeNid]])
      .subscribe(
        data => {
          this.challenge = data[0];
          // calculate days difference
          if (this.challenge) {
            const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            const todayDate = new Date();
            const dateArray = this.challenge.challenge_end_date.value.split(
              ' ',
            );
            const YearDayMonth = dateArray[0].split('-');
            const endDate = new Date(
              +YearDayMonth[0],
              +YearDayMonth[1],
              +YearDayMonth[2],
            );
            const diffDays = Math.round(
              (endDate.getTime() - todayDate.getTime()) / oneDay,
            );
            const winnerdate = this.challenge.winners_announcement_date.value.split(
              ' ',
            );
            const winnerdateArray = winnerdate[0].split('-');
            const announceDate = new Date(
              +winnerdateArray[0],
              +winnerdateArray[1],
              +winnerdateArray[2],
            );
            const announce = Math.round(
              (announceDate.getTime() - todayDate.getTime()) / oneDay,
            );
            this.announce_date = announce;

            if (diffDays >= 0) {
              this.challenge.opened = true;
              this.challenge.diffDays = diffDays;
            } else {
              this.challenge.opened = false;
            }
          }
          this.challenge.challenge_end_date.value = this.changeDateFormat(
            this.challenge.challenge_end_date.value,
          );
          this.challenge.challenge_start_date.value = this.changeDateFormat(
            this.challenge.challenge_start_date.value,
          );
          this.challenge.winners_announcement_date.value = this.changeDateFormat(
            this.challenge.winners_announcement_date.value,
          );
        },
        err => {
          //  console.log(err);
        },
      );
  }
  /* function to get count projects in challenge */
  getCountProject() {
    // var nid;
    this.viewService
      .getView('maker_count_project_challenge_api/' + this.challengeNid)
      .subscribe(
        data => {
          if (data == null) {
            this.countProjects = 0;
          } else {
            this.countProjects = data;
          }
        },
        err => {
          //   this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error });
        },
      );
  }
  /*end function count project in challenge*/
  /* function to change data format */
  changeDateFormat(date) {
    if (!date) {
      return '';
    }
    date = date.split(' ')[0];
    date = date.split('-');
    return date[1] + '/' + date[2] + '/' + date[0];
  }
  /* end function to change data format */
  /* function to navigate to challenge summary page */
  ShowChallengeDetails(path) {
    this.router.navigate(['/missions', path]);
  }

  enterToChallengeProject(nid) {
    this.userService.isLogedIn().subscribe(data => {
      // this.checkUserLogin = data;
      if (data === false) {
        // localStorage.setItem('redirectUrl', this.router.url);
        this.router.navigate(['/access-denied']);
      } else {
        this.router.navigate(['missions/enter-mission', nid]);
      }
    });
  }
  emitFeatured(){
  this.Featured.emit()
  }
}
