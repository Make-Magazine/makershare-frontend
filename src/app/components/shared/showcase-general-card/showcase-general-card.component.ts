import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService,FlagService } from '../../../d7services';
@Component({
  selector: 'app-showcase-gen-card',
  templateUrl: './showcase-general-card.component.html',
})
export class ShowcaseGeneralCardComponent implements OnInit {
  showcase = [];
  numLikes;
  @Input() showcaseNid;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private flagService: FlagService,


  ) { }
  ngOnInit() {
    this.getShowcases();
    this.countLikes();
  }

  getShowcases() {
    this.viewService.getView('shared-showcase-card', [['nid', this.showcaseNid]]).subscribe(data => {
      this.showcase = data[0];
    });
  }
  ShowSingleShowcase(nid) {
    this.router.navigate(['/showcases', nid]);
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
