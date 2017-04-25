import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import {FlagService} from '../../../d7services/flag/flag.service';

@Component({
  selector: 'app-showcase-card',
  templateUrl: './showcase-card.component.html',
})
export class ShowcaseCardComponent implements OnInit {
  showcase = [];
  userId;
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
  }

  getShowcases() {
    this.viewService.getView('shared-showcase-card', [['nid', this.showcaseNid]]).subscribe(data => {
      this.showcase = data[0];
    });
  }
  ShowSingleShowcase(nid) {
    this.router.navigate(['/showcases', nid]);
  }

  countLikes(){
    this.flagService.flagCount(this.showcaseNid,'like').subscribe(res=>{
          if(res['count']>0){
      this.numLikes = res;
      }else{
         this.numLikes=0;
      }
    })
  }


}
