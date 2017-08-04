import { Component, OnInit } from '@angular/core';
import { ViewService, MainService } from 'app/CORE/d7services';
import { ActivatedRoute, Router } from '@angular/router';
import { NodeService } from 'app/CORE/d7services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-orgs',
  templateUrl: './orgs.component.html'
})
export class OrgsComponent implements OnInit {
  company;
  nid;
  path;
  followers = [];
  allFollwers = [];
  followersCount: number;
  page: number = 0;
  current_active_tab:string = 'about-us';
  showloadmoreFollowers = false;
  closeResult: string;
  team = [];
  constructor(
    private viewService: ViewService,
    private mainService: MainService,
    private route: ActivatedRoute,
    private nodeService: NodeService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.path = this.route.snapshot.params['path'];
    if (this.path) {
      this.nodeService.getIdFromUrl(this.path, 'company_profile').subscribe(id => {
        this.nid = id[0];
        if (this.nid) {
          this.viewService.getView('company_profile_api/' + this.nid).subscribe(data => {
            this.company = data;
            // console.log(this.company)
            // console.log(this.nid)
            if (this.company) {
              this.team = this.company['field_maker_memberships'];
            }
          });
          this.getLimitedFollowers();
          this.getAllFollowers(false);
        } else {
          this.router.navigate(['**']);
        }
      })
    }
  }

  getLimitedFollowers() {
    let body = {
      "nid": this.nid,
    };
    this.mainService.custompost('company_profile_api/retrieve_count_of_company_followers', body).subscribe(res => {
      this.followers = res['followers'];
      this.followersCount = res['count_all'];
    });
  }
  getAllFollowers(more?:boolean) {
    if(more) this.page++;
    this.viewService.getView('company_followers', [['page', this.page], ['nid', this.nid]]).subscribe(data => {
      this.allFollwers = this.allFollwers.concat(data);
      this.showloadmoreFollowers = (this.followersCount <= this.allFollwers.length)? false:true;
    });
  }
  open(content) {
    this.modalService.open(content, { size: 'sm' }).result.then((result) => {
      this.closeResult = 'Closed with: ${result}';
    }, (reason) => {
      this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
    });
  }
}
