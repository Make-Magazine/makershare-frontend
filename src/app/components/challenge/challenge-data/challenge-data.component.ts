import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
@Component({
  selector: 'app-challenge-data',
  templateUrl: './challenge-data.component.html',
  styleUrls: ['./challenge-data.component.css']
})
export class ChallengeDataComponent implements OnInit {
challenge;
dates;
str;
submission_open;
submission_close;
winners_announced;
awards;
no_of_awards;
no_of_followers;
entries_count;
awards_data;
projects;

  constructor(  private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,) { }

  ngOnInit() {
      //challenge data
        this.route.params
    .switchMap((nid) => this.viewService.getView('challenge_data',[['nid',nid['nid']]]))
    .subscribe(data =>{
      this.challenge = data[0];
      console.log(data);
      this.submission_open="Project submissions open:"+this.challenge.challenge_start_date;
      this.submission_close="Project submissions close:"+this.challenge.challenge_end_date;
      this.winners_announced="Winners announced by:"+this.challenge.wiinners_announcement_date;
 
     
          this.dates = this.challenge.challenge_status + "Submissions close " +this.challenge.challenge_end_date;

    });
 

    //awards and prizes
    this.route.params
    .switchMap((nid) => this.viewService.getView('award_block',[['nid',nid['nid']]]))
    .subscribe(data =>{
      this.awards= data;
      //console.log(data);
      this.no_of_awards=data.length;
    });

    //challenge followers
    this.route.params
    .switchMap((nid) => this.viewService.getView('challenge_followers',[['nid',nid['nid']]]))
    .subscribe(data =>{
      this.no_of_followers=data.length;
    });
    
    //challenge entries projects
     this.route.params
    .switchMap((nid) => this.viewService.getView('challenge_entries',[['nid',nid['nid']]]))
    .subscribe(data =>{
      this.projects=data;
      this.entries_count=this.projects.length;

      console.log(data);
    });
 

  }
  award_data(index){
    console.log('test');  
     //this.awards_data= this.awards[index].no_of_winners+"available,Cash value:"+this.awards[index].cash[0]['Amount']['#markup']+this.awards.cash[0]['Currency']['#markup'];
 //return this.awards_data;
   }
  }


