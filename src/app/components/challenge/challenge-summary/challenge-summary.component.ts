import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-challenge-summary',
  templateUrl: './challenge-summary.component.html',
  
})
export class ChallengeSummaryComponent implements OnInit {

  constructor(private viewService: ViewService, private route: ActivatedRoute,
   private router: Router) { }

  ngOnInit() {
    this.route.params
     .switchMap((nid) => this.viewService.getView('challenge_data'))
    .subscribe(data=>{
console.log(data);  
      
     });

  }

}


 
   
  


