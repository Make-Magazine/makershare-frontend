import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../../d7services/view/view.service';

@Component({
  selector: 'app-learn-search-card',
  templateUrl: './learn-search-card.component.html',
})
export class LearnSearchCardComponent implements OnInit {
learn=[];
countlessons;
@Input() workshopNid; 
 constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,

  ){ }
  ngOnInit() {
    this.getWorkshop();
  }
   getWorkshop(){
        this.viewService.getView('shared-learn-card',[['nid',this.workshopNid]]).subscribe(data => {
      this.getCountlessons();
     this.learn = data[0];
     console.log (this.learn);
  });
}
  WorkshopDetails(nid) {
    this.router.navigate(['/workshops', nid]);
  }

  getCountlessons() {
      this.viewService.getView('maker_count_lessons/' + this.workshopNid)
      .subscribe(data => {
      this.countlessons = data[0];
    });
  }

}
