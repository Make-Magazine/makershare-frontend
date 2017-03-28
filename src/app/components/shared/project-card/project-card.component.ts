import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  providers: [NgbTooltipConfig],
})
export class ProjectCardComponent implements OnInit {
  @Input() projectCard;
  @Input() navigationExtras:NavigationExtras;
  badges=[];
  constructor(private router: Router,
  private route: ActivatedRoute,
  private viewService: ViewService,
  private config: NgbTooltipConfig,
) {
    config.placement = 'bottom';
    config.triggers = 'hover';
 }
  nid;
  myid;
  ngOnInit() {
    this.myid = localStorage.getItem('user_id');
    this.getBadgesProject();
    //console.log(this.projectCard)
  }
  getBadgesProject(){
       // service to get profile card Badges
    this.viewService.getView('api-project-badges', [['nid',this.projectCard.nid]]).subscribe(data => {
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
    this.router.navigate(['/project/view', nid], this.navigationExtras);
   // console.log(nid)
  }
}
