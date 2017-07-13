import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ViewService,UserService } from '../../../../d7services';
import { IChallengeStartDate, IChallengeData } from '../../../../models/challenge/challengeData';


@Component({
  selector: 'app-challenge-search-card',
  templateUrl: './challenge-search-card.component.html',
})
export class ChallengeSearchCardComponent implements OnInit {
  challenge: IChallengeData = {
    title: "",
    cover_image: "",
    sponsored_by: "",
    public_voting: 0,
    body: "",
    rules: "",
    diffDays: 0,
    opened: false,
    display_entries: 0,
    nid: 0,
    path:"",
    status_id:0,
    summary_trim:"",
    challenge_start_date: {
      value: "",
      timezone: "",
      timezone_db: "",
      date_type: "",
    },
    challenge_end_date: {
      value: "",
      timezone: "",
      timezone_db: "",
      date_type: "",
    },
    winners_announcement_date: {
      value: "",
      timezone: "",
      timezone_db: "",
      date_type: "",
    },
  };
  challangStartDate: IChallengeStartDate = {
    value: "",
    timezone: "",
    timezone_db: "",
    date_type: "",
  };
  loading = true
  challengeData = [];
  @Input() challengeNid;
  constructor(
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,


  ) { }

  ngOnInit() {
    this.getChallenges();
  }

  getChallenges() {
    this.viewService.getView('shared-challenge-card', [['nid', this.challengeNid]]).subscribe(data => {
      this.challenge = data[0];
      //calculate days difference
      if (this.challenge) {
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var todayDate = new Date();
        let dateArray = this.challenge.challenge_end_date.value.split(" ");
        let YearDayMonth = dateArray[0].split("-");
        var endDate = new Date(+YearDayMonth[0],+YearDayMonth[1],+YearDayMonth[2]);
        var diffDays = Math.round(((endDate.getTime() - todayDate.getTime()) / (oneDay)));
        if (diffDays >= 0) {
          this.challenge.opened = true;
          this.challenge.diffDays = diffDays
        } else {
          this.challenge.opened = false;
        }
        this.challenge.challenge_end_date.value = this.changeDateFormat(this.challenge.challenge_end_date.value);
        this.challenge.challenge_start_date.value = this.changeDateFormat(this.challenge.challenge_start_date.value);
        this.challenge.winners_announcement_date.value = this.changeDateFormat(this.challenge.winners_announcement_date.value);
      }
    }, err => {
    });
  }
  /* function to change data format */
  changeDateFormat(date) {
    if(!date)
      return '';
    date = date.split(" ")[0];
    date = date.split("-");
    return date[1]+'/'+date[2]+'/'+date[0];
  }
  /* end function to change data format */
  /* function to navigate to challenge summary page */
  ShowChallengeDetails(path) {
    this.router.navigate(['/missions', path]);
  }

  enterToChallengeProject(nid) {

    this.userService.isLogedIn().subscribe(data => {
      //this.checkUserLogin = data;
      if (data == false) {
        //localStorage.setItem('redirectUrl', this.router.url);
        this.router.navigate(['/access-denied']);
      } else {
        this.router.navigate(['missions/enter-mission', nid]);
      }
    });
  }

}
