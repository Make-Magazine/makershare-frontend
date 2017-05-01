import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { IChallengeStartDate, IChallengeData, IChallengeEndDate, IChallengeAnnouncementData } from '../../../models/challenge/challengeData';
import { IChallenge } from '../../../models/challenge/challenge';

import { UserService } from '../../../d7services/user/user.service';


@Component({
  selector: 'app-challenge-card',
  templateUrl: './challenge-card.component.html',
})
export class ChallengeCardComponent implements OnInit {
  announce_date;
  countProjects=0;
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
  challengeData = [];
  @Input() challengeNid;
  @Input() front:boolean = false;
  @Input() first:boolean = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,


  ) { }

  ngOnInit() {
    this.getChallenges();
    this.getCountProject();
  }

  getChallenges() {
    this.viewService.getView('shared-challenge-card', [['nid', this.challengeNid]]).subscribe(data => {
      this.challenge = data[0];
      //calculate days difference
      if (this.challenge) {
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var todayDate = new Date();
        var endDate = new Date(this.challenge.challenge_end_date.value);
        var diffDays = Math.round(((endDate.getTime() - todayDate.getTime()) / (oneDay)));

        var announceDate = new Date(this.challenge.winners_announcement_date.value);
        var announce = Math.round(((announceDate.getTime() - todayDate.getTime()) / (oneDay)));
        this.announce_date = announce;

        if (diffDays >= 0) {
          this.challenge.opened = true;
          this.challenge.diffDays = diffDays
        } else {
          this.challenge.opened = false;
        }
      }
      this.challenge.challenge_end_date.value = this.changeDateFormat(this.challenge.challenge_end_date.value);
      this.challenge.challenge_start_date.value = this.changeDateFormat(this.challenge.challenge_start_date.value);
      this.challenge.winners_announcement_date.value = this.changeDateFormat(this.challenge.winners_announcement_date.value);
    }, err => {
      console.log(err);
    });
  }
   /* function to get count projects in challenge */
  getCountProject() {
    // var nid;
      this.viewService.getView('maker_count_project_challenge_api/' +this.challengeNid)
      .subscribe(data => {
        if (data == null) {
          this.countProjects = 0
        } else {
          this.countProjects = data;
        }
      }, err => {
     //   this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error });
      });
  }
  /*end function count project in challenge*/
  /* function to change data format */
  changeDateFormat(date) {
    var d;
    d = new Date(date);
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    var month = monthNames[d.getMonth()];
    var fullYear = d.getFullYear();
    var day = d.getDate();
    var datestring = month + " " + day + "," + " " + fullYear;
    return datestring;
  }
  /* end function to change data format */
  /* function to navigate to challenge summary page */
  ShowChallengeDetails(nid) {
    this.router.navigate(['/missions', nid]);
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
