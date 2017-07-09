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
  userId;
  makers;
  @Input() showcaseNid;
  @Input() state;
  projectsCount;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private flagService: FlagService,


  ) { }
  ngOnInit() {
    this.userId = localStorage.getItem('user_id');

    this.getShowcases();
    this.getProjectsCount();
    this.countLikes();
    this.getShowcaseMakers();
  }

  getShowcases() {
    this.viewService.getView('shared-showcase-card', [['nid', this.showcaseNid]]).subscribe(data => {
      this.showcase = data[0];
      // console.log(data);
    });
  }
  getShowcaseMakers() {
    this.viewService.getView('showcase_makers', [
      ['page', 0],
      ['nid', this.showcaseNid],
      ['sort_by', 'created'],
      ['sort_order', 'ASC']
      ]).subscribe(data => {
          this.makers = data;
          // console.log('data here we go?');
          // console.log(data);
    });
  }
  getProjectsCount() {
    this.viewService.getView('showcase_projects_nid', [['nid', this.showcaseNid]]).subscribe(data => {

      this.projectsCount = data.length;
      // console.log('projects count');
      // console.log(data);
    });

  }
  ShowSingleShowcase(path) {
    this.router.navigate(['/showcases/', path]);
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
