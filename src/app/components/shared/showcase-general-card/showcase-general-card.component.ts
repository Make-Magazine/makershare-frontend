import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ViewService, FlagService } from '../../../CORE/d7services';
import { Auth } from '../../../auth0/auth.service';

@Component({
  selector: 'app-showcase-gen-card',
  templateUrl: './showcase-general-card.component.html',
})
export class ShowcaseGeneralCardComponent implements OnInit {
  showcase = [];
  numLikes = 0;
  userId;
  makers = [];
  Manager: boolean = false;
  @Input() showcaseNid;
  @Input() state;
  @Output() Featured = new EventEmitter<boolean>();
  projectsCount = 0;
  constructor(
    private router: Router,
    private viewService: ViewService,
    private flagService: FlagService,
    public auth: Auth,
  ) { }
  
  ngOnInit() {
    this.Manager = this.auth.IsCommuintyManager();
    this.userId = localStorage.getItem('user_id');

    this.getShowcases();
    this.getProjectsCount();
    this.countLikes();
    this.getShowcaseMakers();
  }

  getShowcases() {
    this.viewService.getView('shared-showcase-card', [['nid', this.showcaseNid]]).subscribe(data => {
      this.showcase = data[0];
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
    });
  }
  getProjectsCount() {
    this.viewService.getView('showcase_projects_nid', [['nid', this.showcaseNid]]).subscribe(data => {

      this.projectsCount = data.length;

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
  emitFeatured(){
  this.Featured.emit()
  }
}
