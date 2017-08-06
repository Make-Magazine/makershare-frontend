import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { MainService, ViewService } from 'app/CORE/d7services';
import { Auth } from 'app/modules/auth0/auth.service';

@Component({
  selector: 'app-maker-card',
  templateUrl: './maker-card.component.html',
  providers: [NgbTooltipConfig],
})
export class MakerCardComponent implements OnInit {
  @Input() uid;
  @Input() state;
  @Input() profile;
  @Input() showFlag: boolean = true;
  @Input() cardData; // Input 'cardData' contain all maker data it's work on makers component only for test now
  @Output() Featured = new EventEmitter<number>();

  badges = [];
  project = {};
  card;
  projectsCount;
  latestPorjectImg;
  swtichImage: boolean = false;
  Manager: boolean = false;

  constructor(
    private router: Router,
    private viewService: ViewService,
    private config: NgbTooltipConfig,
    public auth: Auth,
    private mainService: MainService,
  ) {
    this.config.placement = 'bottom';
    this.config.triggers = 'hover';
  }

  ngOnInit() {
    this.Manager = this.auth.IsCommuintyManager();
    this.getMakerCard();
    this.getMakerBadges();
    this.CountMakerProjects();
    this.getLatestProject();
  }

  getMakerCard() {
    this.viewService
      .getView('maker_card_data', [['uid', this.uid]])
      .subscribe(data => {
        this.card = data[0];
      });
  }

  getMakerBadges() {
    const body = { uid: this.uid };
    this.mainService
      .custompost('maker_count_api/retrieve_badge_image', body)
      .subscribe(res => {
        this.badges = res;
      });
  }

  CountMakerProjects() {
    this.viewService
      .getView('maker_count_all_projects/' + this.uid)
      .subscribe(data => {
        this.projectsCount = data[0];
      });
  }

  getLatestProject() {
    // this.latestPorjectImg=null;
    this.viewService
      .getView('maker_latest_project', [['uid', this.uid]])
      .subscribe(data => {
        if (data[0]) {
          this.latestPorjectImg = data[0].latest_project_cover_photo;
        }
      });
  }

  goToProfile(path: string) {
    this.router.navigate(['/portfolio/', path]);
  }

  over() {
    if (this.latestPorjectImg) {
      this.swtichImage = true;
    }
  }

  leave() {
    if (this.latestPorjectImg) {
      this.swtichImage = false;
    }
  }

  emitFeatured() {
    this.Featured.emit();
  }
}