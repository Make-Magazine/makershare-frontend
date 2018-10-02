import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ViewService } from '../../../../core/d7services';

@Component({
  selector: 'app-learn-search-card',
  templateUrl: './learn-search-card.component.html',
})
export class LearnSearchCardComponent implements OnInit {
learn;
countlessons;
@Input() workshopNid; 
 constructor(
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
