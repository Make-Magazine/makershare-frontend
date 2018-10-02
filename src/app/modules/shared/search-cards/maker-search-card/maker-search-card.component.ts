import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ViewService } from '../../../../core/d7services';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-maker-search-card',
  templateUrl: './maker-search-card.component.html',
  providers: [NgbTooltipConfig],

})
export class MakerSearchCardComponent implements OnInit {

  @Input() uid;
  badgesLarge = [];
  badgesSmall = [];
  project = {};
  card;
  projectsCount;
  latestPorjectImg;
  swtichImage:boolean = false;
  constructor(private router: Router,
    private viewService: ViewService,
    private config: NgbTooltipConfig,
  ) {
    this.config.placement = 'bottom';
    this.config.triggers = 'hover';
  }
  ngOnInit() {
    this.getMakerCard();
    this.getMakerBadges();
    this.CountMakerProjects()
    this.getLatestProject();
  }
  getMakerCard() {
    this.viewService.getView('maker_card_data', [['uid', this.uid]]).subscribe(data => {
      this.card = data[0];

    });
  }

  getMakerBadges() {
    this.viewService.getView('api_user_badges', [['uid', this.uid]]).subscribe(data => {
      this.badgesLarge= data;
      for (let i = 0; i < data.length && i < 3; i++) {
        this.badgesSmall.push(data[i])
      }
    });
  }

  CountMakerProjects() {
    this.viewService.getView('maker_count_all_projects/' + this.uid).subscribe(data => {
      this.projectsCount = data[0]
    })
  }
  goToProfile(path: string) {
    this.router.navigate(['/portfolio/', path]);
  }
  getLatestProject() {
    this.viewService.getView('maker_latest_project', [['uid', this.uid]]).subscribe(data => {
      if (data[0]) {
        this.latestPorjectImg = data[0].latest_project_cover_photo;
      }
    });
  }
  over() {
    if(this.latestPorjectImg)
    this.swtichImage=true;
  }
  leave() {
    if(this.latestPorjectImg)    
    this.swtichImage=false;  
  }
}
