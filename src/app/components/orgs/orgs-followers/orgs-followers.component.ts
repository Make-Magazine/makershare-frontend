import { Component, OnInit,Input } from '@angular/core';
import { ViewService , MainService } from '../../../d7services';
import * as globals from '../../../d7services/globals';

@Component({
  selector: 'app-orgs-followers',
  templateUrl: './orgs-followers.component.html',
})
export class OrgsFollowersComponent implements OnInit {
  followers=[];
  page:number = 0;
  showloadmoreFollowers = false;
  countFollowers;
  @Input() company_nid;
  constructor(private viewService: ViewService,private mainService: MainService) { }

  ngOnInit() {
  this.getCountCompanies();
    this.getFollowers();

  }

   /* function to get Company Followers */
  getFollowers() {
    this.viewService.getView('company_followers', [['nid', this.company_nid]]).subscribe(data => {
    this.followers = this.followers.concat(data);
      this.loadMoreVisibilty();
    }, err => {

    });
  }
  /* end Followers function */
   /* function to get count Followers */
  getCountCompanies() {
     let body = {
      "nid": this.company_nid,
    };
    this.mainService.post(globals.endpoint + '/company_profile_api/retrieve_count_of_company_followers',body).map(res => res.json()).subscribe(res => {
      this.countFollowers = res[0];
      console.log(res)
    }, err => {
      // this.notificationBarService.create({ message: "Sorry, but your project doesn't meet the challenge requirements, Please check <a id='rules-id' href='#rules' data-nodeId='" + this.nid + "'>Rules & Instructions </a>", type: NotificationType.Error, allowClose: true, autoHide: false, hideOnHover: false, isHtml: true });
    });
  }
    loadMoreFollowers() {
    this.page++;
    this.getFollowers();
  }
  loadMoreVisibilty() {
    if (this.countFollowers <= this.followers.length) {
      this.showloadmoreFollowers = false;
    } else if (this.countFollowers > this.followers.length) {
      this.showloadmoreFollowers = true;
    }
  }

}
