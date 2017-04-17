import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';

@Component({
  selector: 'app-learn-card',
  templateUrl: './learn-card.component.html',
})
export class LearnCardComponent implements OnInit {
learn=[];
@Input() workshopNid; 
@Input() front;
 constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,

  ){ }
  ngOnInit() {
    this.getWorkshop();
  }
   getWorkshop(){
        this.viewService.getView('shared-learn-card',[['nid',this.workshopNid]]).subscribe(data => {
     this.learn = data[0];
     console.log(this.learn);
  });
}
  WorkshopDetails(nid) {
    this.router.navigate(['/workshops', nid]);
  }
}
