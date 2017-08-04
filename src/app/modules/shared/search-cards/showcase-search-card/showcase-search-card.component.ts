import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ViewService, FlagService, UserService } from '../../../../CORE/d7services';

@Component({
  selector: 'app-showcase-search-card',
  templateUrl: './showcase-search-card.component.html',
})
export class ShowcaeSearchCardComponent implements OnInit {
  showcase;
  isLiked = false;
  userId;
  currentuser;
  projectsCount;
  checkUserLogin = false;
  makersCount;
  numLikes;
  Makers = [];
  Projects = [];
  contentType: number = 2;
  pageNumber = 0;
  @Input() showcaseNid;
  constructor(
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService,
  ) { }
  ngOnInit() {
    this.getShowcase();
    this.getShowcases();
    this.getProjectsCount();
    this.userId = localStorage.getItem('user_id');
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data == false) { } else {
        /*like start */
        this.flagService.isFlagged(this.showcaseNid, this.userId, 'like').subscribe(data => {
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

  getShowcase() {
    this.viewService.getView('shared-showcase-card', [['nid', this.showcaseNid]]).subscribe(data => {
      this.showcase = data[0];
    });
  }
    getShowcases() {
    // load the showcase data
    this.viewService.getView('showcase', [['nid', this.showcaseNid]])
      .subscribe(data => {
        this.showcase = data[0];
        this.contentType = this.showcase['showcase_type'];
        //this.customDescription = this.showcase['description']
        //this.meta.setTitle(`${this.showcase['showcase_name']} | Maker Share`);
        //this.meta.setTag('og:image', this.showcase['cover_photo']);
        //this.meta.setTag('og:description', this.showcase['description']);

        // get showcase related content according to contentType value
        
        if(this.contentType == 1){
          // this case for projects
          this.getProjectsCount();
        }else if(this.contentType == 2) {
          // this case for makers
          this.getMakersCount();
        }


        // statistics, record page view hit for visitors
        // if (this.LoggedInUserID != this.showcase['uid']) {
        //     this.statisticsService.view_record(this.showcaseNid, 'node').subscribe();
        // }

      });
  }
  getMakersCount() {
    this.viewService.getView('maker_count_showcases/' + this.showcaseNid).subscribe(data => {

      this.makersCount = data;
    });

  }
  getProjectsCount() {
    this.viewService.getView('showcase_project_count/', [['nid', this.showcaseNid]]).subscribe(data => {

      this.projectsCount = data[0].project_count;
    });

  }
  ShowSingleShowcase(path) {
    this.router.navigate(['/showcases', path]);
  }


}
