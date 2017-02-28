import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent implements OnInit {
  challenges = [];
  challengescounter = [];
  pageNumber = 0;
  allstatuses = [];
  statusesCount = {};
  currentStatusName = 'All';
  currentStatusId = 0;
  hideloadmore = true;
  currentCount = 0;
  constructor(private viewService: ViewService) { }

  ngOnInit() {
    this.currentCount = 0;
    this.challengesCount();
    this.getStatuses();
    this.getChallenges();
    
  }

  getChallenges(){
    var status_arg = [];
    var page_arg = [];
   if(this.currentStatusId != 0){
      status_arg = ['status', this.currentStatusId];
      this.currentCount = this.statusesCount[this.currentStatusId];
    }else{
      this.currentCount = this.statusesCount['0'];
    }
    if(this.pageNumber >=0){
      page_arg = ['page', this.pageNumber];
    }
     this.viewService.getView('challenges',[status_arg, page_arg]).subscribe(data => {
      this.challenges = this.challenges.concat(data);
      this.loadMoreVisibilty();
    });
  }

  // get more click
  loadmore(){
    this.pageNumber++;
    this.getChallenges();
  }

  // Get challenges status to render them in the component
  getStatuses(){
    this.viewService.getView('maker_taxonomy_category/14').subscribe(data => {
      let arr = [];
      for(let key in data){
       if(data.hasOwnProperty(key)){
         arr.push(data[key]);
       }
      }
      console.log(arr);
      arr.unshift({"tid": 0, "name": "All"});
      this.allstatuses = arr;
    }, err => {

    });
  }

  // get the count of challenges per status
  challengesCount() {
    this.statusesCount = {
      0: 6,
      376: 1,
      1107: 1,
      1108: 0,
      375: 4,
    }
  }

  // click function on status
   SetCurrentStatus(event){
    if(this.currentStatusId != event.target.id){
      this.challenges = [];
    }
    this.currentStatusName = event.target.name;
    this.currentStatusId = event.target.id;
    this.getChallenges();
  }

  // control load more button
  loadMoreVisibilty(){
    // get the challenges array count
    var ch_arr_count = this.challenges.length;
    if(this.statusesCount[this.currentStatusId] > ch_arr_count){
      this.hideloadmore = true;
    }else{
      this.hideloadmore = false;
    }
    
  }
  
}
