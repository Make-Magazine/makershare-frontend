import { Component, OnInit } from '@angular/core';
import { ViewService, MainService } from '../../d7services';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NodeService } from '../../d7services';
import * as globals from '../../d7services/globals';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-orgs',
  templateUrl: './orgs.component.html'
})
export class OrgsComponent implements OnInit {

  company;
  link;
  trustedLink;
  nid;
  path;
  followers = [];
  allFollwers = [];
  followersCount: number;
  folow
  current_active_tab;

  closeResult: string;

  team = [];


  constructor(
    private viewService: ViewService,
    private mainService: MainService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private nodeService: NodeService,
    private router: Router,
    private modalService: NgbModal,

  ) { }

  ngOnInit() {
    this.current_active_tab = 'about-us';
    this.path = this.route.snapshot.params['path'];
    if (this.path) {
      this.nodeService.getIdFromUrl(this.path, 'company_profile').subscribe(id => {
        this.nid = id[0];
        if (this.nid) {
          this.viewService.getView('company_profile_api/' + this.nid).subscribe(data => {
            this.company = data;
            this.team = this.company['field_maker_memberships'];
            // console.log(this.company)
            if (this.company.company_description) {
              let link = this.company.company_description;
              this.trustedLink = this.sanitizer.bypassSecurityTrustHtml(link);
            }
          });
          this.getLimitedFollowers();
          this.getAllFollowers();
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

    this.mainService.post(globals.endpoint + '/company_profile_api/retrieve_count_of_company_followers', body).map(res => res.json()).subscribe(res => {

      this.followers = res['followers'];
      this.followersCount = res['count_all'];
      console.log(this.followersCount);


    }, err => {
      // this.notificationBarService.create({ message: "Sorry, but your project doesn't meet the challenge requirements, Please check <a id='rules-id' href='#rules' data-nodeId='" + this.nid + "'>Rules & Instructions </a>", type: NotificationType.Error, allowClose: true, autoHide: false, hideOnHover: false, isHtml: true });
    });
  }
  getAllFollowers() {
    this.viewService.getView('company_followers', [['nid', this.nid]]).subscribe(data => {
      this.allFollwers = this.allFollwers.concat(data);
      console.log(this.allFollwers)
      // this.loadMoreVisibilty();
    }, err => {

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
