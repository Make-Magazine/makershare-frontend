import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ViewService } from '../../../d7services';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { Auth } from '../../../auth0/auth.service';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
   providers: [NgbTooltipConfig],
})
export class CompanyCardComponent implements OnInit {

   @Input() cardData;
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
  }


}
