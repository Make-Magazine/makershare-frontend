import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../d7services/view/view.service';
import { RouterModule, Router } from '@angular/router';
import { ISorting } from '../../models/explore/sorting';
import { ProjectCategory } from '../../models';



@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
})
export class ExploreComponent implements OnInit {
  projects = [];
  categories = null;
  view = 'grid';
  pages: number = 0;
  countProject = 0;
  hideloadmoreproject = false;
  page_arg;
  sort: ISorting = {
    sort_by: "created_2",
    sort_order: "DESC",
    pageNo: 0
  };
  ActionName = "Most Recent";
  categories_parents:ProjectCategory[]= [];
  categories_childs:ProjectCategory[] = [];
  all_categories:ProjectCategory[];
  constructor(
    private router: Router,
    private viewService: ViewService,
  ) { }

  ngOnInit() {
    this.getProjects();
    this.getCountProject();
  }

  getProjects() {
    // get the projects
    if (this.pages >= 0) {
      this.page_arg = ['page', this.pages];
    }
    if (this.pages == 0) {
      this.projects = [];
    }
    this.viewService.getView('browse_projects', [['page', this.pages], ['sort_by', this.sort.sort_by], ['sort_order', this.sort.sort_order]]).subscribe(data => {
      // console.log(data);
      this.projects = this.projects.concat(data);
      // console.log(this.projects);
    }, err => {

    });
    this.getProjectCategories()
  }
  projectsById(event) {
    var id = event.target.id;
    this.viewService.getView('browse_projects', [['category', id],]).subscribe(data => {
      this.projects = data;
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
    this.getCountProject();
    if (this.countProject == this.projects.length) {
      this.hideloadmoreproject = true;

    } else if (this.countProject > this.projects.length) {
      setTimeout(10000);
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
    this.ActionName = "Title A-z"

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

    this.getProjects();

  }
  /* end function to sort challenge Title Z-A */
  /* function to sort challenge Recently */
  mostRecent() {
 this.projects = [];
    this.pages = 0
    this.sort.sort_order = "DESC"
    this.sort.sort_by = "created_2"
    this.ActionName = "Most Recent"

    this.getProjects();

  }
  /* function to sort challenge Oldest */
  oldest() {
     this.projects = [];
    this.pages = 0
    this.sort.sort_order = "ASC";
    this.sort.sort_by = "created_1"
    this.ActionName = "Oldest"

    this.getProjects();

  }
  /* end function to sort challenge Oldest */

  /* function to sort challenge MostLiked */
  mostLiked() {
     this.projects = [];
    this.pages = 0
    this.sort.sort_order = "DESC";
    this.sort.sort_by = "count"
    this.ActionName = "Most Liked"

    this.getProjects();

  }
  /* end function to sort challenge MostLiked */

  /* function to sort challenge MostForked */
  mostForked() {
     this.projects = [];
    this.pages = 0
    this.sort.sort_order = "DESC";
    this.sort.sort_by = "field_total_forks_value";
    this.ActionName = "Most Forked"

    this.getProjects();

  }
  /* end function to sort challenge MostLiked */

  getProjectCategories(){
    this.viewService.getView('projects_categories').subscribe((categories:ProjectCategory[]) => {
      this.all_categories = categories;
      // console.log(this.all_categories)
      categories.forEach((element,index) =>{
        if(element.parent_tid){
          this.categories_childs.push(element);
          console.log(this.categories_childs)
        }else{
          this.categories_parents.push(element);
          console.log(this.categories_parents)          
        }
      });
    });
  }

}
