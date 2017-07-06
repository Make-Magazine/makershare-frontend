import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService,FlagService } from '../../../d7services';

@Component({
  selector: 'app-showcase-card',
  templateUrl: './showcase-card.component.html',
})
export class ShowcaseCardComponent implements OnInit {
  showcase;
  userId;
  makersCount;
  projectsCount;
  numLikes;
  Makers = [];
  Projects = [];
  contentType: number = 2;
    pageNumber = 0;
  @Input() showcaseNid;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private flagService: FlagService,

  ) { }
  ngOnInit() {
    this.getShowcase();
    this.getShowcases();
    this.userId = localStorage.getItem('user_id');
    this.countLikes();
    this.getMakersCount();
    this.getProjectsCount();
  }

  getShowcase() {
    this.viewService.getView('shared-showcase-card', [['nid', this.showcaseNid]]).subscribe(data => {

      this.showcase = data[0];
      console.log(this.showcase)
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
      console.log(this.projectsCount);
    });

  }
  ShowSingleShowcase() {
    this.router.navigate(['/showcases/', this.showcase['path']]);
  }

  countLikes() {
    this.flagService.flagCount(this.showcaseNid, 'like').subscribe(res => {
      if (res['count'] > 0) {
        this.numLikes = res;
      } else {
        this.numLikes = 0;
      }
    })
  }


}
