import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService, FlagService } from '../../../d7services';
import { Auth } from '../../../auth0/auth.service';

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
  showcaseType: string = 'Makers';
  pageNumber = 0;
  Manager: boolean = false;

  @Input() showcaseNid;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private flagService: FlagService,
    public auth: Auth,


  ) { }
  ngOnInit() {
    this.auth.IsCommuintyManager();
    this.Manager = this.auth.IsCommuintyManager();
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
    });
  }
  getShowcases() {
    this.viewService.getView('showcase', [['nid', this.showcaseNid]])
      .subscribe(data => {
        this.contentType = data[0]['showcase_type'];
        if (this.contentType == 1) {
          this.getProjectsCount();
          this.showcaseType = 'Projects';
        } else if (this.contentType == 2) {
          this.getMakersCount();
          this.showcaseType = 'Makers';
        }
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
    this.router.navigate(['showcases', path]);
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
