import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserProfile } from "../../../../../models/profile/userprofile";
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileSocial } from "../../../../../models/profile/ProfileSocial";
import { ProfileService } from '../../../../../d7services/profile/profile.service';


@Component({
  selector: 'app-all-profile',
  templateUrl: './all-profile.component.html'
})
export class AllProfileComponent implements OnInit {

  allMarkersNames: any[] = [];
  allMarkersUrl: any[] = [];
  items: any[] = [];
  optionalForm: FormGroup;
  imageSrc: string = "http://placehold.it/100x100";

  info: UserProfile = {
    name: 'testar',
    user_photo: '',
    bio: '',
    started_making: '',
    field_social_accounts: {},
    address: {},
    field_add_your_makerspace_s_: [{}]
  };
  profile: UserProfile = {
    name: 'testar',
    user_photo: '',
    bio: '',
    started_making: '',
    field_social_accounts: {},
    address: {}
  };



  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
    this.profileService.getUser(1).subscribe(res => {

      this.profile = res;
      this.info = res;
      console.log(this.info);

      this.profileService.getByCountry(this.info.address.country).subscribe(info => {
        for (var k in info.administrative_areas) {
          this.items.push(info.administrative_areas[k]);
        }
      }, err => {
        console.log("error");
        console.log(err);
      });
    }, err => {

    });
  }


  buildForm(): void {

  }

  saveInfo() {
    this.profile.nickname = this.info.nickname;
    this.saveProfile();
  }

  saveBio() {
    this.profile.bio = this.info.bio;
    this.saveProfile();
  }

  saveSocial() {
    this.profile.field_social_accounts = this.info.field_social_accounts;
    this.saveProfile();
  }
  saveMarkerspaces() {
    this.profile.field_add_your_makerspace_s_ = this.info.field_add_your_makerspace_s_;
    this.saveProfile();
  }
  saveProfile() {
    this.profileService.updateProfile(1,this.profile).subscribe(profile => {
      console.log("profile saved");
      console.log(profile);
    }, err => {
      console.log("error");
      console.log(err);
    });
  }
  onValueChanged(data?: any) {


  }
  initMakerspace() {

  }

  onFileChange(event: Event) {
    let file = (<any>event.target).files[0];
    if (!file) {
      return;
    }


    let reader = new FileReader();
    reader.onload = (e) => {
      this.imageSrc = this.profile.user_photo = reader.result;
      //  this.optionalForm.controls['field_user_photo'].value = reader.result;
    };
    reader.readAsDataURL(file);
  }
  addMakerspace() {
    this.info.field_add_your_makerspace_s_.push({});
  }


}
