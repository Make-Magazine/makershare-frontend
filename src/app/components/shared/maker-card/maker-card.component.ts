import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-maker-card',
  templateUrl: './maker-card.component.html',
  providers: [NgbTooltipConfig],

})
export class MakerCardComponent implements OnInit {

  @Input() uid;
  badges = [];
  project = {};
  card;
  projectsCount;
  latestPorjectImg;
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
    this.CountMakerProjects();
    this.getLatestProject();
    // this.ProfileLikes();
  }
  getMakerCard() {
    this.viewService.getView('maker_card_data', [['uid', this.uid]]).subscribe(data => {
      this.card = data[0];
      console.log(this.card)
    });
  }

  getMakerBadges() {
    this.viewService.getView('api_user_badges', [['uid', this.uid]]).subscribe(data => {
      for (let i = 0; i < data.length && i < 2; i++) {
        this.badges.push(data[i])
      }
    });
  }

  CountMakerProjects() {
    this.viewService.getView('maker_count_all_projects/' + this.uid).subscribe(data => {
      this.projectsCount = data[0]
    })
  }
  getLatestProject() {
    this.viewService.getView('maker_latest_project', [['uid', this.uid]]).subscribe(data => {
      if (data[0]) {
        this.latestPorjectImg = data[0].latest_project_cover_photo;
      }
    });
  }
  goToProfile(path: string) {
    
    this.router.navigate(['/portfolio/', path]);
  }
  // ProfileLikes(){
  //   this.viewService.getView('/maker_count_api/' + this.uid).subscribe(data=>{
  //     console.log(data);
  //   })
  // }
}
