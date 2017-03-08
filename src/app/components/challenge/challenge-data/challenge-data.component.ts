import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { Router,RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { ISorting } from '../../../models/challenge/sorting';
import { FlagService } from '../../../d7services/flag/flag.service';
import { UserService } from '../../../d7services/user/user.service';

import 'rxjs/Rx';
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
countProjects=0;
no_of_awards;
no_of_followers;
entries_count;
awards_data;
projects=[];
hideloadmore=true;
hideloadmoreproject=false;
hideloadmorefollower=false;
pageNumber = 0;
loadProject;
projects_show;
projects_more;
challenge_start_date;
followers=[];
isFollowed=false;
isBookmarked=false;
Flags = ['follow'];
FlagStates = [];
ButtonFollow:string;
currentuser;
hideButton=false;
activeTab;
projectsData;
sortData:ISorting;
sort_order:string;
sort_by:string;

@Input() sortType:ISorting;
@Input() pageNo:number;
  constructor( private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService
    ) { }

        ngOnInit() {
          
          this.getCountProject();
          this.activeTab = 'summary';
          this.getChallengeData();
          this.sort_order = "DESC";
          this.sort_by = "created";
          //awards and prizes
          this.route.params
          .switchMap((nid) => this.viewService.getView('award_block',[['nid',nid['nid']]]))
          .subscribe(data =>{
            this.awards= data;
            this.no_of_awards=data.length;
          });


        
          this.getChallengeFollowers();
          this.getProjects();
          this.getCurrentUser();
          this.userService.getStatus().subscribe(data => {
          this.currentuser = data;
          //console.log(this.currentuser.user.uid);
          this.flagService.isFlagged(this.route.params['value'].nid,this.currentuser.user.uid,'follow').subscribe(data =>{
          this.isFollowed = data[0];
          
          /* initialize Button Follow*/
          if(this.isFollowed==false){/* start if  */
            this.ButtonFollow='Follow';
          }else{
                console.log("return false");
                  this.ButtonFollow='UnFollow';
              }/* end else if  */
            })
              /*bookmark start */
          this.flagService.isFlagged(this.route.params['value'].nid,this.currentuser.user.uid,'node_bookmark').subscribe(data =>{
          this.isBookmarked = data[0];
          })
              /*bookmark end*/
          }); 


        }

/* function get challenge followers */
      getChallengeFollowers(){
    //this.getPageNumberFollowers(event);//
    //challenge followers
      this.route.params
      .switchMap((nid) => this.viewService.getView('challenge_followers',[['nid',nid['nid']],['page',this.pageNo]]))
      .subscribe(data =>{
        this.followers=this.followers.concat(data);
        if(this.followers[0]['follow_counter'] == this.followers.length){
          console.log("end follow")
            this.hideloadmorefollower = true;
        }
        this.no_of_followers=this.followers[0]['follow_counter'];
      });
      }
  /* function get current user */
  getCurrentUser(){
      this.userService.getStatus().subscribe(data => {
      this.currentuser = data;
    });
  }
  /* end function get user*/

  /* function follow challenge*/
    followThis(e: Event){
      this.getCurrentUser();
      e.preventDefault();
      if(this.isFollowed){
        this.flagService.unflag(this.challenge.nid,this.currentuser.user.uid,'follow').subscribe(response => {
          this.isFollowed = false;
          this.ButtonFollow='Follow';
        });
      }else {
        this.flagService.flag(this.challenge.nid,this.currentuser.user.uid,'follow').subscribe(response => {
          this.isFollowed = true;
          this.ButtonFollow='UnFollow';
        });

      }
    
   }
       /* end function follow challenge*/ 

       /* function bookmark challenge*/
    bookmarkThis(e: Event){
      this.getCurrentUser();
      e.preventDefault();
      if(this.isBookmarked){
        this.flagService.unflag(this.challenge.nid,this.currentuser.user.uid,'node_bookmark').subscribe(response => {
          this.isBookmarked = false;
        });
      }else {
        this.flagService.flag(this.challenge.nid,this.currentuser.user.uid,'node_bookmark').subscribe(response => {
          this.isBookmarked = true;
        });
      }
   }
    /* end function bookmark challenge*/ 
    
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
     if(this.challenge['status_id'] == '375'){
       this.hideButton=true;
     }
     else{
       this.hideButton=false;
      }
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
      /*cheack display_entries */
      //challenge entries projects
      var sort: string;
      var page_arg = [];
      if(this.pageNo >=0){
      page_arg = ['page',this.pageNo];
    }
    this.route.params
    .switchMap((nid) => this.viewService.getView('challenge_entries',[['nid',nid['nid']],['page',this.pageNo],['sort_by',this.sort_by],['sort_order',this.sort_order]]))
    .subscribe( data =>{
      this.projects=this.projects.concat(data);
        this.loadMoreVisibilty();
      });
    }
       
        // Function to control load more button
        loadMoreVisibilty(){
          // get the challenges array count
         this.getCountProject();
         
          if(this.countProjects-1 == this.projects.length){
           
            this.hideloadmoreproject = true;
          }
        }
        /* END FUNCTION loadMoreVisibilty */
        /* function to sort project apply action */
      getSortType(event:any){
            this.sortData = event;
            this.sort_by=this.sortData.sort_by;
            this.sort_order = this.sortData.sort_order;
            this.projects=[];
            this.getProjects();
      }
      /* end function sort */

      /* function to initialize page arg for loadmore for projects to send to api  */
      getPageNumber(event:any){
        this.pageNo = event
        this.getProjects();
      }
      /* end function PN Projetcs */

      /* function to initialize page arg for loadmore for followers to send to api  */
      getPageNumberFollowers(event:any){
        this.pageNo = event
        console.log(this.pageNo);
       this.getChallengeFollowers();
     }
     /* end function PN Followers */

      /* function to get count projects in challenge */
        getCountProject(){
          var nid;
          var nid = this.route.snapshot.params['nid'];
          this.route.params
            .switchMap((nid) => this.viewService.getView('maker_count_project_challenge_api/'+nid['nid']))
            .subscribe(data =>{
              this.countProjects=data[0];
             console.log(this.countProjects);
            });
 }
        /*end function count project in challenge*/

      enterToChallengeProject(nid){
           console.log("enter to project"+ nid);
              this.router.navigate(['/enter-challenge',nid]);

        }
}


