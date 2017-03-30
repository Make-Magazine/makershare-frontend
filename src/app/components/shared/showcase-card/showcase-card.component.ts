import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';

@Component({
  selector: 'app-showcase-card',
  templateUrl: './showcase-card.component.html',
})
export class ShowcaseCardComponent implements OnInit {
showcase=[];  
 @Input() showcaseNid;
   constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,

  ){ }
  ngOnInit() {
    this.getShowcases();
  }
    getShowcases(){
        this.viewService.getView('shared-showcase-card',[['nid',this.showcaseNid]]).subscribe(data => {
     this.showcase = data[0];
     console.log(this.showcase);
  });
}
  ShowSingleShowcase(nid){
     this.router.navigate(['/showcases', nid]);
  }


}
