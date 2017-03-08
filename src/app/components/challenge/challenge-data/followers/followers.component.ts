import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {ISorting} from '../../../../models/challenge/sorting';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  
})
export class FollowersComponent implements OnInit {
@Input() followers;
@Input() challenge;
@Input() hideloadmorefollower;
@Output() pageNumber = new EventEmitter<number>();

challengeNid;
pagesFollower:number = 0;
sort:ISorting={
  sort_by : "",
  sort_order:"",
  pageNo:0
};
  constructor() { }

  ngOnInit() {
  }

  /*loadmorefollowers(){
this.challengeNid=this.challenge.nid
console.log("test nid");
  console.log(this.challengeNid);    
}
*/
loadMoreFollower(){
   this.pagesFollower++;
    this.pageNumber.emit(this.pagesFollower);
}

}
