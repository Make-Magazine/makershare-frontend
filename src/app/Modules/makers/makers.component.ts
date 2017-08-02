import { Component, OnInit } from '@angular/core';
import { ViewService, MainService } from '../../CORE/d7services';
import { LoaderService } from '../shared/loader/loader.service';
import { NotificationBarService, NotificationType } from 'ngx-notification-bar/release';
import { Singleton } from '../../CORE';
import { SortBySortingSet, SortingSet } from '../../CORE';
import {Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-makers',
  templateUrl: './makers.component.html'
})
export class MakersComponent implements OnInit {

  CurrentSortSet: SortingSet = {
    sort_by: "random_seed",
    sort_order: "DESC",
  };
  SortBy: SortBySortingSet = new SortBySortingSet(this.CurrentSortSet, this.viewService);

  makers = [];
  pages: number = 0;
  makersCount = 0;
  hideloadmore = true;
  all_categories = [];
  categories_childs = [];
  categories_parents = [];

  CurrentActiveParentIndex;
  CurrentActiveChildIndex;
  nameCat;
  countProject;
  childCategory = [];
  categoryId;
  constructor(
    private viewService: ViewService,
    private loaderService: LoaderService,
    private mainService: MainService,

    private notificationBarService: NotificationBarService,
    title: Title,
    meta: Meta
  ) { 
    title.setTitle('Maker Portfolios | Connect with the Global Community | Maker Share');
    meta.addTags([
      {
        name: 'og:description', content: 'Search for Makers by interest or location or create own Maker Portfolio and share your projects. Maker Share is a project by Make: + Intel.'
      },
      {
        name: 'og:image',content: Singleton.Settings.AppURL + '/assets/images/logos/maker-share-logo-clr@2x-100.jpg.jpg'
      }
    ])
  }
  ngOnInit() {
    this.countAllMakers();
    this.getMakers();
    this.getMakerCategories();
  }
  countAllMakers() {
    this.mainService.custompost('maker_count_api/makers_count').subscribe(res => {
      this.makersCount = res[0];
    });
  }
  getMakers() {
    this.loaderService.display(true);
    if (this.pages == 0) {
      this.makers = [];
    }
    this.SortBy.Sort('makers', this.pages, this.categoryId).subscribe(data => {
     this.makers = this.makers.concat(data);
      this.loadMoreVisibilty();
      this.loaderService.display(false);
      if (this.makers.length == 0) {
        this.notificationBarService.create({ message: "There aren't any makers Favorite this topic yet!", type: NotificationType.Error, allowClose: false, autoHide: true, hideOnHover: false });
      }
    });
  }
  getMakerCategories() {
    this.viewService.getView('projects_categories').subscribe((categories) => {
      this.all_categories = categories;
      for (let element of this.all_categories) {
        if (element.parent_tid) {
              this.categories_childs.push(element);
        } else {
          this.categories_parents.push(element);
        }
      }
    });
  }
  countCategory(term) {
    this.CurrentActiveParentIndex = this.categories_parents.map(element => element.tid).indexOf(term.parent_tid);
    this.nameCat = term.name;
    let body = {
      "tid": term.tid,
    };
    this.mainService.custompost('maker_count_api/retrieve_count_makers_in_category', body).subscribe(res => {
      this.makersCount = res[0];
    }, err => {
    });
    this.pages = 0;
    this.getMakers();
  }//end function
  selectParent(value) {
    this.childCategory = [];
    if (value == 1) {
      this.pages = 0;
      this.categoryId = null;
      this.countAllMakers();
      this.getMakers();
      this.countAllMakers();
    } else {
      for (let cate of this.categories_childs) {
        if (cate.parent_tid == value) {
          this.childCategory.push(cate);
        }
      }
    }
  }
  selectCategory(event, term) {
    // show spinner
    this.loaderService.display(true);
    this.categoryId = event.target.id;
    this.countCategory(term)
  }

  loadMoreMakers() {
    this.pages++;
    this.getMakers();
  }

  loadMoreVisibilty() {
    if (this.makersCount <= this.makers.length) {
      this.hideloadmore = true;
    } else if (this.makersCount > this.makers.length) {
      this.hideloadmore = false;
    }
  }

  sortMakers(sort) {
    if (sort == "_none") return;
    this.pages = 0;
    this.CurrentSortSet.sort_order = "DESC";
    if (sort == "field_first_name_value_1" || sort == "random") {
      this.CurrentSortSet.sort_order = "ASC";
    }
    this.CurrentSortSet.sort_by = sort;
    this.getMakers();
  }
}