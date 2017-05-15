import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService, FlagService } from '../../../d7services';
@Component({
  selector: 'app-showcase-gen-card',
  templateUrl: './showcase-general-card.component.html',
})
export class ShowcaseGeneralCardComponent implements OnInit {
  showcase = [];
  numLikes;
  @Input() showcaseNid;
  projectsCount;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private flagService: FlagService,


  ) { }
  ngOnInit() {
    this.getShowcases();
    this.getProjectsCount();
    this.countLikes();
  }

  getShowcases() {
    this.viewService.getView('shared-showcase-card', [['nid', this.showcaseNid]]).subscribe(data => {
      this.showcase = data[0];
    });
  }
  getProjectsCount() {
    this.viewService.getView('showcase_projects_nid', [['nid', this.showcaseNid]]).subscribe(data => {

      this.projectsCount = data.length;
    });

  }
  ShowSingleShowcase(path) {
    this.router.navigate(['/makers/', path]);
  }

  countLikes() {
    this.flagService.flagCount(this.showcaseNid, 'like').subscribe(res => {
      if (res['count'] > 0) {
        this.numLikes = res['count'];
      } else {
        this.numLikes = 0;
      }

    })
  }
}
