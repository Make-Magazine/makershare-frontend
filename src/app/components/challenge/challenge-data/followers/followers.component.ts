import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  
})
export class FollowersComponent implements OnInit {
@Input() followers;
@Input() challenge;
challengeNid;
  constructor() { }

  ngOnInit() {
  }

  loadmorefollowers(){
this.challengeNid=this.challenge.nid
console.log("test nid");
  console.log(this.challengeNid);    
  }

}
