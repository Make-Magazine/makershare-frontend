import { Component, OnInit, ViewChild } from '@angular/core';
import { UserProfile } from "../../../../../models/profile/userprofile";
import { ProfileSocial } from "../../../../../models/profile/ProfileSocial";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from '../../../../../d7services/profile/profile.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BasicInfoComponent } from './basic-info/basic-info.component';
declare var $: any;
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  basicForm: FormGroup;

  @ViewChild(BasicInfoComponent)
  private basicComponent: BasicInfoComponent;

  currentTab = 'basic';
  userProfile: UserProfile = {
    name: 'testar',
    user_photo: '',
    bio: '',
    started_making: '',
    field_social_accounts: this.profileSocial,
    address: {},
    pass:"MOcs56"
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
    this.profileService.getUser(1).subscribe(res => {

      this.userProfile = res;

    }, err => {

    });
  }

  saveBasic(basic: FormGroup) {

    let profile: UserProfile = basic.value;
    this.basicForm = basic;
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
    this.profileService.updateProfile(1, this.userProfile).subscribe(profile => {
      console.log("profile saved");
      console.log(profile);
    }, err => {
      console.log("error");
      console.log(err);
    });

  }

  saveNext(event: Event) {
    if (this.basicForm.valid) {
      this.saveProfile();
      this.currentTab = 'optional';
      $("#optional-info").click();
    } else {
      this.basicComponent.onValueChanged("save");
      var answer = confirm("Warning: Should fill all basic info first or profile info won't be saved.\n Still want to go to optional?");
             if (!answer) {
                event.preventDefault();
            } else{
              this.currentTab = 'optional';
              $("#optional-info").click();
            }
    }
  }


}
