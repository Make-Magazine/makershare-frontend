import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewService, MainService } from 'app/CORE/d7services';
import { ProjectCardPortfolio } from 'app/CORE';

@Component({
  selector: 'portfolio-tab',
  templateUrl: './portfolio-tab.component.html',
})
export class PortfolioTabComponent implements OnInit {
  @Input() status: number;
  @Input() DefaultView: string;
  @Input() projectsCountPublic;
  @Input() projectsCountPrivate;
  @Input() projectsCountDraft;
  @Output() emitter = new EventEmitter();

  //grid/showcase
  Projects: ProjectCardPortfolio[] = [];
  pages: number = 1;
  hideloadmoreproject = true;
  countProject: number;
  isLoaded = false;
  projectsCountPublic1 = this.projectsCountPublic;

  constructor(
    private viewService: ViewService,
    private mainService: MainService,
  ) { }

  ngOnInit() {
    this.getCounts();
    this.UpdateProjects(0)
  }

  UpdateProjects(PageIndex: number) {
    let uid = localStorage.getItem('user_id');

    this.viewService.getView('portfolio-projects', [['status', this.status], ['uid', uid], ['member_id', uid], ["page", PageIndex]]).subscribe((projects: ProjectCardPortfolio[]) => {
      if (PageIndex == 0) {
        this.Projects = projects;
        this.isLoaded = true;
        // console.log( this.Projects)
        this.pages = 0;

      } else {
        this.Projects = this.Projects.concat(projects);
        // console.log( this.Projects)
        //this.pages++;
      }
      this.getCounts();
    });

  }

  SaveProjectsOrder() {
    this.mainService.custompost('maker_sort_project_api/sort', this.Projects.map(project => project['nid'])).subscribe((data) => {

    }, err => {
    }, () => {
      this.UpdateProjects(1);
    });
  }
  /*get count public */
  getCounts() {
    let userId = localStorage.getItem('user_id');

    let body = {
      "uid": userId,
    };
    this.mainService.custompost('maker_count_all_projects/retrieve_count_project_public', body).subscribe(res => {
      this.projectsCountPublic = res[0]
      this.loadMoreVisibilty();

    }, err => {
      // this.notificationBarService.create({ message: "Sorry, but your project doesn't meet the challenge requirements, Please check <a id='rules-id' href='#rules' data-nodeId='" + this.nid + "'>Rules & Instructions </a>", type: NotificationType.Error, allowClose: true, autoHide: false, hideOnHover: false, isHtml: true });
    });
    this.mainService.custompost('maker_count_all_projects/retrieve_count_project_private', body).subscribe(res => {
      this.projectsCountPrivate = res[0]
      this.loadMoreVisibilty();

    }, err => {
      // this.notificationBarService.create({ message: "Sorry, but your project doesn't meet the challenge requirements, Please check <a id='rules-id' href='#rules' data-nodeId='" + this.nid + "'>Rules & Instructions </a>", type: NotificationType.Error, allowClose: true, autoHide: false, hideOnHover: false, isHtml: true });
    });
    this.mainService.custompost('maker_count_all_projects/retrieve_count_project_draft', body).subscribe(res => {
      this.projectsCountDraft = res[0]
      this.loadMoreVisibilty();

    }, err => {
      // this.notificationBarService.create({ message: "Sorry, but your project doesn't meet the challenge requirements, Please check <a id='rules-id' href='#rules' data-nodeId='" + this.nid + "'>Rules & Instructions </a>", type: NotificationType.Error, allowClose: true, autoHide: false, hideOnHover: false, isHtml: true });
    });

  }

  /* function load more  */
  loadMoreProject() {
    this.pages++;
    this.UpdateProjects(this.pages);
  }
  /* end function load more  */
  // Function to control load more button
  loadMoreVisibilty() {
    // get the challenges array count

    if (this.status == 370) { this.countProject = this.projectsCountPublic }

    if (this.status == 371) { this.countProject = this.projectsCountPrivate }
    if (this.status == 1115) { this.countProject = this.projectsCountDraft }

    if (this.countProject <= this.Projects.length) {
      this.hideloadmoreproject = true;
    } else if (this.countProject > this.Projects.length) {
      this.hideloadmoreproject = false;
    }
  }
  /* END FUNCTION loadMoreVisibilty */
}
