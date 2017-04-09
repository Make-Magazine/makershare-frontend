import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';
import { RouterModule, Router } from '@angular/router';
import { FlagService } from '../../../d7services/flag/flag.service';
import { IChallenge } from '../../../models/challenge/challenge';
import { ActivatedRoute, Params } from '@angular/router';
import { IChallengeProject } from '../../../models/challenge/challengeProjects';
import { MainService } from '../../../d7services/main/main.service';
import * as globals from '../../../d7services/globals';
import { IChallengeStartDate, IChallengeData, IChallengeEndDate, IChallengeAnnouncementData } from '../../../models/challenge/challengeData';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';


@Component({
  selector: 'enter-challenges-project',
  templateUrl: './challenge-project.component.html',
})
export class ChallengeProjectComponent implements OnInit {
  projects: IChallengeProject[];
  selectedProject: number;
  hiddenAfterSubmit: boolean = false;
  userId: number;
  userName: string;
  nid: number;
  enterStatus = true;
  selectedProjectName;

  challangeData: IChallengeData = {
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
  constructor(private route: ActivatedRoute,
    private viewService: ViewService,
    private router: Router,
    private flagService: FlagService, private mainService: MainService,
    private notificationBarService: NotificationBarService,

  ) { }
  ngOnInit() {
    this.cheackenter();
    this.nid = this.route.snapshot.params['nid'];
    this.userId = parseInt(localStorage.getItem('user_id'));
    this.userName = localStorage.getItem('user_name');
    this.getAllProject();
    this.getChallangeData();

  }

  getAllProject() {

    this.route.params
      .switchMap((nid) => this.viewService.getView('enter-challenge-projects-list', [['uid', this.userId], ['uid1', this.userName]]))
      .subscribe(data => {
        this.projects = data;
        //  console.log(this.projects);

      });
  }

  getChallangeData() {

    this.route.params
      .switchMap((nid) => this.viewService.getView('challenge_data', [['nid', this.nid]]))
      .subscribe(data => {
        this.challangeData = data[0];
        
          //calculate days difference
        if (this.challangeData) {
          var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
          var todayDate = new Date();
          var endDate = new Date(this.challangeData.challenge_end_date.value);
          var diffDays = Math.round(((endDate.getTime() - todayDate.getTime()) / (oneDay)));
          
          if (diffDays >= 0) {
            this.challangeData.diffDays = diffDays
          } else {
            this.challangeData.opened = false;
          }
        }
        this.challangeData.challenge_end_date.value = this.changeDateFormat(this.challangeData.challenge_end_date.value);
        this.challangeData.challenge_start_date.value = this.changeDateFormat(this.challangeData.challenge_start_date.value);
        this.challangeData.winners_announcement_date.value = this.changeDateFormat(this.challangeData.winners_announcement_date.value);
      
        // this.challangStartDate = this.challangeData.challenge_start_date;
      }, err => {
        // console.log(err);
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
  updateSelectedProject(item: any) {
    this.selectedProjectName = item.target.selectedOptions[0].text;
    this.selectedProject = item.target.value;

  }

  onCancel(event: any) {
    this.router.navigate(['/challenges/' + this.nid]);
  }
  onSubmit(event: any) {

    var body = {
      "type": "challenge_entry",
      "field_entry_project": this.selectedProject,
      "field_entry_challenge": this.nid,
    };
    this.mainService.post(globals.endpoint + '/maker_challenge_entry_api', body).subscribe(res => {
      this.router.navigate(['challenges/', this.nid]);
      // console.log(this.challangeData.title)
      this.notificationBarService.create({ message: 'You have submitted Your Project ' + this.selectedProjectName + ' in the Challenge ' + this.challangeData.title, type: NotificationType.Success });
      /* bookmark auto after submit project challenge */
      if (this.nid) {
        this.flagService.flag(this.nid, this.userId, 'node_bookmark').subscribe(response => {
        }, err => {
        });
      }
      /* end bookmark  */
      /* follow auto after submit project challenge */
      if (this.nid) {
        this.flagService.flag(this.nid, this.userId, 'follow').subscribe(response => {
        }, err => {
        });
      }
      /* end follow  */
    }, err => {
      // console.log(err);
    });
  }

  onMyEntries() {

  }

  createNewProjectForChallenge() {
    this.router.navigate(['/project/create']);
  }

  setDayLeft() {

  }

  /* function cheack user allowe to enter challenge */

  cheackenter() {
    var nid = this.route.snapshot.params['nid'];
    this.viewService.cheackEnterStatus('maker_challenge_entry_api/enter_status', nid).subscribe(data => {
      this.enterStatus = data.status;
      if (this.enterStatus == false) {
        this.router.navigate(['/challenges/' + this.nid]);

      }
    }, err => {
      this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error });

    });
  }
  /* end function cheack user allowe to enter challenge */
}