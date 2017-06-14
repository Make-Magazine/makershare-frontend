import { Component, OnInit } from '@angular/core';
import { ViewService, MainService } from '../../d7services';
import { LoaderService } from '../shared/loader/loader.service';
import { ISorting } from '../../models/makers/sorting';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';
import * as globals from '../../d7services/globals';


@Component({
  selector: 'app-makers',
  templateUrl: './makers.component.html',
  styles: [`
  
  `]
})
export class MakersComponent implements OnInit {

  makers = [];
  pages: number = 0;
  page_arg
  ActionName = "Sort";
  sort: ISorting = {
    sort_by: "random",
    sort_order: "ASC",
    pageNo: 0
  };
  makersCount;
  hideloadmore = false;
  all_categories = [];
  categories_childs = [];
  categories_parents = [];
  sortingSet = {
    'randomized': {
      'sort_order': "ASC",
      'sort_by': "random",
      'ActionName': "Sort",
    },
    'mostProjects': {
      'sort_order': "DESC",
      'sort_by': "php_1",
      'ActionName': "Most projects",
    },
    'mostRecent': {
      'sort_order': "DESC",
      'sort_by': "created",
      'ActionName': "Newest",
    },
    'sortAsc': {
      'sort_order': "ASC",
      'sort_by': "field_first_name_value_1",
      'ActionName': "Title A-Z",
    },
    'sortDesc': {
      'sort_order': "DESC",
      'sort_by': "field_first_name_value",
      'ActionName': "Title Z-A",
    },
    'mostLiked': {
      'sort_order': "DESC",
      'sort_by': "php_2",
      'ActionName': "Most likes",
    },
    'mostViewed': {
      'sort_order': "DESC",
      'sort_by': "php",
      'ActionName': "Most views",
    },
  };
  sort_functions = [
    'dummy',
    'randomized',   
    'mostProjects',   
    'mostRecent',
    'sortAsc',
    'sortDesc',   
    'mostLiked',   
    'mostViewed',   
    ];
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
  ) { }

  ngOnInit() {
    this.countAllMakers();
    this.getMakers();
    this.getMakerCategories();
  }
  countAllMakers() {
    this.mainService.post(globals.endpoint + '/maker_count_api/makers_count').subscribe(res => {
      this.makersCount = res['_body'].replace(']', '').replace('[', '');
    });
  }
  getMakers() {
    this.loaderService.display(true);
    if (this.pages == 0) {
      this.makers = [];
    }
    if (this.categoryId) {
      this.viewService.getView('makers', [['page', this.pages],
      ['sort_by', this.sort.sort_by],
      ['sort_order', this.sort.sort_order],
      ['category', this.categoryId]]).subscribe(data => {
        this.makers = this.makers.concat(data);
        this.loaderService.display(false);
        if (this.makers.length == 0) {
          this.notificationBarService.create({ message: "There aren't any makers Favorite this topic yet!", type: NotificationType.Error, allowClose: false, autoHide: true, hideOnHover: false });
        }
      })
    } else {
      this.viewService.getView('makers', [['page', this.pages],
      ['sort_by', this.sort.sort_by],
      ['sort_order', this.sort.sort_order]]).subscribe(data => {
        this.makers = this.makers.concat(data);
        this.loaderService.display(false);
      })
    }
  }
  getMakerCategories() {
    this.viewService.getView('projects_categories').subscribe((categories) => {
      this.all_categories = categories;
      for (let element of this.all_categories) {
        console.log(element)
        if (element.parent_tid) {
          this.viewService.getView('makers', [['category', element.tid]]).subscribe(data => {
            if (data.length > 0){
                this.categories_childs.push(element);        
            }
        });
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
    this.mainService.post(globals.endpoint + '/maker_count_api/retrieve_count_makers_in_category', body).subscribe(res => {
      this.makersCount = res['_body'].replace(']', '').replace('[', '')
    }, err => {
      // this.notificationBarService.create({ message: "Sorry, but your project doesn't meet the challenge requirements, Please check <a id='rules-id' href='#rules' data-nodeId='" + this.nid + "'>Rules & Instructions </a>", type: NotificationType.Error, allowClose: true, autoHide: false, hideOnHover: false, isHtml: true });
    });
    this.getMakers();
  }//end function
  selectParent(value) {
    this.childCategory = [];
    if (value == 1) {
      this.pages == 0;
      this.categoryId = null;
      this.getMakers();
    } else {
      for (let cate of this.categories_childs) {
        if (cate.parent_tid == value) {
          this.childCategory.push(cate);
        }
      }
    }
  }
  selectCategory(event,term) {
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
    if (this.makersCount >= this.makers.length) {
      this.hideloadmore = false;
    } else if (this.makersCount < this.makers.length) {
      this.hideloadmore = true;
    }
  }
  sortBy(type) {
    this.makers = [];
    this.pages = 0;
    this.sort.sort_order = this.sortingSet[type].sort_order;
    this.sort.sort_by = this.sortingSet[type].sort_by;
    this.ActionName = this.sortingSet[type].ActionName;
    this.getMakers();
  }
  sortMakers(sort){
    this.sortBy(this.sort_functions[sort]);
  }
}
