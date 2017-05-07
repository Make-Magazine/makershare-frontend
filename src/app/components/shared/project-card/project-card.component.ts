import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  providers: [NgbTooltipConfig],
})
export class ProjectCardComponent implements OnInit {
  @Input() nid;
  @Input() view: string;
  @Input() front;

  badges = [];
  project = {};
  userId;
  smallWindow: number;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private viewService: ViewService,
    private config: NgbTooltipConfig,
  ) {
    config.placement = 'bottom';
    config.triggers = 'hover';
  }
  ngOnInit() {
    this.getProjectCard();
    this.getBadgesProject();
    this.userId = parseInt(localStorage.getItem('user_id'));
    this.smallWindow = window.innerWidth;
    
    window.onresize = (e) => {
        this.smallWindow = window.innerWidth;
    }
  }
  getProjectCard() {
    this.viewService.getView('api-project-card', [['nid', this.nid]]).subscribe(res => {
      var categories_string = res[0].project_categories;
      categories_string = categories_string.substring(0, categories_string.length - 2);
      var categories_array = categories_string.split(', ');
      res[0].project_categories = categories_array;
      var membership_string = res[0].field_team_members;
      membership_string = membership_string.substring(0, membership_string.length - 1);
      var membership_array = membership_string.split(',');
      res[0].field_team_members = membership_array;

      var membership_uid_string = res[0].field_maker_memberships_uid;
      membership_uid_string = membership_uid_string.substring(0, membership_uid_string.length - 1);
      var membership_uid_array = membership_uid_string.split(',');
      res[0].field_maker_memberships_uid = membership_uid_array;


      this.project = res[0];
      this.viewService.getView('maker_count_all_projects/' + this.project['uid']).subscribe(data => {
        this.project['maker_project_count'] = data[0];
      });
    });
  }

  getBadgesProject() {
    this.viewService.getView('api-project-badges', [['nid', this.nid]]).subscribe(data => {
      for (let i = 0; i < data.length && i < 4; i++) {
        this.badges.push(data[i]);
      }
    });
  }
  challengePage(nid) {
    this.router.navigate(['challenges/', nid]);
  }
  ShowProjectDetails(nid) {
    this.router.navigate(['/project/view/', nid]);
  }
  userProfile(fName, lName) {
    var name = fName + '-' + lName;
    this.router.navigate(['/portfolio/', name]);
  }

  goToProfile(path: string) {
    this.router.navigate(['portfolio/', path]);
  }
}