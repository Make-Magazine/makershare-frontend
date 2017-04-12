import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../../d7services/view/view.service';
import { IChallengeStartDate, IChallengeData, IChallengeEndDate, IChallengeAnnouncementData } from '../../../../models/challenge/challengeData';
import { IChallenge } from '../../../../models/challenge/challenge';
import { UserService } from '../../../../d7services/user/user.service';


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
    diffDays:0,
    opened:false,
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
  loading=true
challengeData=[];  
 @Input() challengeNid;
   constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
            private userService: UserService,


  ){ }

  ngOnInit() {
   this.getChallenges();
   console.log(this.challengeNid)
    }

  getChallenges(){
     this.viewService.getView('shared-challenge-card',[['nid',this.challengeNid]]).subscribe(data => {
     this.challenge = data[0];
           //calculate days difference
        if (this.challenge) {
          var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
          var todayDate = new Date();
          var endDate = new Date(this.challenge.challenge_end_date.value);
          var diffDays = Math.round(((endDate.getTime() - todayDate.getTime()) / (oneDay)));
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
