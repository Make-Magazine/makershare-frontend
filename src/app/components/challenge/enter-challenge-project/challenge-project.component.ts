import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';
import { RouterModule, Router } from '@angular/router';
import { FlagService } from '../../../d7services/flag/flag.service';
import{IChallenge} from '../../../models/challenge/challenge';
import {ActivatedRoute, Params } from '@angular/router';
import {IChallengeProject} from '../../../models/challenge/challengeProjects';
@Component({
  selector: 'enter-challenges-project',
  templateUrl: './challenge-project.component.html',
  styleUrls:['./enter-challenge-style.css'],
})
export class ChallengeProjectComponent implements OnInit {
projects:IChallengeProject[];
selectedProject : IChallengeProject;
 nid : number;
 constructor( private route: ActivatedRoute,
    private viewService: ViewService,
    private router: Router,
    private flagService:FlagService,
    ) { }
ngOnInit(){

this.nid = this.route.snapshot.params['nid'];

this.getAllProject();
}

getAllProject(){

  this.route.params
    .switchMap((nid) => this.viewService.getView('profile_projects_grid',[['nid',this.nid['nid']]]))
    .subscribe(data =>{
      this.projects=data;
      console.log(this.projects);
      
    });
}

updateSelectedProject(event:any){
  console.log(event.target.id);
  this.selectedProject = event;
console.log(this.selectedProject);
}

onCancel(event: any){
console.log("cancel");
}
onSubmit(event: any){
  console.log("submit project");
}

}