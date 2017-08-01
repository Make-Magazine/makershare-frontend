import { Component, OnInit } from '@angular/core';
import { ViewService, MainService } from '../../d7services';
import { SortBySortingSet, SortingSet } from '../../models';
import * as globals from '../../d7services/globals';
import { LoaderService } from '../shared/loader/loader.service';

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
  companies = [];
  comapnyFilter = "All";
  pages: number = 0;
  countCompanies = 0;
  showloadmoreCompany = false;
  constructor(
    private loaderService: LoaderService,
    private viewService: ViewService,
    private mainService: MainService) { }
  ngOnInit() {
    this.getCountCompanies();
    this.getCompanies(false);
  }
  getCompanies(more?: boolean) {
    this.loaderService.display(true);
    if (more) this.pages++;
    this.SortBy.Sort('company_cards', this.pages, null, this.comapnyFilter).subscribe(data => {
      this.companies = this.companies.concat(data);
      this.showloadmoreCompany = (this.countCompanies <= this.companies.length) ? false : true;
      this.loaderService.display(false);
    });
  }
  selectCompanyType(value) {
    this.companies = [];
    this.pages = 0;
    let body = { "value": value };
    if (value == 'All') { this.getCountCompanies() } else {
      this.mainService.post(globals.endpoint + '/company_profile_api/retrieve_count_of_companies_startup_or_non_profit', body).map(res => res.json()).subscribe(res => {
        this.countCompanies = res;
      });
    }
    this.comapnyFilter = value;
    this.getCompanies(false);
  }
  /* function to get count companies */
  getCountCompanies() {
    this.mainService.post(globals.endpoint + '/company_profile_api/retrieve_count_of_companies').map(res => res.json()).subscribe(res => {
      this.countCompanies = res[0];
    });
  }
  sortCompanies(sort) {
    this.companies = [];
    this.pages = 0;
    if (sort == '_none') return;
    this.CurrentSortSet.sort_order = "DESC";
    if (sort == 'created_1' || sort == 'title') {
      this.CurrentSortSet.sort_order = "ASC";
    }
    this.CurrentSortSet.sort_by = sort;
    this.getCompanies(false);
  }
}
