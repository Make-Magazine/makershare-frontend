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
import { Ng2FileDropAcceptedFile, Ng2FileDropRejectedFile } from 'ng2-file-drop';
import { CropperSettings } from 'ng2-img-cropper';
import { SharedButtonsComponent } from '../../../shared/shared-buttons/shared-buttons.component';
import { ViewService } from '../../../../d7services/view/view.service';
import { FileEntity } from '../../../../models';
import { domain } from '../../../../d7services/example.globals';
import { NodeHelper } from '../../../../models';
import { FileService } from '../../../../d7services/file/file.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

 ckEditorConfig: {} = {
    "toolbarGroups": [
          { "name": "document", "groups": [ "mode", "document", "doctools" ] },
          { "name": 'clipboard',   "groups": [ 'clipboard', 'undo' ] },
          { "name": "editing", "groups": [ "find", "selection", "spellchecker", "editing" ] },
          { "name": "forms", "groups": [ "forms" ] },
          { "name" : 'paragraph',   "groups": [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
          { "name": 'document',	   "groups": [ 'mode', 'document', 'doctools' ] },
          { "name": 'styles' }
      ],
      "removeButtons":"Source,Save,Templates,Find,Replace,Scayt,SelectAll",
      "extraPlugins": 'wordcount',
      "wordcount":{
      "showParagraphs": false,
      "showWordCount": false,
      "showCharCount": true,
      "countSpacesAsChars": true,
      "countHTML": false,
      "maxCharCount": '550',
      },
     };


 countdown = '';
countProject=0;

  customTitle: string = 'Maker Portfolio';
  customDescription: string;
  customImage: string;

  userId = localStorage.getItem('user_id');
  badges = [];
  // cover declarations
  cropperSettings: CropperSettings; s
  coverPhotoSrc: string;
  coverPhotoAttached: boolean = false;

  public rendrer: Renderer;

  CoverImageData: any;
  coverFile: FileEntity = { filename: "", file: "" };

  //end of cover declarations
  allMarkersNames: any[] = [];
  allMarkersUrl: any[] = [];
  allIntersets: any[] = [];

  temp: string;
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
    pass: "MOcs56",
  };
  profile: UserProfile = {
    name: 'testar',
    user_photo: '',
    bio: '',
    started_making: '',
    field_social_accounts: {},
    address: {},
    pass: "MOcs56",
  };
  ckeditorCongfig = {};
  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router,
    private userService: UserService,
    private viewService: ViewService,
    private fileService: FileService
  ) {

    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 100;
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
    this.ckeditorCongfig = {extraPlugins: 'wordcount', wordcount: {maxCharCount: 5}}
   

  }
  
  ngOnInit() {
    let userId = localStorage.getItem('user_id');
    this.userService.getUser(userId).subscribe(res => {
      this.profile = res;
      this.customDescription = this.profile.first_name + " " + this.profile.last_name + " Learn all about about this Maker and their work.";
      this.customImage = this.profile.user_photo;
      console.log(this.profile.profile_cover);
      this.fileService.getFileById(Number(this.profile.profile_cover)).subscribe((res: any) => {
        console.log(res);
        this.profile.profile_cover = res.uri;
      });
      localStorage.setItem('user_photo', this.profile.user_photo);
      this.profile.pass = "MOcs56";
      //console.log(res);
    }, err => {

    });

    this.profileService.getAllMarkers().subscribe(markers => {
      for (let i = 0; i < markers.length; i++) {
        this.allMarkersNames.push(markers[i].makerspace_name);
        this.allMarkersUrl.push(markers[i].makerspace_url);
      }
    }, err => {
      //console.log(err);
    });

    this.profileService.getAllInterests().subscribe(allIntersets => {
      this.allIntersets = allIntersets;
    }, err => {
      //console.log(err);
    });

    this.BuildForm();
    this.getBadges();
    this.getCountProject();
  }// end of OnInit 

  BuildForm() {
    this.optionalForm = this.fb.group({
      'name': [''],
      'city': [''],
      'state': [''],
    });
  }

  saveInfo() {
    // this.optionalForm.value;
    this.profile.nickname = this.info.nickname;
    this.saveProfile(this.profile);
  }

  onSelected(intrest) {
    this.profile.maker_interests.push(intrest.name);
  }
  saveIntersets() {
    this.saveProfile(this.profile);
  }
  saveBio() {
    this.profile.bio = this.info.bio;
    this.profile.describe_yourself = this.info.describe_yourself;
    this.saveProfile(this.profile);
  }

  saveSocial() {
    this.profile.field_social_accounts = this.info.field_social_accounts;
    this.saveProfile(this.profile);
  }
  saveMarkerspaces() {
    this.profile.field_add_your_makerspace_s_ = this.info.field_add_your_makerspace_s_;
    this.saveProfile(this.profile);
  }
  saveProfile(profile :any) {
    this.profileService.updateProfile(this.userId, profile).subscribe(profile => {
    }, err => {
      //console.log(err);
    });
    this.ngOnInit();
  }
  onValueChanged(data?: any) {

  }
  initMakerspace() {

  }

  onFileChange(event: Event) {
    //console.log("profile saved");
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

  loadImg(event: Event) {
    $("#upload").click();
  }

  fileChangeListener(file: File, cropper) {
    if (!file) return;
    this.CoverImageData = {};
    var image: any = new Image();
    var myReader: FileReader = new FileReader();
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      cropper.setImage(image);
    };

    myReader.readAsDataURL(file);

    this.coverFile.filename = file.name;
    let file_url = domain + "/sites/default/files/maker/cover_photo/" + file.name;
    this.coverFile.uri = file_url as string;
  }


  private dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile, cropper) {
    this.fileChangeListener(acceptedFile.file, cropper)
  }


 limitText(limitField, limitCount, limitNum) {
      
	if (limitField.length > limitNum) {
		limitField = limitField.substring(0, limitNum);
 

	} else {
		 limitCount = limitNum - limitField.length;
      // console.log ( limitCount)
      this.countdown = limitCount;
      
	}
}

  saveCropped() {
    if (!this.CoverImageData.image) return;
    //this.profile.profile_cover = this.CoverImageData.image;
    this.coverFile.file = NodeHelper.RemoveFileTypeFromBase64(this.CoverImageData.image);
    this.fileService.SendCreatedFile(this.coverFile).subscribe((res: any) => {
      console.log(res);
     this.profile.profile_cover = res.fid
     console.log(this.profile.profile_cover);
     this.saveProfile(this.profile);
    });
  }

  /* function get Badges */
  getBadges() {
    // service to get profile card Badges
    this.viewService.getView('api_user_badges', [['uid', this.userId]]).subscribe(data => {
      this.badges = data;
    }, err => {
    });
  }
   /* end function get Badges */
     /* function to get count projects */
  getCountProject() {
    this.viewService.getView('maker_count_all_projects/'+  [localStorage.getItem('user_id')]).subscribe(data => {
      this.countProject = data[0];
    }, err => {

    });
  }
  /* end count function */

  limitString(model, key, length) {
    if (typeof model[key] != "undefined") {
      if (model[key].length > length) {
        this.temp = model[key];
        model[key] = this.temp.substr(0, length);
      }
    }
  }

}
