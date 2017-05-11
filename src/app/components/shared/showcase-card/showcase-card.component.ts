import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService,FlagService } from '../../../d7services';

@Component({
  selector: 'app-showcase-card',
  templateUrl: './showcase-card.component.html',
})
export class ShowcaseCardComponent implements OnInit {
  showcase = [];
  userId;
  projectsCount;
  numLikes;
  @Input() showcaseNid;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private flagService: FlagService,

  ) { }
  ngOnInit() {
    this.getShowcases();
    this.userId = localStorage.getItem('user_id');
    this.countLikes();
    this.getProjectsCount();
  }

  getShowcases() {
    this.viewService.getView('shared-showcase-card', [['nid', this.showcaseNid]]).subscribe(data => {
     console.log(data[0])
      this.showcase = data[0];
    });
  }
  getProjectsCount() {
    this.viewService.getView('showcase_projects_nid', [['nid', this.showcaseNid]]).subscribe(data => {

      this.projectsCount = data.length;
    //  console.log(data.length);
    });

  }
  ShowSingleShowcase(path) {
    this.router.navigate(['/showcases/', path]);
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
