import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';
import { RouterModule, Router } from '@angular/router';
import { FlagService } from '../../../d7services/flag/flag.service';
import { IChallenge} from '../../../models/challenge/challenge';
import { ActivatedRoute, Params } from '@angular/router';
import { IChallengeProject } from '../../../models/challenge/challengeProjects';
import { MainService } from '../../../d7services/main/main.service'; 
import * as globals from '../../../d7services/globals';

@Component({
  selector: 'enter-challenges-project',
  templateUrl: './challenge-project.component.html',
  styleUrls:['./enter-challenge-style.css'],
})
export class ChallengeProjectComponent implements OnInit {
projects:IChallengeProject[];
selectedProject : number;
hiddenAfterSubmit : boolean =false;
userId: string;
userName: string;
 nid : number;
 constructor( private route: ActivatedRoute,
    private viewService: ViewService,
    private router: Router,
    private flagService:FlagService,private mainService : MainService
    ) { }
ngOnInit(){

this.nid = this.route.snapshot.params['nid'];


this.userId = localStorage.getItem('user_id');
this.userName = localStorage.getItem('user_name');
console.log(this.userId);
console.log(this.userName);
this.getAllProject();
}

getAllProject(){

  this.route.params
    .switchMap((nid) => this.viewService.getView('profile_projects_grid',[['uid',this.userId],['uid1',this.userName]]))
    .subscribe(data =>{
      this.projects=data;
      console.log(this.projects);
      
    });
}

updateSelectedProject(item:number){
  console.log(item);
  this.selectedProject = item;

 console.log(this.selectedProject);
}

onCancel(event: any){
console.log("cancel");
   this.router.navigate(['/challenges']);
}
onSubmit(event: any){
  
  var body = {
    "type" : "challenge_entry",
    "field_entry_project" : this.selectedProject,
    "field_entry_challenge" : this.nid,    
  };


   this.viewService.add('maker_challenge_entry_api', body)                    
                            .then((status: any) => {
                                 if (status.success == false) {
                                    alert("fail to submit");
                                    console.log("fail");
                                  //  this.router.navigate(['/challenges']);
                                 }else {
                                   this.hiddenAfterSubmit = true;
                                 }
                            }); 

  // this.mainService.post(globals.endpoint + '/maker_challenge_entry_api', body).subscribe(res => {
  //   console.log(res);
  // }, err => {
  //   console.log(err);
  // }); 

    console.log("submit project");
}

onMyEntries(){
  console.log("my entries");
}

createNewProjectForChallenge(){
  this.router.navigate(['/project/create']);
}
}