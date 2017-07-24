import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../d7services/view/view.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-orgs',
  templateUrl: './orgs.component.html'
})
export class OrgsComponent implements OnInit {

  company;
  link;
  trustedLink

  constructor(
    private viewService: ViewService,
     private sanitizer:DomSanitizer,
  ) { }

  ngOnInit() {
    this.getCompanyProfile()
  }
  getCompanyProfile() {
    this.viewService.getView('company_profile_api/2376').subscribe(data => {
      this.company = data;
      if(this.company.company_description){
      let link = this.company.company_description;
      this.trustedLink = this.sanitizer.bypassSecurityTrustHtml(link);
      console.log(this.company)
    }
    })
  }
}
