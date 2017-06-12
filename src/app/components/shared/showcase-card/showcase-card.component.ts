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
    this.getMakersCount();
  }

  getShowcases() {
    this.viewService.getView('shared-showcase-card', [['nid', this.showcaseNid]]).subscribe(data => {

      this.showcase = data[0];
    });
  }
  getMakersCount() {
    this.viewService.getView('maker_count_showcases/' + this.showcaseNid).subscribe(data => {

      this.makersCount = data;
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
