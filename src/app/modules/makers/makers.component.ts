import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  NotificationBarService,
  NotificationType,
} from 'ngx-notification-bar/release';
import { ICategory, Singleton, SortBySortingSet, SortingSet } from '../../core';
import { MainService, ViewService } from '../../core/d7services';
import { LoaderService } from '../shared/loader/loader.service';

@Component({
  selector: 'app-makers',
  templateUrl: './makers.component.html',
})
export class MakersComponent implements OnInit {
  CurrentSortSet: SortingSet = {
    sort_by: 'random_seed',
    sort_order: 'DESC',
  };
  SortBy: SortBySortingSet = new SortBySortingSet(
    this.CurrentSortSet,
    this.viewService,
  );

  private makers = [];
  private categoryId: number;
  private subCategoryId: number;
  private showLoadMoreBtn: boolean = false;
  private makersCount: number = 0;
  private currentPage: number = 0;

  private categories: ICategory[] = [];
  private subCategories: ICategory[] = [];
  private filteredSubCategories: ICategory[] = [];

  constructor(
    private viewService: ViewService,
    private loaderService: LoaderService,
    private mainService: MainService,
    private notificationBarService: NotificationBarService,
    title: Title,
    meta: Meta,
  ) {
    title.setTitle(
      'Maker Portfolios | Connect with the Global Community | Maker Share',
    );
    meta.addTags([
      {
        name: 'og:description',
        content:
          'Search for Makers by interest or location or create own Maker Portfolio and share your projects. Maker Share is a project by Make: + Intel.',
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
    this.countAllMakers();
    this.getMakers();
    this.getMakerCategories();
  }

  /**
   * countAllMakers
   */
  countAllMakers() {
    this.mainService
      .custompost('maker_count_api/makers_count')
      .subscribe(res => {
        this.makersCount = res[0];
      });
  }

  /**
   * getMakers
   */
  getMakers() {
    this.loaderService.display(true);
    if (this.currentPage == 0) {
      this.makers = [];
    }
    this.SortBy
      .Sort('makers', this.currentPage, this.categoryId, this.subCategoryId)
      .subscribe(data => {
        this.makers = this.makers.concat(data);
        this.loadMoreVisibility();
        this.loaderService.display(false);
        if (this.makers.length == 0) {
          this.notificationBarService.create({
            message: "There aren't any makers Favorite this topic yet!",
            type: NotificationType.Error,
            allowClose: false,
            autoHide: true,
            hideOnHover: false,
          });
        }
      });
  }

  /**
   * getMakerCategories
   */
  getMakerCategories() {
    this.viewService.getView('projects_categories').subscribe(categories => {
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
      .custompost('maker_count_api/retrieve_count_makers_in_category', {
        tid: this.subCategoryId,
      })
      .subscribe(
        res => {
          this.makersCount = res[0];
        },
        err => {},
      );
    this.currentPage = 0;
    this.getMakers();
  }

  /**
   * selectParent
   *
   * @param value
   */
  selectParent(value) {
    this.filteredSubCategories = [];
    this.subCategoryId = null;
    if (value == 1) {
      this.currentPage = 0;
      this.categoryId = null;
      this.countAllMakers();
      this.getMakers();
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
    this.categoryId = term.parent_tid;

    this.countSubCategory();
  }

  /**
   * loadMoreMakers
   */
  loadMoreMakers() {
    this.currentPage++;
    this.getMakers();
  }

  /**
   * loadMoreVisibilty
   */
  loadMoreVisibility() {
    this.showLoadMoreBtn = this.makersCount > this.makers.length;
  }

  /**
   * sortMakers
   *
   * @param sort
   */
  sortMakers(sort) {
    if (sort == '_none') {
      return;
    }
    this.currentPage = 0;
    this.CurrentSortSet.sort_order = 'DESC';
    if (sort == 'field_first_name_value_1' || sort == 'random') {
      this.CurrentSortSet.sort_order = 'ASC';
    }
    this.CurrentSortSet.sort_by = sort;
    this.getMakers();
  }
}
