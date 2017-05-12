import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-user-card-small',
  templateUrl: './user-card-small.component.html',
   providers: [NgbTooltipConfig],
})
export class UserCardSmallComponent implements OnInit {
closeResult: string;
  projectCount = {};
  projectCount2 = {};
  active = true;
  userId;
  user;
  hideMessage = false;
  
  @Input('anonymosname') anonymosname;


  @Input('uid') uid;
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
    if(this.anonymosname){
      return;
    }
     this.getMakerCard();
    this.getMakerBadges();
    this.CountMakerProjects()
  }

  getMakerCard() {
    this.viewService.getView('maker_card_data', [['uid', this.uid]]).subscribe(data => {
      this.card = data[0];
      // console.log(this.card);
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
  // userProfile(fName, lName) {
  //   var name = fName + '-' + lName;
  //   this.router.navigate(['/portfolio/', name]);
  // }
}
