import { Component, OnInit } from '@angular/core';
import { ViewService,MainService } from '../../d7services';
import { RouterModule, Router } from '@angular/router';
import { ISorting } from '../../models/explore/sorting';
import { ProjectCategory } from '../../models';
import { LoaderService } from '../shared/loader/loader.service';
import { MetaService } from '@nglibs/meta';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';
import * as globals from '../../d7services/globals';
import { SortBySortingSet, SortingSet } from '../../models/makers';
import { Auth } from '../../auth0/auth.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {
  CurrentSortSet: SortingSet = {
    sort_by: "created_2",
    sort_order: "DESC",
  };
  SortBy: SortBySortingSet = new SortBySortingSet(this.CurrentSortSet, this.viewService)
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
  categories_parents: ProjectCategory[] = [];
  categories_childs: ProjectCategory[] = [];
  all_categories: ProjectCategory[];
  childCategory = [];
  categoryId;
  Manager:boolean = false;
  
  constructor(
    private router: Router,
    private viewService: ViewService,
    private loaderService: LoaderService,
    private meta: MetaService,
    private mainService: MainService,
    private notificationBarService: NotificationBarService,
    public auth: Auth,
  ) { }

  ngOnInit() {
     this.Manager = this.auth.IsCommuintyManager();
     
    this.getProjects();
    this.getCountProject();
    this.getProjectCategories();


    this.meta.setTitle(`Maker Projects |Learn the Stories Behind the Projects | Maker Share `);
    this.meta.setTag('og:image', '/assets/logo.png');
    this.meta.setTag('og:description', 'From 3D printing to robots to yarncraft, browse projects from Maker Faire and all the Maker community. Maker Share is a project by Make: + Intel.');
  }
  getProjects() {
    this.loaderService.display(true);
    if (this.pages == 0) {
      this.projects = [];
    }
    this.SortBy.Sort('browse_projects',this.pages,this.categoryId).subscribe(data => {
      this.projects = this.projects.concat(data);
      this.loadMoreVisibilty();
      if (this.projects.length == 0) {
        this.notificationBarService.create({ message: "There aren't any projects yet for this topic. Go make one!", type: NotificationType.Error, allowClose: false, autoHide: true, hideOnHover: false });
      }
      this.loaderService.display(false);
    }, err => {

    });
  }
  projectsById(event) {
    // show spinner
    this.categoryId = event.target.id;
    this.projects = [];
    this.pages = 0;
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

  }
  selectParent(value){
    this.CurrentActiveChildIndex = -1;
    this.childCategory = []; 
    if(value == 1) {
      this.categoryId = null;
      this.pages = 0;
      this.getCountProject();
      this.getProjects();
    } else {
      for (let cate of this.categories_childs) {
        if (cate.parent_tid == value){
          this.childCategory.push(cate);
        }
      }
    }
  }
  loadMoreProject() {
    this.pages++;
    this.getProjects();
  }
  loadMoreVisibilty() {
    if (this.countProject <= this.projects.length) {
      this.hideloadmoreproject = true;
    } else if (this.countProject > this.projects.length) {
      this.hideloadmoreproject = false;
    }
  }

  sortProjects(sort){   
    if(sort == '_none') return;
    this.pages = 0;
    this.CurrentSortSet.sort_order = "DESC";
    if( sort == 'created_1' || sort == 'title') {
      this.CurrentSortSet.sort_order = "ASC";
    }
    this.CurrentSortSet.sort_by = sort;
    this.getCountProject();        
    this.getProjects();
  }  
}
