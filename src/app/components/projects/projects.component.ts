import { Component, OnInit } from '@angular/core';
import { ViewService,MainService } from '../../d7services';
import { RouterModule, Router } from '@angular/router';
import { ISorting } from '../../models/explore/sorting';
import { ProjectCategory } from '../../models';
import { LoaderService } from '../shared/loader/loader.service';
import { MetaService } from '@nglibs/meta';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';
import * as globals from '../../d7services/globals';



@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {
  projects = [];
  categories = null;
  nameCat;
  view = 'grid';
  pages: number = 0;
  countProject = 0;
  hideloadmoreproject = true;
  CurrentActiveParentIndex = -1;
  CurrentActiveChildIndex = -1;
  page_arg;
  sort: ISorting = {
    sort_by: "created_2",
    sort_order: "DESC",
    pageNo: 0
  };
  ActionName = "Most recent";
  categories_parents: ProjectCategory[] = [];
  categories_childs: ProjectCategory[] = [];
  all_categories: ProjectCategory[];
  constructor(
    private router: Router,
    private viewService: ViewService,
    private loaderService: LoaderService,
    private meta: MetaService,
    private mainService: MainService,
    private notificationBarService: NotificationBarService,
  ) { }

  ngOnInit() {

    this.getProjects();
    this.getCountProject();
    this.getProjectCategories();

    this.meta.setTitle(`Maker Share | Projects`);
    this.meta.setTag('og:image', '/assets/logo.png');
    this.meta.setTag('og:description', 'Projects Projects Projects Projects Projects Projects Projects Projects ');
  }
  getProjects() {
    // show spinner
    this.loaderService.display(true);

    // get the projects
    if (this.pages >= 0) {
      this.page_arg = ['page', this.pages];
    }
    if (this.pages == 0) {
      this.projects = [];
    }
    /* start obs*/
    // const response$ : Observable<Response>=this.viewService.getView('browse_projects', [['page', this.pages], ['sort_by', this.sort.sort_by], ['sort_order', this.sort.sort_order]]); 
    //   response$.subscribe(
    //     res => console.log("sas"),
    //     () =>{},
    //     ()=>console.log("compleate")
    //   );
    /* end obs*/
    this.viewService.getView('browse_projects', [['page', this.pages],['sort_by',this.sort.sort_by],['sort_order',this.sort.sort_order]]).subscribe(data => {
      this.projects = this.projects.concat(data);
      this.loadMoreVisibilty();
      // hide spinner
      this.loaderService.display(false);

    }, err => {
      // hide spinner
      this.loaderService.display(false);
    });

  }
  projectsById(event) {
    // show spinner
    console.log(event);
    this.loaderService.display(true);
    var id = event.target.id;
    this.viewService.getView('browse_projects', [['category', id],]).subscribe(data => {
      this.projects = data;
      //this.projects= this.projects.concat(data);
    //  this.loadMoreVisibilty();


      if (this.projects.length == 0) {
        this.notificationBarService.create({ message: "There aren't any projects yet for this topic. Go make one!", type: NotificationType.Error, allowClose: true, autoHide: false, hideOnHover: false });
      }
      // hide spinner
      this.loaderService.display(false);
    }, err => {

    });
  }
  /* function to get count projects */
  getCountProject() {
    this.viewService.getView('maker_count_all_projects').subscribe(data => {
      this.countProject = data[0];
      // console.log(this.countProject);
    }, err => {

    });
  }
  /* end count function */
  /* function load more  */
  loadMoreProject() {
    this.pages++;
    this.getProjects();
  }
  /* end function load more  */
  // Function to control load more button
  loadMoreVisibilty() {
    // get the challenges array count
    // this.getCountProject();
    console.log(this.countProject)
    console.log(this.projects.length)
    if (this.countProject <= this.projects.length) {
      this.hideloadmoreproject = true;
      
      

    } else if (this.countProject > this.projects.length) {
      //  setTimeout(10000);
      this.hideloadmoreproject = false;
    }
  }
  /* END FUNCTION loadMoreVisibilty */
  /* function to sort challenge Title A-z */
  sortAsc() {
    this.projects = [];
    this.pages = 0;
    this.sort.sort_order = "ASC";
    this.sort.sort_by = "title";
    this.ActionName = "Title A-Z"
    this.getCountProject();

    this.getProjects();
  }
  /* end function to sort challenge Title A-z */
  /* function to sort challenge Title Z-A */
  sortDesc() {
    this.projects = [];
    this.pages = 0
    this.sort.sort_order = "DESC";
    this.sort.sort_by = "title_1"
    this.ActionName = "Title Z-A"
    this.getCountProject();

    this.getProjects();

  }
  /* end function to sort challenge Title Z-A */
  /* function to sort challenge Recently */
  mostRecent() {
    this.projects = [];
    this.pages = 0
    this.sort.sort_order = "DESC"
    this.sort.sort_by = "created_2"
    this.ActionName = "Most recent"
    this.getCountProject();

    this.getProjects();

  }
  /* function to sort challenge Oldest */
  oldest() {
    this.projects = [];
    this.pages = 0
    this.sort.sort_order = "ASC";
    this.sort.sort_by = "created_1"
    this.ActionName = "Oldest"
    this.getCountProject();

    this.getProjects();

  }
  /* end function to sort challenge Oldest */

  /* function to sort challenge MostLiked */
  mostLiked() {
    this.projects = [];
    this.pages = 0
    this.sort.sort_order = "DESC";
    this.sort.sort_by = "count"
    this.ActionName = "Most liked"
    this.getCountProject();

    this.getProjects();

  }
  /* end function to sort challenge MostLiked */
  /* function to sort challenge mostViewed */
  mostViewed() {
    this.projects = [];
    this.pages = 0
    this.sort.sort_order = "DESC";
    this.sort.sort_by = "php"
    this.ActionName = "Most viewed"
    this.getCountProject();

    this.getProjects();

  }
  /* end function to sort challenge mostViewed */

  /* function to sort challenge MostForked */
  mostForked() {
    this.projects = [];
    this.pages = 0
    this.sort.sort_order = "DESC";
    this.sort.sort_by = "field_total_forks_value";
    this.ActionName = "Most forked"
    this.getCountProject();

    this.getProjects();

  }
  /* end function to sort challenge MostLiked */
  allProject() {
    this.projects = [];
    this.pages = 0
    this.sort.sort_order = "DESC"
    this.sort.sort_by = "created_2"
    this.ActionName = "Most recent"
    this.getCountProject();
    this.getProjects();
  }

  getProjectCategories() {
    this.viewService.getView('projects_categories').subscribe((categories: ProjectCategory[]) => {
      this.all_categories = categories;
      // console.log(this.all_categories)
      categories.forEach((element, index) => {
        if (element.parent_tid) {
          this.categories_childs.push(element);
        } else {
          this.categories_parents.push(element);
        }
      });
      //  console.log(this.categories_childs);
      // console.log(this.categories_parents);          
    });
  }
  idCategory(term) {
    this.CurrentActiveParentIndex = this.categories_parents.map(element=>element.tid).indexOf(term.parent_tid);
    this.nameCat=term.name;
    this.mainService.post(globals.endpoint + '/maker_count_all_projects/retrieve_count_category/', term.tid).subscribe(res => {
      this.countProject = res['_body'].replace(']', '').replace('[', '')
      console.log(res)
    }, err => {
      // this.notificationBarService.create({ message: "Sorry, but your project doesn't meet the challenge requirements, Please check <a id='rules-id' href='#rules' data-nodeId='" + this.nid + "'>Rules & Instructions </a>", type: NotificationType.Error, allowClose: true, autoHide: false, hideOnHover: false, isHtml: true });
    });

  }//end function

}
