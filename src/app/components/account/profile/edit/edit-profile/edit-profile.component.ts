import { Component, OnInit } from '@angular/core';
import { UserProfile } from "../../../../../models/profile/userprofile";
import { ProfileSocial } from "../../../../../models/profile/ProfileSocial";


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  currentTab = 'basic';
   userProfile: UserProfile ={
    field_user_photo: '',
    field_bio: '',
    field_started_making: '',
    field_social_accounts: this.profileSocial,     
   };

  profileSocial: ProfileSocial = {
      field_website_or_blog: '',
      field_additional_site: '',
      field_facebook: '',
      field_instagram: '',
      field_linkedin: '',
      field_twitter: '',
      field_pinterest: '',
      field_youtube: '',
      field_hackster_io: '',
      field_instructables: '',
      field_hackday: ''
  };


  constructor() { }

  ngOnInit() {
  }

}
