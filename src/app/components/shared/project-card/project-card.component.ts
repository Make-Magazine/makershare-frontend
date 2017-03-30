import { Component, OnInit, Input } from '@angular/core';
<<<<<<< HEAD
import { NavigationExtras, Router, ActivatedRoute, Params } from '@angular/router';
=======
import { Router, ActivatedRoute, Params } from '@angular/router';
>>>>>>> a0bcd5d70fcd34dc3e6293b7e069d3676db694e1
import { ViewService } from '../../../d7services/view/view.service';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  providers: [NgbTooltipConfig],
})
export class ProjectCardComponent implements OnInit {
  @Input() nid;
  @Input() view;
  badges=[];
  project={};
  
  constructor(private router: Router,
  private route: ActivatedRoute,
  private viewService: ViewService,
  private config: NgbTooltipConfig,
) {
    config.placement = 'right';
    config.triggers = 'hover';
 }
  ngOnInit() {
    this.getProjectCard();
    this.getBadgesProject();
  }
  getProjectCard(){
      this.viewService.getView('api-project-card', [['nid', this.nid]]).subscribe( res=> {
      this.project = res[0];
    }, err => {
    });
    
  }
  getBadgesProject(){
       // service to get profile card Badges
    this.viewService.getView('api-project-badges', [['nid',this.nid]]).subscribe(data => {
      this.badges = data;
    }, err => {
      // notification error  in service 
  //    this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error });
    });
  }
  challengePage(nid) {
    //console.log(nid);
    this.router.navigate(['challenges/', nid]);
  }
  ShowProjectDetails(nid) {
    this.router.navigate(['/project/view', nid]
    // , this.navigationExtras
    );
   // console.log(nid)
  }
}