import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { ViewService } from '../../../core/d7services';
import { Auth } from '../../auth0/auth.service';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  providers: [NgbTooltipConfig],
})
export class CompanyCardComponent implements OnInit {

  @Input() cardData;
  @Input() state;
  badges;

  card;
  constructor(public router: Router,
    public viewService: ViewService,
    public config: NgbTooltipConfig,
    public auth: Auth,
  ) {
    this.config.placement = 'bottom';
    this.config.triggers = 'hover';
  }

  ngOnInit() {
    this.getCompanyBadge();
  }
  goToProfile(path: string) {
    this.router.navigate(['/portfolio/', path]);
  }
  getCompanyBadge() {
    this.viewService
      .getView('org-badge', [['nid', this.cardData.nid]])
      .subscribe(data => {
        if (data) {
          this.badges = data;
        }
      });
  }

}
