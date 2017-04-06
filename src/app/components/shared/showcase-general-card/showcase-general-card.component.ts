import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';

@Component({
  selector: 'app-showcase-gen-card',
  templateUrl: './showcase-general-card.component.html',
})
export class ShowcaseGeneralCardComponent implements OnInit {
  showcase = [];
  @Input() showcaseNid;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,

  ) { }
  ngOnInit() {
    this.getShowcases();
  }

  getShowcases() {
    this.viewService.getView('shared-showcase-card', [['nid', this.showcaseNid]]).subscribe(data => {
      this.showcase = data[0];
    });
  }
  ShowSingleShowcase(nid) {
    this.router.navigate(['/showcases', nid]);
  }


}
