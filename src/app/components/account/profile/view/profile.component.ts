import { Component, EventEmitter, Input, OnInit, Output, Renderer, ViewChild } from '@angular/core';
import { UserProfile } from "../../../../models/profile/userprofile";
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileSocial } from "../../../../models/profile/ProfileSocial";
import { ProfileService } from '../../../../d7services/profile/profile.service';
import { UserService } from '../../../../d7services/user/user.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2FileDropAcceptedFile, Ng2FileDropRejectedFile }  from 'ng2-file-drop';
import { CropperSettings } from 'ng2-img-cropper';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
 
  userId = localStorage.getItem('user_id');
  // cover declarations
  cropperSettings: CropperSettings;
  coverPhotoSrc: string;
  coverPhotoAttached: boolean = false;
  CoverImageData:any;
  public rendrer:Renderer;
  //end of cover declarations
  allMarkersNames: any[] = [];
  allMarkersUrl: any[] = [];
  allIntersets: any[] = [];

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
    field_add_your_makerspace_s_: [{}],
    pass:"MOcs56",
  };
  profile: UserProfile = {
    name: 'testar',
    user_photo: '',
    bio: '',
    started_making: '',
    field_social_accounts: {},
    address: {},
    pass:"MOcs56",
  };
  constructor(
   private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router,
   private userService: UserService,
  ) { 
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth =100;
    this.cropperSettings.croppedHeight = 100;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.minWidth = 100;
    this.cropperSettings.minHeight = 100;

    this.cropperSettings.rounded = false;

    this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
    this.cropperSettings.noFileInput = true;
    this.CoverImageData = {};
  }

  ngOnInit() {
    let userId = localStorage.getItem('user_id');
    this.userService.getUser(userId).subscribe(res => {
      this.profile = res;
      this.profile.pass = "MOcs56";
      console.log(res);
    }, err => {

    });

     this.profileService.getAllMarkers().subscribe(markers => {
      for (let i = 0; i < markers.length; i++) {
        this.allMarkersNames.push(markers[i].makerspace_name);
        this.allMarkersUrl.push(markers[i].makerspace_url);
      }
    }, err => {
      console.log(err);
    });

    this.profileService.getAllInterests().subscribe(allIntersets => {
      this.allIntersets = allIntersets;
    }, err => {
      console.log(err);
    });

    this.BuildForm();
  }// end of OnInit 

  BuildForm(){
    this.optionalForm = this.fb.group({
      'name': [''],
      'city': [''],
      'state': [''],
    });
  }

  saveInfo() {
    // this.optionalForm.value;
    this.profile.nickname = this.info.nickname;
    this.saveProfile();
  }

  onSelected(intrest) {
    this.profile.maker_interests.push(intrest.name);
  }
  saveIntersets() {
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
    this.profileService.updateProfile(this.userId, this.profile).subscribe(profile => {
      
    }, err => {
      console.log(err);
    });
  }
  onValueChanged(data?: any) {

  }
  initMakerspace() {

  }

  onFileChange(event: Event) {      console.log("profile saved");
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

  editprofile() {
    this.router.navigate(['profile/editprofile',]);
  }
  // cover section

  loadImg(event: Event){
    $("#upload").click();
  }

  fileChangeListener(file:File,cropper) {
    this.CoverImageData = {};
    var image:any = new Image();
    var myReader:FileReader = new FileReader();
    myReader.onloadend = function (loadEvent:any) {
        image.src = loadEvent.target.result;
        cropper.setImage(image);
    };

    myReader.readAsDataURL(file);
}

    private dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile,cropper) {
      this.fileChangeListener(acceptedFile.file,cropper)
    }

  saveCropped(){
    this.profile.profile_cover = this.CoverImageData.image;
    this.saveProfile();
  }
}
