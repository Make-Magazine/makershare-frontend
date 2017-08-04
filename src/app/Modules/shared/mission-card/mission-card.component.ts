import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, ViewService } from '../../../CORE/d7services';
import { ChallengeData } from '../../../CORE/Models/challenge/challengeData';
import { Auth } from '../../auth0/auth.service';

@Component({
  selector: 'app-mission-card',
  templateUrl: './mission-card.component.html',
})
export class MissionCardComponent implements OnInit {
  @Input() state;
  @Input() singleView: boolean = false;
  @Input() challengeNid;
  @Input() front: boolean = false;
  @Input() first: boolean = false;
  @Input() challenge: ChallengeData = new ChallengeData();
  @Output() Featured = new EventEmitter<number>();

  private announce_date;
  private Manager: boolean = false;

  constructor(
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    public auth: Auth,
  ) {}

  ngOnInit() {
    this.auth.IsCommuintyManager();
    this.Manager = this.auth.IsCommuintyManager();

    // If not single view, get challenge & project count
    if (!this.singleView) {
      this.getChallenge();
      this.getCountProject();
    }
  }

  getChallenge() {
    this.viewService
      .getView('shared-challenge-card', [['nid', this.challengeNid]])
      .subscribe(
        data => {
          let tmpChallenge = data[0];
          // calculate days difference
          if (this.challenge) {
            const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            const todayDate = new Date();
            const dateArray = tmpChallenge.challenge_end_date.value.split(
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
            const winnerdate = tmpChallenge.winners_announcement_date.value.split(
              ' ',
            );
            const winnerdateArray = winnerdate[0].split('-');
            const announceDate = new Date(
              +winnerdateArray[0],
              +winnerdateArray[1],
              +winnerdateArray[2],
            );
            this.announce_date = Math.round(
              (announceDate.getTime() - todayDate.getTime()) / oneDay,
            );

            if (diffDays >= 0) {
              tmpChallenge.opened = true;
              tmpChallenge.diffDays = diffDays;
            } else {
              tmpChallenge.opened = false;
            }
          }
          tmpChallenge.challenge_end_date.value = this.changeDateFormat(
            tmpChallenge.challenge_end_date.value,
          );
          tmpChallenge.challenge_start_date.value = this.changeDateFormat(
            tmpChallenge.challenge_start_date.value,
          );
          tmpChallenge.winners_announcement_date.value = this.changeDateFormat(
            tmpChallenge.winners_announcement_date.value,
          );

          Object.assign(this.challenge, tmpChallenge);
        },
        err => {},
      );
  }

  /* function to get count projects in challenge */
  getCountProject() {
    this.viewService
      .getView('maker_count_project_challenge_api/' + this.challengeNid)
      .subscribe(
        d => {
          this.challenge.nbProjects = d ? 0 : d;
        },
        err => {},
      );
  }

  /* end function count project in challenge*/
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

  followersCounter(count) {
    this.challenge.nbFollowers = count;
  }

  emitFeatured() {
    this.Featured.emit();
  }
}
