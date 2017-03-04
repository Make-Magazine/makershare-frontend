import { Component, OnInit } from '@angular/core';
import { UserProfile } from "../../../../../models/profile/userprofile";
import { ProfileSocial } from "../../../../../models/profile/ProfileSocial";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from '../../../../../d7services/profile/profile.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentTab = 'basic';
  userProfile: UserProfile = {
    name:'testar',
    field_user_photo: '',
    field_bio: '',
    field_started_making: '',
    field_social_accounts: this.profileSocial,
    field_address: {}
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


  constructor(private profileService: ProfileService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  saveBasic(profile: UserProfile) {
    console.log(profile);
    for (var k in profile) {
      this.userProfile[k] = profile[k];
    }

  }

  saveOptional(profile: UserProfile) {
    for (var k in profile) {
      this.userProfile[k] = profile[k];
    }
  }

  saveProfile() {
    console.log(this.userProfile);
    this.profileService.createProfile(this.userProfile).subscribe(profile => {
      console.log("profile saved");
      console.log(profile);
    }, err => {
      console.log("error");
      console.log(err);
    });
  }

  saveNext() {
    this.saveProfile();
    this.currentTab = 'optional';
    $("#optional-info").click();
  }


}
