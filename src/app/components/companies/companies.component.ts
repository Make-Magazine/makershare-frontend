import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../d7services';
import { SortBySortingSet, SortingSet } from '../../models';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',

})
export class CompaniesComponent implements OnInit {
  CurrentSortSet: SortingSet = {
    sort_by: "php_1",
    sort_order: "DESC",
  };
  SortBy: SortBySortingSet = new SortBySortingSet(this.CurrentSortSet, this.viewService);
companies;

  constructor(
    private viewService: ViewService,
    //  private mainService: MainService,
  ) { }

  ngOnInit() {
  this.getCompanies();
  }
       getCompanies() {
     this.viewService.getView('company_cards').subscribe((data) => {
      this.companies = data;
      console.log(this.companies)

    });
     }

}
