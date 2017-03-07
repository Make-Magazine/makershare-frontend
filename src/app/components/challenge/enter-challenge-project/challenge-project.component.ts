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
selectedProject : number;
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

updateSelectedProject(item:number){
  this.selectedProject = item;
 console.log(this.selectedProject);
}

onCancel(event: any){
console.log("cancel");
   this.router.navigate(['/challenges']);
}
onSubmit(event: any){
   this.viewService.add('maker_challenge_entry_api', {
                                 
                                  "type" : "challenge_entry",
                                   "field_entry_project" : "13",
                                  "field_entry_challenge" : "16"


                            }).then((status: any) => {
                                 if (status.success == false) {
                                    console.log("sucess")
                                 }else {
                                    console.log("fail");
                                 }
                            }); 

    console.log("submit project");
}

}