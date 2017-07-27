import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { Auth } from '../../../auth0/auth.service';
import { ViewService } from '../../../d7services';
import { UserService } from '../../../d7services/user/user.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  providers: [NgbTooltipConfig],
})
export class ProjectCardComponent implements OnInit {
  @Input() nid;
  @Input() view: string = 'grid';
  @Input() front;
  @Input() state;
  @Input() clickAction: Function = null;
  @Output() Featured = new EventEmitter<boolean>();

  badges = [];
  project = {};
  userId;
  smallWindow: number;
  Manager: boolean = false;

  constructor(
    private router: Router,
    private viewService: ViewService,
    private config: NgbTooltipConfig,
    private userService: UserService,
    public auth: Auth,
  ) {
    this.config.placement = 'bottom';
    this.config.triggers = 'hover';
  }

  ngOnInit() {
    this.auth.IsCommuintyManager();
    this.Manager = this.auth.IsCommuintyManager();

    this.getProjectCard();
    this.getBadgesProject();
    this.userId = +localStorage.getItem('user_id');
    this.smallWindow = window.innerWidth;

    window.onresize = e => {
      this.smallWindow = window.innerWidth;
    };
  }

  getProjectCard() {
    this.viewService
      .getView('api-project-card', [['nid', this.nid]])
      .subscribe(res => {
        let categories_string = res[0].project_categories;
        categories_string = categories_string.substring(
          0,
          categories_string.length - 2,
        );
        const categories_array = categories_string.split(', ');
        res[0].project_categories = categories_array;
        let membership_string = res[0].field_team_members;
        membership_string = membership_string.substring(
          0,
          membership_string.length - 1,
        );
        const membership_array = membership_string.split(',');
        res[0].field_team_members = membership_array;

        let membership_uid_string = res[0].field_maker_memberships_uid;
        membership_uid_string = membership_uid_string.substring(
          0,
          membership_uid_string.length - 1,
        );
        const membership_uid_array = membership_uid_string.split(',');
        res[0].field_maker_memberships_uid = membership_uid_array;

        this.project = res[0];
        this.viewService
          .getView('maker_count_all_projects/' + this.project['uid'])
          .subscribe(data => {
            this.project['maker_project_count'] = data[0];
          });

        this.userService.getUrlFromId(this.project['uid']).subscribe(res => {
          this.project['maker_url'] = '/portfolio/' + res.url;
        });
      });
  }

  getBadgesProject() {
    this.viewService
      .getView('api-project-badges', [['nid', this.nid]])
      .subscribe(data => {
        for (let i = 0; i < data.length && i < 4; i++) {
          this.badges.push(data[i]);
        }
      });
  }

  @HostListener('click') clickItem() {

    console.log('click full project');

    if (this.clickAction != null) {
      this.clickAction();
    }
  }

  challengePage(nid) {
    this.router.navigate(['challenges/', nid]);
  }

  ShowProjectDetails(path) {
    this.router.navigate(['/projects/', path]);
  }

  userProfile(fName, lName) {
    this.router.navigate(['/portfolio/', `${fName} + '-' + ${lName}`]);
  }

  goToProfile(path: string) {
    this.router.navigate(['portfolio/', path]);
  }

  getProfile() {
    // if (this.project['uid']) {
    // }
  }

  emitFeatured() {
    this.Featured.emit();
  }
}
