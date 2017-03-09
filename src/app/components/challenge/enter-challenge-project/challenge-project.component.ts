import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';
import { RouterModule, Router } from '@angular/router';
import { FlagService } from '../../../d7services/flag/flag.service';
import { IChallenge} from '../../../models/challenge/challenge';
import { ActivatedRoute, Params } from '@angular/router';
import { IChallengeProject } from '../../../models/challenge/challengeProjects';
import { MainService } from '../../../d7services/main/main.service'; 
import * as globals from '../../../d7services/globals';
import {IChallengeStartDate,IChallengeData,IChallengeEndDate,IChallengeAnnouncementData} from '../../../models/challenge/challengeData';


@Component({
  selector: 'enter-challenges-project',
  templateUrl: './challenge-project.component.html',
  styleUrls:['./enter-challenge-style.css'],
})
export class ChallengeProjectComponent implements OnInit {
projects:IChallengeProject[];
selectedProject : number;
hiddenAfterSubmit : boolean =false;
userId: number;
 nid : number;
 challangeData: IChallengeData ={
title: "",
cover_image:"",
sponsored_by:"",
public_voting: 0,
body: "",
rules:"",
display_entries: 0,
nid: 0,
challenge_start_date :{
  value: "",
timezone: "",
timezone_db: "",
date_type: "",
},
challenge_end_date:{
  value: "",
timezone: "",
timezone_db: "",
date_type: "",
},
winners_announcement_date :{
  value: "",
timezone: "",
timezone_db: "",
date_type: "",
},
 };
 challangStartDate:IChallengeStartDate={
     value: "",
timezone: "",
timezone_db: "",
date_type: "",
 };
 constructor( private route: ActivatedRoute,
    private viewService: ViewService,
    private router: Router,
    private flagService:FlagService,private mainService : MainService
    ) { }
ngOnInit(){

this.nid = this.route.snapshot.params['nid'];
this.userId = parseInt(localStorage.getItem('user_id'));
console.log(this.userId);  

this.getAllProject();
this.getChallangeData();

}

getAllProject(){

  this.route.params
    .switchMap((nid) => this.viewService.getView('profile_projects_grid',[['uid',this.userId]]))
    .subscribe(data =>{
      this.projects=data;
      console.log(this.projects);
      
    });
}

getChallangeData(){

  this.route.params
    .switchMap((nid) => this.viewService.getView('challenge_data',[['nid',this.nid]]))
    .subscribe(data =>{
      this.challangeData=data;
      this.challangStartDate = this.challangeData.challenge_start_date;
      console.log(this.challangStartDate);
      
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

setDayLeft(){

}
}