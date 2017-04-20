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
import { LoaderService } from '../../shared/loader/loader.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'enter-challenges-project',
  templateUrl: './challenge-project.component.html',
})
export class ChallengeProjectComponent implements OnInit {
  addProjectForm: FormGroup;
  countProjects = 0;
  button = false;
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
  checked: false;
  error: string;
  closeResult: string;

  constructor(private route: ActivatedRoute,
    private viewService: ViewService,
    private router: Router,
    private fb: FormBuilder,

    private flagService: FlagService, private mainService: MainService,
    private notificationBarService: NotificationBarService,
    private loaderService: LoaderService,
    private modalService: NgbModal,
  ) { }
  ngOnInit() {
    this.buildForm();
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

  /* function to get count projects in challenge */
  getCountProject() {
    // var nid;
    var nid = this.route.snapshot.params['nid'];
    this.route.params
      .switchMap((nid) => this.viewService.getView('maker_count_project_challenge_api/' + nid['nid']))
      .subscribe(data => {
        if (data == null) {
          this.countProjects = 0
        } else {
          this.countProjects = data;
          // console.log(data[0]);
        }
      }, err => {
        //   this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error });
      });
  }
  /*end function count project in challenge*/
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
    this.addProjectForm.reset();

    this.router.navigate(['/missions/' + this.nid]);
  }
  onSubmit() {
    if (this.checked) {
      this.loaderService.display(true);

      let body = {
        "type": "challenge_entry",
        "field_entry_project": this.selectedProject,
        "field_entry_challenge": this.nid,
      };

      this.mainService.post(globals.endpoint + '/maker_challenge_entry_api', body).subscribe(res => {
        this.router.navigate(['missions/', this.nid]);
        this.loaderService.display(false);

        this.notificationBarService.create({ message: 'You have submitted Your Project ' + this.selectedProjectName + ' in the Challenge ' + this.challangeData.title, type: NotificationType.Success,allowClose:true,autoHide:false,hideOnHover:false });
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
        this.loaderService.display(false);
        this.notificationBarService.create({ message: "Sorry, but your project doesn't meet the challenge requirements", type: NotificationType.Error,allowClose:true,autoHide:false,hideOnHover:false});
        this.router.navigate(['/missions/' + this.nid]);

      });
    } else {
      this.error = 'You must agree to challenge rules and eligibility requirements before entering.'
    }
  }

  onMyEntries() {

  }

  createNewProjectForChallenge() {
    this.router.navigate(['/project/create']);
  }

  setDayLeft() {

  }
  /* function build form */
  buildForm() {
    this.addProjectForm = this.fb.group({
      "field_agreement": ['', Validators.required],
    });

  }
  /* end function build form */
  /* function cheack user allowe to enter challenge */

  cheackenter() {
    var nid = this.route.snapshot.params['nid'];
    this.viewService.cheackEnterStatus('maker_challenge_entry_api/enter_status', nid).subscribe(data => {
      this.enterStatus = data.status;
      if (this.enterStatus == false) {
        this.router.navigate(['/missions/' + this.nid]);

      }
    }, err => {
      //  this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error });

    });
  }
  /* end function cheack user allowe to enter challenge */
  checkBoxValue(item: any) {
    this.error = '';
    this.checked = item.target.checked;
    if (this.checked) {
      //this.onSubmit();
      this.button = true;
    } else {
      this.button = false;

    }
  }
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = 'Closed with: ${result}';
    }, (reason) => {
      this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
    });
  }
}