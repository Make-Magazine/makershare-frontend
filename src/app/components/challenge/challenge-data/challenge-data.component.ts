import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { ISorting } from '../../../models/challenge/sorting';
import { FlagService } from '../../../d7services/flag/flag.service';
import { UserService } from '../../../d7services/user/user.service';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';

import 'rxjs/Rx';
@Component({
  selector: 'app-challenge-data',
  templateUrl: './challenge-data.component.html',
})
export class ChallengeDataComponent implements OnInit {

  customTitle: string;
  customDescription: string;
  customImage: string;

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

  ) { }

  ngOnInit() {

    this.getCountProject();
    this.activeTab = 'awards';
    this.getChallengeData();
    this.sort_order = "DESC";
    this.sort_by = "created";
    //awards and prizes
    this.route.params
      .switchMap((nid) => this.viewService.getView('award_block', [['nid', nid['nid']]]))
      .subscribe(data => {
        this.awards = data;
        this.no_of_awards = data.length;
      }, err => {
        this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error });
      });
    this.cheackenter();

    this.getChallengeFollowers();
    this.getProjects();
    this.getCurrentUser();
    this.userService.getStatus().subscribe(data => {
      this.currentuser = data;
    }, err => {
      this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error });
    });
  }

  /* function get challenge followers */
  getChallengeFollowers() {
    //challenge followers
    this.route.params
      .switchMap((nid) => this.viewService.getView('challenge_followers', [['nid', nid['nid']], ['page', this.pageNo]]))
      .subscribe(data => {
        this.followers = this.followers.concat(data);
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
        this.notificationBarService.create({ message: 'Sorry error, somthing went wrong, try again later.', type: NotificationType.Error });
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
        console.log(data[0]);
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
          var endDate = new Date(this.challenge.challenge_end_date.value);
          var diffDays = Math.round(((endDate.getTime() - todayDate.getTime()) / (oneDay)));
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
      });
  }
  /* end function to get challenge data */

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

  getProjects() {
    /*cheack display_entries */
    //challenge entries projects
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
      }, err => {
        this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error });
      });
  }

  // Function to control load more button
  loadMoreVisibilty() {
    // get the challenges array count
    this.getCountProject();
    // this.getSortType(event);
    if (this.countProjects == this.projects.length) {
      this.hideloadmoreproject = true;

      // console.log(this.projects.length);
      //console.log(this.countProjects);
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
  }
  /* function to initialize page arg for loadmore for followers to send to api  */
  getPageNumberFollowers(event: any) {
    this.pageNo = event
    this.getChallengeFollowers();
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
<<<<<<< HEAD
           console.log(data[0]);
=======
          // console.log(data[0]);
>>>>>>> f567f66ed23ef8f3cde158c0213aeba986bdb320
        }
      }, err => {
        this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error });
      });
  }
  /*end function count project in challenge*/


  /* function to navigate to enter challenge */
  enterToChallengeProject(nid) {
    this.router.navigate(['challenges/enter-challenge', nid]);
  }
  /* end function to navigate to enter challenge */
  /* function cheack user allowe to enter challenge */

  cheackenter() {
    var nid = this.route.snapshot.params['nid'];
    this.viewService.cheackEnterStatus('maker_challenge_entry_api/enter_status', nid).subscribe(data => {
      this.enterStatus = data.status;
      this.submitStatus.emit(this.enterStatus);

      //console.log(data);
    }, err => {
      this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error });

    });
  }
  /* end function cheack user allowe to enter challenge */
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
        this.loadMoreVisibilty();
      }, err => {
        this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error });
      });
  }
  /* end function my Enteries */

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


