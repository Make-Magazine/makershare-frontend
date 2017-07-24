import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../d7services/view/view.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NodeService } from '../../d7services';


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

  constructor(
    private viewService: ViewService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private nodeService: NodeService,
    private router: Router
  ) { }

  ngOnInit() {

    this.path = this.route.snapshot.params['path'];
    if (this.path) {
      this.nodeService.getIdFromUrl(this.path, 'company_profile').subscribe(id => {
        this.nid = id[0];
        if (this.nid) {
          this.viewService.getView('company_profile_api/' + this.nid).subscribe(data => {
            this.company = data;
            console.log(this.company)
            if (this.company.company_description) {
              let link = this.company.company_description;
              this.trustedLink = this.sanitizer.bypassSecurityTrustHtml(link);
            }
          });
        } else {
          this.router.navigate(['**']);
        }
      })
    }
  }
}
