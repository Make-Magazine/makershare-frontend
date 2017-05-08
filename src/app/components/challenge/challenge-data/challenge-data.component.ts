import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { ISorting } from '../../../models/challenge/sorting';
import { FlagService } from '../../../d7services/flag/flag.service';
import { UserService } from '../../../d7services/user/user.service';
import { StatisticsService } from '../../../d7services/statistics/statistics.service';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';
import { SharedButtonsComponent } from '../../shared/shared-buttons/shared-buttons.component';
import { LoaderService } from '../../shared/loader/loader.service';
import { Auth } from '../../../auth0/auth.service';


import 'rxjs/Rx';
@Component({
  selector: 'app-challenge-data',
  templateUrl: './challenge-data.component.html',
})
export class ChallengeDataComponent implements OnInit {

  customTitle: string;
  customDescription: string;
  customImage: string;
  submittedBefore: boolean;
  challenge;
  dates;
  str;
  awards;
  userId;
  countProjects = 0;
  no_of_awards;
  no_of_followers = 0;
  projects = [];
  hideloadmore = true;
  hideloadmoreproject = true;
  hideloadmorefollower = false;
  pageNumber = 0;
  challenge_start_date;
  followers = [];
  Flags = ['follow'];
  currentuser;
  hideButton = false;
  activeTab;
  sortData: ISorting;
  sort_order: string;
  sort_by: string;
  enterStatus = true;
  page_arg = [];
  projectdata;
  challengeDate;
  @Input() countFoll;
  @Input() sortType: ISorting;
  @Input() pageNo: number;
  @Output() submitStatus = new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService,
    private notificationBarService: NotificationBarService,
    private loaderService: LoaderService,
    private statisticsService: StatisticsService,
    private auth: Auth,
  ) { }

  ngOnInit() {
    // show spinner
    this.userId = localStorage.getItem('user_id');
    this.userEnteredProject();
    this.loaderService.display(true);

    this.getCountProject();
    this.activeTab = 'awards';
    this.getChallengeData();
    this.sort_order = "DESC";
    this.sort_by = "created";
    //awards and prizes
    this.route.params
      .switchMap((nid) => this.viewService.getView('award_block', [['nid', nid['nid']]]))
      .subscribe(data => {
        this.awards = data
        this.no_of_awards = data.length;
      }, err => {
        // this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error });
      });
    this.cheackenter();

    this.getChallengeFollowers(true);
    this.getProjects();
    this.getCurrentUser();
    this.userService.getStatus().subscribe(data => {
      this.currentuser = data;
    }, err => {
      // this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error });
    });


  }

  /* function get challenge followers */
  getChallengeFollowers(follow_update: boolean) {
    //challenge followers
    this.route.params
      .switchMap((nid) => this.viewService.getView('challenge_followers', [['nid', nid['nid']], ['page', this.pageNo]]))
      .subscribe(data => {
        if (follow_update) {
          this.followers = this.followers.concat(data);
        } else {

          this.followers = data;
        }
        if (!this.followers.length) {
          this.hideloadmorefollower = true;
          //console.log(this.followers.length)
        } else {
          if (this.followers[0]['follow_counter'] == this.followers.length) {

            this.hideloadmorefollower = true;
          }

          this.no_of_followers = this.followers[0]['follow_counter'];
        }
        // console.log(this.followers[0]['follow_counter']);
        // console.log(this.followers.length);
      }, err => {
        //this.notificationBarService.create({ message: 'Sorry error, somthing went wrong, try again later.', type: NotificationType.Error });
      });

  }
  /*end function get challenge followers */

  /* function get current user */
  getCurrentUser() {
    this.userService.getStatus().subscribe(data => {
      this.currentuser = data;
    }, err => {
      this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error });
    });
  }
  /* end function get user*/

  /* function to change tab*/
  changeChallangeTab(NewTab, e) {

    e.preventDefault();
    this.activeTab = NewTab;

  }
  /*  end function to change tab*/

  /* function to get challenge data */
  getChallengeData() {
    //challenge data
    this.route.params
      .switchMap((nid) => this.viewService.getView('challenge_data', [['nid', nid['nid']]]))
      .subscribe(data => {
        this.challenge = data[0];
        this.customTitle = this.challenge.title;
        this.customDescription = this.challenge.body;
        this.customImage = this.challenge.cover_image;

        if (this.challenge['status_id'] == '375') {
          this.hideButton = true;
        }
        else {
          this.hideButton = false;
        }
        //calculate days difference
        if (this.challenge) {
          var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
          var todayDate = new Date();
          let dateArray = this.challenge.challenge_end_date.value.split(" ");
          let YearDayMonth = dateArray[0].split("-");
          var endDate = new Date(+YearDayMonth[0], +YearDayMonth[1], +YearDayMonth[2]);
          var diffDays = Math.round(((endDate.getTime() - todayDate.getTime()) / (oneDay)));
          let winnerdate = this.challenge.winners_announcement_date.value.split(" ");
          let winnerdateArray = winnerdate[0].split("-");
          var announceDate = new Date(+winnerdateArray[0], +winnerdateArray[1], +winnerdateArray[2]);
          var announce = Math.round(((announceDate.getTime() - todayDate.getTime()) / (oneDay)));
          this.challengeDate = announce;

          if (diffDays >= 0) {
            this.challenge.opened = true;
            this.challenge.diffDays = diffDays
          } else {
            this.challenge.opened = false;
          }
        }
        this.challenge.challenge_end_date = this.changeDateFormat(this.challenge.challenge_end_date.value);
        this.challenge.challenge_start_date = this.changeDateFormat(this.challenge.challenge_start_date.value);
        this.challenge.winners_announcement_date = this.changeDateFormat(this.challenge.winners_announcement_date.value);

        // statistics
        this.statisticsService.view_record(this.challenge.nid, 'node').subscribe();
      });
  }
  /* end function to get challenge data */

  /* function to change data format */
  changeDateFormat(date) {
    var d;
    if (!date)
      return '';
    date = date.split(" ")[0];
    // d = new Date(date);
    // var monthNames = ["January", "February", "March", "April", "May", "June",
    //   "July", "August", "September", "October", "November", "December"
    // ];
    // var month = monthNames[d.getMonth()];
    // var fullYear = d.getFullYear();
    // var day = d.getDate();
    // var datestring = month + " " + day + "," + " " + fullYear;
    date = date.split("-");
    return date[1] + '/' + date[2] + '/' + date[0];
  }
  /* end function to change data format */

  getProjects() {
    // show spinner
    this.loaderService.display(true);

    /*cheack display_entries */
    //challenge entries projects
    this.projects = [];
    var sort: string;
    //  this.page_arg = [];
    if (this.pageNo >= 0) {
      this.page_arg = ['page', this.pageNo];
    }
    this.route.params
      .switchMap((nid) => this.viewService.getView('challenge_entries', [['nid', nid['nid']], ['page', this.pageNo], ['sort_by', this.sort_by], ['sort_order', this.sort_order]]))
      .subscribe(data => {
        this.projects = this.projects.concat(data);
        this.loadMoreVisibilty();
        // hide spinner
        this.loaderService.display(false);
      }, err => {
        //   this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error });
        // hide spinner
        this.loaderService.display(false);
      });


  }
  /* function to get myEnteries */
  myEnteriesProject() {
    /*cheack display_entries */
    //challenge entries projects
    this.userId = localStorage.getItem('user_id');
    this.projects = [];

    var sort: string;
    //  this.page_arg = [];
    if (this.pageNo >= 0) {
      this.page_arg = ['page', this.pageNo];
    }
    this.route.params
      .switchMap((nid) => this.viewService.getView('challenge_entries', [['nid', nid['nid']], ['uid', this.userId], ['page', this.pageNo], ['sort_by', this.sort_by], ['sort_order', this.sort_order]]))
      .subscribe(data => {
        this.projects = this.projects.concat(data);
      }, err => {
        // this.followers = this.followers.concat(data);
        //   this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error });
      });
  }
  // Function to control load more button
  loadMoreVisibilty() {
    // get the challenges array count
    this.getCountProject();
    // this.getSortType(event);
    if (this.countProjects == this.projects.length) {
      this.hideloadmoreproject = true;
    } else if (this.countProjects > this.projects.length) {
      setTimeout(10000);
      this.hideloadmoreproject = false;
    }
  }
  /* END FUNCTION loadMoreVisibilty */

  /* function to sort project apply action */
  getSortType(event: any) {
    this.projects = [];
    this.sortData = event;
    this.sort_by = this.sortData.sort_by;
    this.sort_order = this.sortData.sort_order;

    this.pageNo = 0;
    this.getProjects();
    this.hideloadmoreproject = false;
    this.loadMoreVisibilty();
    //console.log(this.projects);

  }
  /* end function sort */

  /* function to initialize page arg for loadmore for projects to send to api  */
  getPageNumber(event: any) {
    this.pageNo = event
    // console.log(this.pageNo);
    this.getProjects();
  }
  /* end function PN Projetcs */
  followersCounter(count) {
    this.no_of_followers = count;
    this.pageNo = 0;
    this.getChallengeFollowers(false);
  }
  /* function to initialize page arg for loadmore for followers to send to api  */
  getPageNumberFollowers(event: any) {
    this.pageNo = event
    this.getChallengeFollowers(true);
  }
  /* end function PN Followers */

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
        }
      }, err => {
        //   this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error });
      });
  }
  /*end function count project in challenge*/


  /* function to navigate to enter challenge */
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
  /* end function to navigate to enter challenge */
  enterToChallengeProjectClosed() {
    this.notificationBarService.create({ message: 'Sorry, the Challenge not Open for submissions.', type: NotificationType.Info, allowClose: true, autoHide: false, hideOnHover: false });

  }
  /* function cheack user allowe to enter challenge */

  cheackenter() {
    var nid = this.route.snapshot.params['nid'];
    this.viewService.cheackEnterStatus('maker_challenge_entry_api/enter_status', nid).subscribe(data => {
      this.enterStatus = data.status;
      this.submitStatus.emit(this.enterStatus);

      //console.log(data);
    }, err => {
      // this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error });

    });
  }

  /* end function my Enteries */
  /* end function cheack user allowe to enter challenge */
  /* function print text if user enter before in this challenge */
  userEnteredProject() {
    this.viewService.getView('user-entered-project', [['uid', this.userId]]).subscribe(data => {
      //  console.log(data);
      for (var key in data) {
        // skip loop if the property is from prototype
        if (!data.hasOwnProperty(key)) continue;

        var obj = data[key];
        for (var prop in obj) {
          // skip loop if the property is from prototype
          if (!obj.hasOwnProperty(prop)) continue;

          var nid = this.route.snapshot.params['nid'];

          if (nid == obj[prop]) {
            //console.log(prop + " = " + obj[prop]);
            this.submittedBefore = true;
          }
        }
      }
    }, err => {
      //   this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error });
    });
  }
  /* end function */


  /* service to get challenge name if project enter in it */
  // get challenge name and nid for challenge if found from a view
  //  getProjectData(){
  //     /* service to get challenge name if project enter in it */
  //      // get challenge name and nid for challenge if found from a view
  //   this.viewService.getView('project_data', [['nid',this.id]]).subscribe(data => {
  //     this.projectdata = data[0];
  //     console.log(this.projectdata.challenge_name);
  //   }, err => {

  //   });
  //       /* end service */
  //  }
  /* end service */

}


