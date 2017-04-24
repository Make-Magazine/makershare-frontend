import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../../d7services/view/view.service';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-maker-search-card',
  templateUrl: './maker-search-card.component.html',
  providers: [NgbTooltipConfig],

})
export class MakerSearchCardComponent implements OnInit {

 @Input() uid;
  badges = [];
  project = {};
  card;
  projectsCount;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private viewService: ViewService,
    private config: NgbTooltipConfig,
  ) {
    config.placement = 'bottom';
    config.triggers = 'hover';
  }
  ngOnInit() {
    this.getMakerCard();
    this.getMakerBadges();
    this.CountMakerProjects()
  }
  getMakerCard() {
    this.viewService.getView('maker_card_data', [['uid', this.uid]]).subscribe(data => {
      this.card = data[0];
    });
  }
  
  getMakerBadges() {
    this.viewService.getView('api_user_badges_card', [['uid', this.uid]]).subscribe(data => {
      this.badges = data;
    });
  }
  CountMakerProjects() {
    this.viewService.getView('maker_count_all_projects/' + this.uid).subscribe(data => {
        this.projectsCount = data[0]
      })
  }

}
