import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent implements OnInit {
  @Input() nid;
  badges=[];
  project={};
  constructor(private router: Router, private route: ActivatedRoute,     private viewService: ViewService,
) { }

  myid;
  ngOnInit() {
    this.getProjectCard();
    this.getBadgesProject();
    //console.log(this.projectCard)
  }
  getProjectCard(){
      this.viewService.getView('api-project-card', [['nid', this.nid]]).subscribe( res=> {
      this.project = res[0];
      console.log(this.project);
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
    this.router.navigate(['/project/view', nid]);
   // console.log(nid)
  }
}
