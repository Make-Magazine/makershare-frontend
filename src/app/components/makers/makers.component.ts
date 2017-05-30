import { Component, OnInit } from '@angular/core';
import { ViewService, MainService } from '../../d7services';
import { LoaderService } from '../shared/loader/loader.service';
import { ISorting } from '../../models/makers/sorting';
import * as globals from '../../d7services/globals';


@Component({
  selector: 'app-makers',
  templateUrl: './makers.component.html'
})
export class MakersComponent implements OnInit {

  makers=[];
  pages: number = 0;
  page_arg
  ActionName = "Newest";
  sort: ISorting = {
    sort_by: "created",
    sort_order: "DESC",
    pageNo: 0
  };
  makersCount;
  hideloadmore =false;
  constructor(
    private viewService: ViewService,
    private loaderService: LoaderService,
    private mainService: MainService,
  ) { }

  ngOnInit() {
    this.countAllMakers();
    this.getMakers();
  }
  countAllMakers(){
    this.mainService.post(globals.endpoint + '/maker_count_api/makers_count').subscribe(res => {
      this.makersCount = res['_body'].replace(']', '').replace('[', '');
    });
  }
  getMakers() {
    if (this.pages >= 0) {
      this.page_arg = ['page', this.pages];
    }
    this.loaderService.display(true);
    this.viewService.getView('makers', [['page', this.pages], ['sort_by', this.sort.sort_by], ['sort_order', this.sort.sort_order]]).subscribe(data=>{
      this.makers = this.makers.concat(data);
      this.loaderService.display(false);
    })
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

  mostRecent() {
    this.makers = [];
    this.pages = 0
    this.sort.sort_order = "DESC"
    this.sort.sort_by = "created"
    this.ActionName = "Newest"
    // this.getCountProject();
    this.getMakers();

  }

  sortAsc() {
    this.makers = [];
    this.pages = 0;
    this.sort.sort_order = "ASC";
    this.sort.sort_by = "field_first_name_value_1";
    this.ActionName = "Title A-Z"
    this.getMakers();
  }
  sortDesc() {
    this.makers = [];
    this.pages = 0
    this.sort.sort_order = "DESC";
    this.sort.sort_by = "field_first_name_value"
    this.ActionName = "Title Z-A"
    this.getMakers();

  }
  mostLiked() {
    this.makers = [];
    this.pages = 0
    this.sort.sort_order = "DESC";
    this.sort.sort_by = "php_2"
    this.ActionName = "Most likes"
    this.getMakers();

  }
  mostViewed() {
    this.makers = [];
    this.pages = 0
    this.sort.sort_order = "DESC";
    this.sort.sort_by = "php"
    this.ActionName = "Most viewes"
    this.getMakers();

  }
  mostProjects() {
    this.makers = [];
    this.pages = 0
    this.sort.sort_order = "DESC";
    this.sort.sort_by = "php_1"
    this.ActionName = "Most projects"
    this.getMakers();

  }

}
