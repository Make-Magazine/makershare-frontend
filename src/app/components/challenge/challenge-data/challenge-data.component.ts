import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
@Component({
  selector: 'app-challenge-data',
  templateUrl: './challenge-data.component.html',
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
projects=[];
hideloadmore=true;
pageNumber = 0;
projects_show;
projects_more;
challenge_start_date;

activeTab;
projectsData;
  constructor(  private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,) { }

  ngOnInit() {
   this.activeTab = 'summary';
   this.getChallengeData();
 

    //awards and prizes
    this.route.params
    .switchMap((nid) => this.viewService.getView('award_block',[['nid',nid['nid']]]))
    .subscribe(data =>{
      this.awards= data;
      console.log(this.awards);
      this.no_of_awards=data.length;
    });

    //challenge followers
    this.route.params
    .switchMap((nid) => this.viewService.getView('challenge_followers',[['nid',nid['nid']]]))
    .subscribe(data =>{
      this.no_of_followers=data.length;
    });
    
   
 this.getProjects();
 

  }

  changeChallangeTab(NewTab,e){
    e.preventDefault();
    this.activeTab = NewTab;
  }
  
    getChallengeData(){
         //challenge data
        this.route.params
    .switchMap((nid) => this.viewService.getView('challenge_data',[['nid',nid['nid']]]))
    .subscribe(data =>{
      this.challenge = data[0];
      console.log(this.challenge);
     //calculate days difference
      if(this.challenge){
         var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
         var todayDate = new Date();
         var endDate = new Date(this.challenge.challenge_end_date.value);
         var diffDays = Math.round(((endDate.getTime() - todayDate.getTime())/(oneDay)));
         if(diffDays >= 0){
           this.challenge.opened=true;
           this.challenge.diffDays=diffDays
         }else{
           this.challenge.opened=false;
         }
      }
      
      this.challenge.challenge_end_date=this.changeDateFormat(this.challenge.challenge_end_date.value);
      this.challenge.challenge_start_date=this.changeDateFormat(this.challenge.challenge_start_date.value);
      this.challenge.winners_announcement_date=this.changeDateFormat(this.challenge.winners_announcement_date.value);
    });
    }
    changeDateFormat(date){
      var d;
      d=new Date(date);
      var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      var month= monthNames[d.getMonth()];
      var fullYear=d.getFullYear();
      var day=d.getDate();
      var datestring = month+" "+day+","+" "+fullYear;
      return datestring;    
      }
    getProjects(){
       //challenge entries projects
       var sort: string;
    var page_arg = [];
     if(this.pageNumber >=0){
      page_arg = ['page', this.pageNumber];
    }
          this.route.params
    .switchMap((nid) => this.viewService.getView('challenge_entries',[['nid',nid['nid'],[page_arg]]]))
    .subscribe(data =>{
      this.projects=data;
      this.projectsData=data;
    this.projects_show=this.projects.slice(0, 1);
    this.projects_more=data.splice(2,data.length);
      this.entries_count=this.projects.length;

      console.log(data);
            this.loadMoreVisibilty();

    });
    }
   // get more click
  loadmore(){
    this.pageNumber++;
    this.getProjects();
  }
  // control load more button
  loadMoreVisibilty(){
    // get the challenges array count
    var ch_arr_count = this.projects.length;
    if(ch_arr_count > 1){
      this.hideloadmore = true;
    }else{
      this.hideloadmore = false;
    }
    
  }


  }


