import { Component, OnInit } from '@angular/core';
import { ViewService, MainService } from '../../CORE/d7services';
import { SortBySortingSet, SortingSet } from '../../CORE';
import * as globals from '../../CORE/d7services/globals';
import { LoaderService } from '../shared/loader/loader.service';
import { NotificationBarService, NotificationType } from 'ngx-notification-bar/release';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',

})
export class CompaniesComponent implements OnInit {

  CurrentSortSet: SortingSet = {
    sort_by: "random_seed",
    sort_order: "DESC",
  };
  SortBy: SortBySortingSet = new SortBySortingSet(this.CurrentSortSet, this.viewService);
  companies;
  comapnyFilter = "All";
  pages: number = 0;
  countCompanies = 0;
  showloadmoreCompany = false;

  constructor(
    private loaderService: LoaderService,
    private notificationBarService: NotificationBarService,
    private viewService: ViewService,
    private mainService: MainService) { }

  ngOnInit() {
    this.getCountCompanies();
    this.getCompanies();
  }
  getCompanies() {
    this.loaderService.display(true);
    if (this.pages == 0) {
      this.companies = [];
    }
    this.SortBy.Sort('company_cards', this.pages, null, this.comapnyFilter).subscribe(data => {
      this.companies = this.companies.concat(data);
      console.log(this.companies);
      this.loadMoreVisibilty();
      if (this.companies.length == 0) {
        this.notificationBarService.create({ message: "There aren't any projects yet for this topic. Go make one!", type: NotificationType.Error, allowClose: false, autoHide: true, hideOnHover: false });
      }
      this.loaderService.display(false);
    });
  }

  selectCompanyType(value) {
    // console.log(value);
    let body = {
      "value": value,
    };
    this.mainService.post(globals.endpoint + '/company_profile_api/retrieve_count_of_companies_startup_or_non_profit', body).map(res => res.json()).subscribe(res => {
      this.countCompanies = res;
    }, err => {
      // this.notificationBarService.create({ message: "Sorry, but your project doesn't meet the challenge requirements, Please check <a id='rules-id' href='#rules' data-nodeId='" + this.nid + "'>Rules & Instructions </a>", type: NotificationType.Error, allowClose: true, autoHide: false, hideOnHover: false, isHtml: true });
    });
    if (value == 'All') {
      this.getCountCompanies();
    }
    this.comapnyFilter = value;
    this.getCompanies();

  }
  /* function to get count companies */
  getCountCompanies() {
    this.mainService.post(globals.endpoint + '/company_profile_api/retrieve_count_of_companies').map(res => res.json()).subscribe(res => {
      this.countCompanies = res[0];
     // console.log(this.countCompanies);
    }, err => {
      // this.notificationBarService.create({ message: "Sorry, but your project doesn't meet the challenge requirements, Please check <a id='rules-id' href='#rules' data-nodeId='" + this.nid + "'>Rules & Instructions </a>", type: NotificationType.Error, allowClose: true, autoHide: false, hideOnHover: false, isHtml: true });
    });
  }

  sortCompanies(sort) {
    if (sort == '_none') return;
    //this.pages = 0;
    this.CurrentSortSet.sort_order = "DESC";
    if (sort == 'created_1' || sort == 'title') {
      this.CurrentSortSet.sort_order = "ASC";
    }
    this.CurrentSortSet.sort_by = sort;
    //this.getCountProject();
    this.getCompanies();
  }
  loadMoreCompany() {
    this.pages++;
    this.getCompanies();
  }
  loadMoreVisibilty() {
    if (this.countCompanies <= this.companies.length) {
      this.showloadmoreCompany = false;
    } else if (this.countCompanies > this.companies.length) {
      this.showloadmoreCompany = true;
    }
  }
}
