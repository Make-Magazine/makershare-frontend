import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewService, UserService, MainService } from '../../../../../../d7services';
import { ProjectCardPortfolio } from '../../../../../../models';
import { Observable } from "rxjs";
import { Router } from '@angular/router';

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


  constructor(
    private viewService: ViewService,
    private userService: UserService,
    private mainService: MainService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.UpdateProjects(0)
  }

  UpdateProjects(PageIndex: number) {
    let uid = localStorage.getItem('user_id');

    this.viewService.getView('portfolio-projects', [['status', this.status], ['uid', uid], ['member_id', uid], ["page", PageIndex]]).subscribe((projects: ProjectCardPortfolio[]) => {
      if (PageIndex == 0) {
        this.Projects = projects;
        // console.log( this.Projects)
        this.pages = 0;

      } else {
        this.Projects = this.Projects.concat(projects);
        // console.log( this.Projects)
        this.pages++;
      }
      this.loadMoreVisibilty();
    });
  }

  SaveProjectsOrder() {
    this.mainService.post('/api/maker_sort_project_api/sort', this.Projects.map(project => project.nid)).subscribe((data) => {

    }, err => {
    }, () => {
      this.UpdateProjects(1);
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
    // this.getCountProject();
    // console.log(this.countProject)
    // console.log(this.projects.length)
    // if(this.status==370){this.countProject=this.projectsCountPublic}
    if (this.status == 370) { this.countProject = this.projectsCountPublic }

    if (this.status == 371) { this.countProject = this.projectsCountPrivate }
    if (this.status == 1115) { this.countProject = this.projectsCountDraft }
    // console.log(this.countProject)
    // console.log(this.Projects.length)
    if (this.countProject <= this.Projects.length) {
      this.hideloadmoreproject = true;
    } else if (this.countProject > this.Projects.length) {
      //  setTimeout(10000);
      this.hideloadmoreproject = false;
    }
  }
  /* END FUNCTION loadMoreVisibilty */
}
