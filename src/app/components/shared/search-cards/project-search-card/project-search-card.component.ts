import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ViewService,FlagService,UserService } from '../../../../d7services';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project-search-card',
  templateUrl: './project-search-card.component.html',
  providers: [NgbTooltipConfig],
})
export class ProjectSearchCardComponent implements OnInit {
  @Input() nid;
  @Input() view = 'grid';
  badges = [];
  project = {};
  isLiked = false;
  userId;
  currentuser;
  checkUserLogin = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private viewService: ViewService,
    private config: NgbTooltipConfig,
    private userService: UserService,
    private flagService: FlagService,
  ) {
    config.placement = 'bottom';
    config.triggers = 'hover';
  }
  ngOnInit() {
    this.getProjectCard();
    this.getBadgesProject();
     this.userId = localStorage.getItem('user_id');
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data == false) { } else {
        /*like start */
        this.flagService.isFlagged(this.nid, this.userId, 'like').subscribe(data => {
          this.isLiked = data[0];
          // console.log(this.isLiked)
        }, err => {
          //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
          // console.log(err);
        })

        /*like end*/
      }//end else 
    });//end userservice isLogedIn
  }
  getProjectCard() {
    this.viewService.getView('api-project-card', [['nid', this.nid]]).subscribe(res => {
      this.project = res[0];
      this.viewService.getView('maker_count_all_projects/' + this.project['uid']).subscribe(data => {
        this.project['maker_project_count'] = data[0]
      })
    });
  }
  
  getBadgesProject() {
    this.viewService.getView('api-project-badges', [['nid', this.nid]]).subscribe(data => {
      for(let i=0; i<data.length && i<3; i++){
        this.badges.push(data[i])
      }
      // this.badges = data;

    });
  }
  challengePage(nid) {
    this.router.navigate(['challenges/', nid]);
  }
  ShowProjectDetails(path) {
    this.router.navigate(['/projects', path]
    );
  }
    getProfile() {
    if (this.project['uid']) {
      this.userService.getUrlFromId(this.project['uid']).subscribe(res => {
        this.router.navigate(['/portfolio/' + res.url]);
      });
    }
  }
}