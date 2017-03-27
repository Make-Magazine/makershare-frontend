import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent implements OnInit {
  @Input() projectCard;
  badges=[];
  constructor(private router: Router, private route: ActivatedRoute,     private viewService: ViewService,
) { }
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
    this.router.navigate(['/project/view', nid]);
   // console.log(nid)
  }
}
