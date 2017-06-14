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
  hasContent = false;
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
  ActionName = "Sort";
  categories_parents: ProjectCategory[] = [];
  categories_childs: ProjectCategory[] = [];
  all_categories: ProjectCategory[];
  childCategory = [];
  categoryId;
  sort_functions = [
    'dummy',
    'mostRecent',   
    'oldest',   
    'sortAsc',
    'sortDesc',
    'mostLiked',   
    'mostViewed',   
    'mostFeatured',   
    'mostForked',   
    ]
  sortingSet = {
    'mostRecent': {
      'sort_order': "DESC",
      'sort_by': "created_2",
      'ActionName': "Most recent",
    },
    'oldest': {
      'sort_order': "ASC",
      'sort_by': "created_1",
      'ActionName': "Oldest",
    },
    'sortAsc': {
      'sort_order': "ASC",
      'sort_by': "title",
      'ActionName': "Title A-Z",
    },
    'sortDesc': {
      'sort_order': "DESC",
      'sort_by': "title_1",
      'ActionName': "Title Z-A",
    },
    'mostLiked': {
      'sort_order': "DESC",
      'sort_by': "count",
      'ActionName': "Most liked",
    },
    'mostViewed': {
      'sort_order': "DESC",
      'sort_by': "php",
      'ActionName': "Most viewed",
    },
    'mostFeatured': {
      'sort_order': "DESC",
      'sort_by': "field_projects_target_id",
      'ActionName': "Featured",
    },
    'mostForked': {
      'sort_order': "DESC",
      'sort_by': "field_total_forks_value",
      'ActionName': "Most forked",
    },
    'allProject': {
      'sort_order': "DESC",
      'sort_by': "created_2",
      'ActionName': "Most recent",
    },
  };
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
    if (this.pages == 0) {
      this.projects = [];
    }
    if (this.categoryId) {
      this.viewService.getView('browse_projects',[['page', this.pages], ['sort_by', this.sort.sort_by], ['sort_order', this.sort.sort_order], ['category', this.categoryId]]).subscribe(data => {
        this.projects = this.projects.concat(data);
        this.loadMoreVisibilty();
        if (this.projects.length == 0) {
          this.notificationBarService.create({ message: "There aren't any projects yet for this topic. Go make one!", type: NotificationType.Error, allowClose: false, autoHide: true, hideOnHover: false });
        }
        // hide spinner
        this.loaderService.display(false);
      }, err => {

      });
    } else {
      this.viewService.getView('browse_projects', [['page', this.pages], ['sort_by', this.sort.sort_by], ['sort_order', this.sort.sort_order]]).subscribe(data => {
        this.projects = this.projects.concat(data);
        this.loadMoreVisibilty();
        // hide spinner
        this.loaderService.display(false);
      }, err => {
        // hide spinner
        this.loaderService.display(false);
      });
    }

  }
  projectsById(event) {
    // show spinner
    this.categoryId = event.target.id;
    this.getProjects();
  }
  /* function to get count projects */
  getCountProject() {
    this.viewService.getView('maker_count_all_projects').subscribe(data => {
      this.countProject = data[0];
    }, err => {

    });
  }
   getProjectCategories() {
    this.viewService.getView('projects_categories').subscribe((categories: ProjectCategory[]) => {
      this.all_categories = categories;
      categories.forEach((element, index) => {
        if (element.parent_tid) {
          this.viewService.getView('browse_projects', [['category', element.tid]]).subscribe(data => {
            if(data.length > 0) {
              this.categories_childs.push(element);
            }
          });
        } else {
          this.categories_parents.push(element);
        }
      });        
    });
  }
  idCategory(term) {
    this.CurrentActiveParentIndex = this.categories_parents.map(element => element.tid).indexOf(term.parent_tid);
    this.nameCat = term.name;
    let body = {
      "tid": term.tid,
    };
    this.mainService.post(globals.endpoint + '/maker_count_all_projects/retrieve_count_category', body).subscribe(res => {
      this.countProject = res['_body'].replace(']', '').replace('[', '')
    }, err => {
      // this.notificationBarService.create({ message: "Sorry, but your project doesn't meet the challenge requirements, Please check <a id='rules-id' href='#rules' data-nodeId='" + this.nid + "'>Rules & Instructions </a>", type: NotificationType.Error, allowClose: true, autoHide: false, hideOnHover: false, isHtml: true });
    });

  }//end function
  selectParent(value){
    this.CurrentActiveChildIndex = -1;
    this.childCategory = []; 
    if(value == 1) {
      this.categoryId = null;
      this.pages = 0;
      this.getProjects();
    } else {
      for (let cate of this.categories_childs) {
        if (cate.parent_tid == value){
          this.childCategory.push(cate);
        }
      }
    }
  }
  /* end count function */
  /* function load more  */
  loadMoreProject() {
    this.pages++;
    this.getProjects();
  }/* end function load more  */
  // Function to control load more button
  loadMoreVisibilty() {
    // get the challenges array count
    if (this.countProject <= this.projects.length) {
      this.hideloadmoreproject = true;
    } else if (this.countProject > this.projects.length) {
      //  setTimeout(10000);
      this.hideloadmoreproject = false;
    }
  }/* END FUNCTION loadMoreVisibilty */
  /* function to sort challenge Title A-z */

  sortBy(type) {
    this.projects = [];
    this.pages = 0;
    this.sort.sort_order = this.sortingSet[type].sort_order;
    this.sort.sort_by = this.sortingSet[type].sort_by;
    this.ActionName = this.sortingSet[type].ActionName;
    this.getCountProject();    
    this.getProjects();
  }
  sortProjects(sort){
    this.sortBy([this.sort_functions[sort]]);
  }  
}
