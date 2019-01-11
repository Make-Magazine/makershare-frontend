import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationBarService, NotificationType } from 'ngx-notification-bar/release';
import 'rxjs/Rx';
import { NodeService, StatisticsService, UserService, ViewService } from '../../../core/d7services';
import { IMissionData, MissionData } from '../../../core/models/mission/mission-data';
import { ISorting } from '../../../core/models/mission/sorting';
import { Auth } from '../../auth0/auth.service';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-mission-data',
  templateUrl: './mission-data.component.html',
})
export class MissionDataComponent implements OnInit {
  @Input() countFoll;
  @Input() sortType: ISorting;
  @Input() pageNo: number;
  @Output() submitStatus = new EventEmitter<boolean>();

  customDescription: string;
  customImage: string;
  submittedBefore: boolean;
  challenge: MissionData;
  idFromUrl: number;
  dates;
  awards;
  userId;
  projects = [];
  path: string;
  type: string;
  hideloadmore = true;
  hideloadmoreproject = true;
  hideloadmorefollower = false;
  challenge_start_date;
  followers = [];
  currentuser;
  hideButton = false;
  activeTab: string = 'brief';
  sortData: ISorting;
  sort_order: string = 'DESC';
  sort_by: string = 'created';
  enterStatus = true;
  page_arg = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private nodeService: NodeService,
    private userService: UserService,
    private notificationBarService: NotificationBarService,
    private loaderService: LoaderService,
    private statisticsService: StatisticsService,
    public auth: Auth,
  ) {}

  ngOnInit() {
    console.log(this.challenge);
    this.path = this.route.snapshot.params['path'];
    this.userId = localStorage.getItem('user_id');
    if (this.path) {
      this.nodeService.getIdFromUrl(this.path, 'challenge').subscribe(data => {
        this.idFromUrl = data[0];
        if (this.idFromUrl) {
          this.loaderService.display(true);
          this.userEnteredProject();
          this.getChallengeData();
          this.viewService
            .getView('award_block', [['nid', this.idFromUrl]])
            .subscribe(d => {
              this.awards = d;
            });
          this.checkenter();
          this.getCurrentUser();
          this.userService.getStatus().subscribe(d => {
            this.currentuser = d;
          });
        } else {
          this.router.navigate(['**']);
        }
      });
    }
  }

  getChallengeFollowers(follow_update: boolean) {
    // this.route.params;
    this.viewService
      .getView('challenge_followers', [
        ['nid', this.idFromUrl],
        ['page', this.pageNo],
      ])
      .subscribe(data => {
        this.followers = follow_update ? this.followers.concat(data) : data;
        if (!this.followers.length) {
          this.hideloadmorefollower = true;
        } else {
          if (this.followers[0]['follow_counter'] == this.followers.length) {
            this.hideloadmorefollower = true;
          }
          this.challenge.nbFollowers = this.followers[0]['follow_counter'];
        }
      });
  }

  getCurrentUser() {
    this.userService.getStatus().subscribe(
      data => {
        this.currentuser = data;
      },
      err => {
        this.notificationBarService.create({
          message: 'Sorry, somthing went wrong, try again later.',
          type: NotificationType.Error,
        });
      },
    );
  }

  getChallengeData() {
    // this.route.params;
    this.viewService
      .getView<IMissionData>('challenge_data', [['nid', this.idFromUrl]])
      .subscribe(d => {
        this.challenge = d[0];
        this.customDescription = this.challenge.body;
        this.customImage = this.challenge.cover_image;
        this.hideButton = false;
        if (this.challenge.status_id === 375) {
          this.hideButton = true;
        }
        // calculate days difference
        if (this.challenge) {
          const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
          const todayDate = new Date();
          const dateArray = this.challenge.challenge_end_date.value.split(' ');
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
          this.challenge.challengeDate = announce;

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
        this.statisticsService
          .view_record(this.challenge.nid, 'node')
          .subscribe();

        // Get count project
        this.getCountProject();

        // Get followers
        this.getChallengeFollowers(true);

        // Get projects
        this.getProjects();
      });
  }

  changeDateFormat(date) {
    if (!date) {
      return '';
    }
    date = date.split(' ')[0];
    date = date.split('-');
    return date[1] + '/' + date[2] + '/' + date[0];
  }

  getProjects() {
    this.loaderService.display(true);
    // this.projects = [];
    if (this.pageNo >= 0) {
      this.page_arg = ['page', this.pageNo];
    }
    // this.route.params;
    this.viewService
      .getView('challenge_entries', [
        ['nid', this.idFromUrl],
        ['page', this.pageNo],
        ['sort_by', this.sort_by],
        ['sort_order', this.sort_order],
      ])
      .subscribe(
        data => {
          this.projects = this.projects.concat(data);
          this.loadMoreVisibilty();
          this.loaderService.display(false);
        },
        err => {
          this.loaderService.display(false);
        },
      );
  }

  myEnteriesProject() {
    this.userId = localStorage.getItem('user_id');
    // this.projects = [];
    if (this.pageNo >= 0) {
      this.page_arg = ['page', this.pageNo];
    }
    // this.route.params;
    this.viewService
      .getView('challenge_entries', [
        ['nid', this.idFromUrl],
        ['uid', this.userId],
        ['page', this.pageNo],
        ['sort_by', this.sort_by],
        ['sort_order', this.sort_order],
      ])
      .subscribe(data => {
        this.projects = this.projects.concat(data);
      });
  }

  loadMoreVisibilty() {
    this.getCountProject();
    this.hideloadmoreproject =
      this.challenge.nbProjects <= this.projects.length;
  }

  getSortType(event: any) {
    this.projects = [];
    this.sortData = event;
    this.sort_by = this.sortData.sort_by;
    this.sort_order = this.sortData.sort_order;
    this.pageNo = 0;
    this.getProjects();
    this.hideloadmoreproject = false;
    this.loadMoreVisibilty();
  }

  getPageNumber(event: any) {
    this.pageNo = event;
    this.getProjects();
  }

  followersCounter(count) {
    this.challenge.nbFollowers = count;
    this.pageNo = 0;
    this.getChallengeFollowers(false);
  }

  getPageNumberFollowers(event: any) {
    this.pageNo = event;
    this.getChallengeFollowers(true);
  }

  getCountProject() {
    // this.route.params;
    this.viewService
      .getView('maker_count_project_challenge_api/' + this.idFromUrl)
      .subscribe(d => {
        this.challenge.nbProjects = d ? d : 0;
      });
  }

  enterToChallengeProject(nid) {
    this.userService.isLogedIn().subscribe(data => {
      if (data) {
        this.router.navigate(['missions/enter-mission', nid]);
      } else {
        this.router.navigate(['/access-denied']);
      }
    });
  }

  enterToChallengeProjectClosed() {
    this.notificationBarService.create({
      message: 'Sorry, the Challenge not Open for submissions.',
      type: NotificationType.Info,
      allowClose: true,
      autoHide: false,
      hideOnHover: false,
    });
  }

  checkenter() {
    this.viewService
      .checkEnterStatus(
        'maker_challenge_entry_api/enter_status',
        this.idFromUrl,
      )
      .subscribe(data => {
        this.enterStatus = data.status;
        this.submitStatus.emit(this.enterStatus);
      });
  }

  userEnteredProject() {
    this.viewService
      .getView('user-entered-project', [['uid', this.userId]])
      .subscribe(data => {
        for (const key in data) {
          if (!data.hasOwnProperty(key)) {
            continue;
          }
          const obj = data[key];
          for (const prop in obj) {
            if (!obj.hasOwnProperty(prop)) {
              continue;
            }
            const nid = this.route.snapshot.params['nid'];
            if (nid == obj[prop]) {
              this.submittedBefore = true;
            }
          }
        }
      });
  }
}
