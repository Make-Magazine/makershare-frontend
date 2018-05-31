import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  NotificationBarService,
  NotificationType,
} from 'ngx-notification-bar/release';
import { Singleton } from '../../core/models/application';
import { MainService } from '../../core/d7services/main/main.service';
import { ViewService } from '../../core/d7services/view/view.service';
import { SortBySortingSet, SortingSet } from '../../core/models/makers';
import { ICategory } from '../../core/models/category/category';
import { Auth } from '../auth0/auth.service';
import { LoaderService } from '../shared/loader/loader.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {
  CurrentSortSet: SortingSet = {
    sort_by: 'created_2',
    sort_order: 'DESC',
  };
  SortBy: SortBySortingSet = new SortBySortingSet(
    this.CurrentSortSet,
    this.viewService,
  );

  private projects = [];
  private categoryId: number;
  private subCategoryId: number;
  private showLoadMoreBtn: boolean = false;
  private projectsCount: number = 0;
  private currentPage: number = 0;
  private categories: ICategory[] = [];
  private subCategories: ICategory[] = [];
  private filteredSubCategories: ICategory[] = [];
  // Manager: boolean = false;

  constructor(
    private viewService: ViewService,
    private loaderService: LoaderService,
    private mainService: MainService,
    private notificationBarService: NotificationBarService,
    public auth: Auth,
    private meta: Meta,
    private title: Title,
  ) {
    this.title.setTitle(
      'Maker Projects | Learn the Stories Behind the Projects | Maker Share',
    );
    this.meta.addTags([
      {
        name: 'description',
        content: 'Where Makers come to show & tell what they can do. Create your Maker Portfolio and share your projects, participate in community missions, and learn new skills.' ,
      },
      {
        name: 'og:description',
        content:
          'From 3D printing to robots to yarncraft, browse projects from Maker Faire and all the Maker community. Maker Share is a project by Make: + Intel.',
      },
      {
        name: 'og:image',
        content:
          Singleton.Settings.appURL +
          '/assets/images/logos/maker-share-logo-clr@2x-100.jpg.jpg',
      },
    ]);
  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    // this.Manager = this.auth.IsCommuintyManager();
    this.countAllProjects();
    this.getProjects();
    this.getProjectCategories();
    this.meta.updateTag({name:'description',content:'Seeing about rewriting the meta description the fly, since it facebook doesnt seem to care about og:description'});
  }

  /**
   * countAllProjects
   */
  countAllProjects() {
    this.viewService.getView('maker_count_all_projects').subscribe(
      data => {
        this.projectsCount = data[0];
      },
      err => {},
    );
  }

  /**
   * getProjects
   */
  getProjects() {
    this.loaderService.display(true);
    if (this.currentPage == 0) {
      this.projects = [];
    }
    this.SortBy
      .Sort(
        'browse_projects',
        this.currentPage,
        this.categoryId,
        this.subCategoryId,
      )
      .subscribe(
        data => {
          this.projects = this.projects.concat(data);
          this.loadMoreVisibility();
          this.loaderService.display(false);
          if (this.projects.length == 0) {
            this.notificationBarService.create({
              message:
                "There aren't any projects yet for this topic. Go make one!",
              type: NotificationType.Error,
              allowClose: false,
              autoHide: true,
              hideOnHover: false,
            });
          }
        },
        err => {},
      );
  }

  /**
   * getProjectCategories
   */
  getProjectCategories() {
    this.viewService
      .getView('projects_categories')
      .subscribe((categories: ICategory[]) => {
        // this.categories = categories;
        for (const element of categories) {
          if (element.parent_tid) {
            this.subCategories.push(element);
          } else {
            this.categories.push(element);
          }
        }
      });
  }

  /**
   * countSubCategory
   */
  countSubCategory() {
    this.mainService
      .custompost('maker_count_all_projects/retrieve_count_category', {
        tid: this.subCategoryId,
      })
      .subscribe(
        res => {
          this.projectsCount = res[0];
        },
        err => {},
      );
    this.currentPage = 0;
    this.getProjects();
  }

  /**
   * selectParent
   * @param value
   */
  selectParent(value) {
    this.filteredSubCategories = [];
    this.subCategoryId = null;
    if (value == 1) {
      this.currentPage = 0;
      this.categoryId = null;
      this.countAllProjects();
      this.getProjects();
    } else {
      for (const cate of this.subCategories) {
        if (cate.parent_tid == value) {
          this.filteredSubCategories.push(cate);
        }
      }
    }
  }

  /**
   * selectSubCategory
   *
   * @param event
   * @param term
   */
  selectSubCategory(term) {
    if (this.subCategoryId === term.tid) {
      return;
    }
    this.subCategoryId = term.tid;

    // show spinner
    this.loaderService.display(true);

    this.countSubCategory();
  }

  /**
   * loadMoreProjects
   */
  loadMoreProjects() {
    this.currentPage++;
    this.getProjects();
  }

  /**
   * loadMoreVisibilty
   */
  loadMoreVisibility() {
    this.showLoadMoreBtn = this.projectsCount > this.projects.length;
  }

  /**
   * sortProjects
   *
   * @param sort
   */
  sortProjects(sort) {
    if (sort == '_none') {
      return;
    }
    this.currentPage = 0;
    this.CurrentSortSet.sort_order = 'DESC';
    if (sort == 'created_1' || sort == 'title') {
      this.CurrentSortSet.sort_order = 'ASC';
    }
    this.CurrentSortSet.sort_by = sort;
    this.countAllProjects();
    this.getProjects();
  }
}
