import { Component, OnInit } from '@angular/core';
import { UserProfile } from "../../../../../models/profile/userprofile";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

   userProfile: UserProfile ={
     
   };
  constructor() { }

  ngOnInit() {
  }

}
