import { Component, OnInit } from '@angular/core';
import { SortBySortingSet, SortingSet } from 'app/CORE/models/makers';
import { LoaderService } from 'app/modules/shared/loader/loader.service';
import { ViewService } from 'app/CORE/d7services/view/view.service';
import { MainService } from 'app/CORE/d7services/main/main.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
})
export class CompaniesComponent implements OnInit {
  CurrentSortSet: SortingSet = {
    sort_by: 'random_seed',
    sort_order: 'DESC',
  };
  SortBy: SortBySortingSet = new SortBySortingSet(
    this.CurrentSortSet,
    this.viewService,
  );
  companies = [];
  companyFilter: string = 'All';
  pages: number = 0;
  countCompanies = 0;
  showloadmoreCompany = false;

  constructor(
    private loaderService: LoaderService,
    private viewService: ViewService,
    private mainService: MainService,
  ) {}

  ngOnInit() {
    this.getCountCompanies();
    this.getCompanies(false);
  }

  getCompanies(more?: boolean) {
    this.loaderService.display(true);
    if (more) {
      this.pages++;
    }
    this.SortBy
      .Sort('company_cards', this.pages, null, null, this.companyFilter)
      .subscribe(data => {
        this.companies = this.companies.concat(data);
        this.showloadmoreCompany = this.countCompanies > this.companies.length;
        this.loaderService.display(false);
      });
  }

  selectCompanyType(value) {
    this.companies = [];
    this.pages = 0;
    const body = { value: value };
    if (value == 'All') {
      this.getCountCompanies();
    } else {
      this.mainService
        .custompost(
          'company_profile_api/retrieve_count_of_companies_startup_or_non_profit',
          body,
        )
        .subscribe(res => {
          this.countCompanies = res;
        });
    }
    this.companyFilter = value;
    this.getCompanies(false);
  }

  /* function to get count companies */
  getCountCompanies() {
    this.mainService
      .custompost('company_profile_api/retrieve_count_of_companies')
      .subscribe(res => {
        this.countCompanies = res[0];
      });
  }

  sortCompanies(sort) {
    this.companies = [];
    this.pages = 0;
    if (sort == '_none') return;
    this.CurrentSortSet.sort_order = 'DESC';
    if (sort == 'created_1' || sort == 'title') {
      this.CurrentSortSet.sort_order = 'ASC';
    }
    this.CurrentSortSet.sort_by = sort;
    this.getCompanies(false);
  }
}
