import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ViewService } from '../../../d7services';

@Component({
  selector: 'app-learn-card',
  templateUrl: './learn-card.component.html',
})
export class LearnCardComponent implements OnInit {
learn=[];
countlessons;
@Input() workshopNid; 
@Input() front;
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
  WorkshopDetails(path) {
    this.router.navigate(['/learning', path]);
  }

    getCountlessons() {
      this.viewService.getView('maker_count_lessons/' + this.workshopNid)
      .subscribe(data => {
      this.countlessons = data[0];
    });
  }
}

