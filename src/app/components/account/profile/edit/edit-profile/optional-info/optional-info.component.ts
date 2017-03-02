import { Component, OnInit,Input } from '@angular/core';
import { UserProfile } from "../../../../../../models/profile/userprofile";

@Component({
  selector: 'app-optional-info',
  templateUrl: './optional-info.component.html',
  styleUrls: ['./optional-info.component.css']
})
export class OptionalInfoComponent implements OnInit {

 @Input() profile:UserProfile={} 
  constructor() { }

  ngOnInit() {
  }

}
