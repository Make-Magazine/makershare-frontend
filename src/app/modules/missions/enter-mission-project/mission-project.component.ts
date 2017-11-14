import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationBarService, NotificationType } from 'ngx-notification-bar/release';
import { Observable } from 'rxjs/Observable';
import { FlagService, MainService, NodeService, ViewService } from '../../../core/d7services';
import { IMissionData, IMissionDate } from '../../../core/models/mission/mission-data';
import { IMissionProject } from '../../../core/models/mission/mission-project';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-enter-missions-project',
  templateUrl: './mission-project.component.html',
})
export class MissionProjectComponent implements OnInit {
  addProjectForm: FormGroup;
  tab: string;
  path: string;
  submittedBefore: boolean=true;
  countProjects = 0;
  button = false;
  projects: IMissionProject[];
  selectedProject: number;
  hiddenAfterSubmit: boolean = false;
  userId: number;
  defaultTabObs: Observable<string>;
  missionRedirection: string;
  createProject: string = 'noProject';
  userName: string;
  nid: number;
  enterStatus = true;
  selectedProjectName;
  challangeData: IMissionData = {
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
  challangStartDate: IMissionDate = {
    value: '',
    timezone: '',
    timezone_db: '',
    date_type: '',
  };
  checked: false;
  error: string;
  closeResult: string;
  previousUrl: string;
  projectsList;

  constructor(
    private route: ActivatedRoute,
    private viewService: ViewService,
    private router: Router,
    private fb: FormBuilder,
    private nodeService: NodeService,
    private flagService: FlagService,
    private mainService: MainService,
    private notificationBarService: NotificationBarService,
    private loaderService: LoaderService,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    this.buildForm();
    this.checkenter();
    this.getCountProject();
    this.geturlformid();
    this.nid = this.route.snapshot.params['nid'];
    this.userId = parseInt(localStorage.getItem('user_id'), 10);
    this.userName = localStorage.getItem('user_name');
    this.getAllProject();
    this.getChallengeData();
    this.getProjectsInMission();
    this.createProject = 'test';
    // set default tab according to url parameter "tab"
    this.defaultTabObs = this.route.queryParams.map(
      params => params['projectId'],
    );
    this.defaultTabObs.subscribe(tab => {
      if (tab != undefined || tab != '') {
        this.createProject = decodeURIComponent(tab);
      }
    });
  }

  getAllProject() {
    this.route.params
      .switchMap(nid =>
        this.viewService.getView('enter-challenge-projects-list', [
          ['uid', this.userId],
          ['uid1', this.userName],
        ]),
      )
      .subscribe(data => {
        this.projects = data;
      });
  }

  /* function to get count projects in challenge */
  getCountProject() {
    this.route.params
      .switchMap(nid =>
        this.viewService.getView(
          'maker_count_project_challenge_api/' + nid['nid'],
        ),
      )
      .subscribe(
        data => {
          if (data == null) {
            this.countProjects = 0;
          } else {
            this.countProjects = data;
          }
        },
        err => {},
      );
  }

  /*end function count project in challenge*/
  getChallengeData() {
    this.route.params
      .switchMap(nid =>
        this.viewService.getView('challenge_data', [['nid', this.nid]]),
      )
      .subscribe(
        data => {
          this.challangeData = data[0];
          // calculate days difference
          if (this.challangeData) {
            const todayDate = new Date();
            const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            const dateArray = this.challangeData.challenge_end_date.value.split(
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
            if (diffDays >= 0) {
              this.challangeData.diffDays = diffDays;
            } else {
              this.challangeData.opened = false;
            }
          }
          this.challangeData.challenge_end_date.value = this.changeDateFormat(
            this.challangeData.challenge_end_date.value,
          );
          this.challangeData.challenge_start_date.value = this.changeDateFormat(
            this.challangeData.challenge_start_date.value,
          );
          this.challangeData.winners_announcement_date.value = this.changeDateFormat(
            this.challangeData.winners_announcement_date.value,
          );
        },
        err => {},
      );
  }

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
  getProjectsInMission() {
    this.viewService
      .getView('user-entered-project', [['uid', this.userId]])
      .subscribe(data => {
        this.projectsList = data;
      });
  }

  updateSelectedProject(item: any) {
    this.selectedProjectName = item.target.selectedOptions[0].text;
    this.selectedProject = item.target.value;
    this.submittedBefore = false;
    for (const element of this.projectsList) {
      if (element.project_nid == item.target.value) {
        this.submittedBefore = true;
      }
    }
  }

  /* end check project entered */
  onCancel() {
    this.addProjectForm.reset();
    this.geturlformid();
    this.router.navigate(['/missions/' + this.path]);
  }

  onSubmit() {
    if (this.checked) {
      this.loaderService.display(true);
      const body = {
        type: 'challenge_entry',
        field_entry_project: this.selectedProject,
        field_entry_challenge: this.nid,
      };

      this.mainService.custompost('maker_challenge_entry_api', body).subscribe(
        res => {
          this.router.navigate(['missions/', this.path]);
          this.loaderService.display(false);

          this.notificationBarService.create({
            message:
              'You have submitted Your Project ' +
              this.selectedProjectName +
              ' in the Challenge ' +
              this.challangeData.title,
            type: NotificationType.Success,
            allowClose: true,
            autoHide: false,
            hideOnHover: false,
          });
          /* bookmark auto after submit project challenge */
          if (this.nid) {
            this.flagService
              .flag(this.nid, this.userId, 'node_bookmark')
              .subscribe(response => {}, err => {});
          }
          /* end bookmark  */
          /* follow auto after submit project challenge */
          if (this.nid) {
            this.flagService
              .flag(this.nid, this.userId, 'follow')
              .subscribe(response => {}, err => {});
          }
          /* end follow  */
        },
        err => {
          this.loaderService.display(false);
          this.tab = 'rules';
          this.notificationBarService.create({
            message:
              "Sorry, but your project doesn't meet the challenge requirements, Please check <a id='rules-id' href='#rules' data-nodeId='" +
              this.nid +
              "'>Rules & Instructions </a>",
            type: NotificationType.Error,
            allowClose: true,
            autoHide: false,
            hideOnHover: false,
            isHtml: true,
          });
          this.router.navigate(['/missions/' + this.path]);
          this.tab = 'rules';
        },
      );
    } else {
      this.error =
        'You must agree to challenge rules and eligibility requirements before entering.';
    }
  }

  createNewProjectForChallenge() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        nid: this.nid,
      },
    };
    this.router.navigate(['/projects/create'], navigationExtras);
  }

  /* function build form */
  buildForm() {
    this.addProjectForm = this.fb.group({
      field_agreement: ['', Validators.required],
    });
  }

  /* function check user allowe to enter challenge */
  checkenter() {
    const nid = this.route.snapshot.params['nid'];
    this.viewService
      .checkEnterStatus('maker_challenge_entry_api/enter_status', nid)
      .subscribe(
        data => {
          this.enterStatus = data.status;
          if (this.enterStatus == false) {
            this.router.navigate(['/missions/' + this.nid]);
          }
        },
        err => {},
      );
  }

  /* end function cheack user allowe to enter challenge */
  checkBoxValue(item: any) {
    this.error = '';
    this.checked = item.target.checked;
    if (this.checked) {
      this.button = true;
    } else {
      this.button = false;
    }
  }

  open(content) {
    if (!this.submittedBefore) {
      this.modalService.open(content).result.then(
        result => {
          this.closeResult = 'Closed with: ${result}';
        },
        reason => {
          this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
        },
      );
    } else {
      this.notificationBarService.create({
        message: 'You have submitted this project to a mission before .',
        type: NotificationType.Error,
        allowClose: true,
        autoHide: false,
        hideOnHover: false,
        isHtml: true,
      });
    }
  }

  geturlformid() {
    const nid = this.route.snapshot.params['nid'];

    this.nodeService.getUrlFromId(nid, 'challenge').subscribe(data => {
      this.path = data[0];
    });
  }
}
