import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../d7services/view/view.service';

@Component({
  selector: 'app-orgs',
  templateUrl: './orgs.component.html'
})
export class OrgsComponent implements OnInit {

  company;

  constructor(
    private viewService: ViewService,
  ) { }

  ngOnInit() {
    this.getCompanyProfile()
  }
  getCompanyProfile() {
    this.viewService.getView('company_profile_api/2376').subscribe(data => {
      this.company = data;
      console.log(this.company)
    })
  }
}
