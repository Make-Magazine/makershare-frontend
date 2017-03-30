import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { ISorting } from '../../../models/challenge/sorting';
import { UserCardComponent } from '../../shared/user-card/user-card.component'

@Component({
  selector: 'app-single-showcases',
  templateUrl: './singleShowcase.component.html',
})
export class SinglShowcaseComponent implements OnInit {

  showcase = { uid: "" };
  view = 'grid';
  profile = {};
  projects = [];
  hideloadmore = false;
  loadFlag = false;
  projectsCount = 0;
  sortData: ISorting;
  sort_order: string;
  sort_by: string;
  limit = 9;
  showcasenumber
  showcaseNid
  // @Output() showcaseNid = new EventEmitter();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
  ) { }

  ngOnInit() {

    this.sort_order = "DESC";
    this.sort_by = "changed";
    this.getShowcase();
    //load showcase projects count
    this.getProjectsCount();
    //load showcaseprojects data
    this.getshowCaseProjects();
    this.showcaseNid = this.route.params['value'].nid
    // console.log(this.showcasenumber)

  }
  getshowCaseProjects() {
    if (this.loadFlag) {
      this.limit += 3;
    }

    this.route.params
      .switchMap((nid) => this.viewService.getView('views/showcase_projects', [['nid', nid['nid']], ['display_id', 'services_1'], ['limit', this.limit], ['sort_by', this.sort_by], ['sort_order', this.sort_order]]))
      .subscribe(data => {
        this.projects = data;
        console.log(this.projects)
        this.loadMoreVisibilty();
      });
    this.loadFlag = false;
  }
  // get more click
  loadmore() {
    this.loadFlag = true;
    this.getshowCaseProjects();
  }

  // control load more button
  loadMoreVisibilty() {
    // get the challenges array count
    if (this.projects.length >= this.projectsCount) {

      this.hideloadmore = true;

    } else {
      this.hideloadmore = false;
    }

  }

  goHome() {
    this.router.navigate(['']);
  }


  goToProfile(nid) {
    this.router.navigate(['user']);
  }

  getShowcase() {
    // load the showcase data
    this.route.params
      .switchMap((nid) => this.viewService.getView('showcase', [['nid', nid['nid']]]))
      .subscribe(data => {
        this.showcase = data[0];
        //this.getProfile(this.showcase.uid);

      });
  }

  getSortType(event: any) {
    this.sortData = event;
    this.sort_by = this.sortData.sort_by;
    this.sort_order = this.sortData.sort_order;
    this.getshowCaseProjects();
  }

  getProjectsCount() {
    this.route.params
      .switchMap((nid) => this.viewService.getView('showcase_projects_nid', [['nid', nid['nid']]]))
      .subscribe(data => {
        this.projectsCount = data.length;
        // console.log(data.length);
      });

  }
  ShowcasePojectNav(nid, snid) {
    this.router.navigate(['/showcases/project2/', snid, nid]);
    // this.showcaseNid.emit(this.route.params['value'].nid)
  }

}
