import { Component, OnInit } from '@angular/core';
import { UserProfile } from "../../../../models/profile/userprofile";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from '../../../../d7services/profile/profile.service';
import { UserService } from '../../../../d7services/user/user.service';
import { Ng2FileDropAcceptedFile } from 'ng2-file-drop';
import { CropperSettings } from 'ng2-img-cropper';
import { SharedButtonsComponent } from '../../../shared/shared-buttons/shared-buttons.component';
import { ViewService } from '../../../../d7services/view/view.service';
import { FileEntity, NodeHelper } from '../../../../models';
import { FileService } from '../../../../d7services/file/file.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable'
import { value } from '../../../../models/challenge/comment';

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

  formGroup:FormGroup;
  CoverImageData: any = {};
  ProfilePicData: any = {};
  FileName:string = '';
  ProjectsCount:number;
  CovercropperSettings: CropperSettings;
  ProfilecropperSettings: CropperSettings;
  allIntersets:Array<any>;
  uid:number;
  customDescription: string;
  badges:Array<any>;
  Loading:boolean;
  profile: UserProfile;
  ProfileInfo:UserProfile = {
    address:{
      city:'',
      country:'',
    },
    nickname:'',
    describe_yourself:'',
    bio:'',
    field_social_accounts:{
      field_website_or_blog:'',
      field_additional_site:'',
      field_facebook:'',
      field_instagram:'',
      field_linkedin:'',
      field_twitter:'',
      field_pinterest:'',
      field_youtube:'',
      field_hackster_io:'',
      field_instructables:'',
      field_hackday:'',
      field_preferred:''
    },
    started_making:''
  };

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private viewService: ViewService,
    private fileService: FileService,
    private modalService: NgbModal,
    private fb:FormBuilder,
  ) {

    this.CovercropperSettings = new CropperSettings();
    this.CovercropperSettings.width = 1800;
    this.CovercropperSettings.height = 220;
    this.CovercropperSettings.croppedWidth = 1800;
    this.CovercropperSettings.croppedHeight = 220;
    this.CovercropperSettings.canvasWidth = 430;
    this.CovercropperSettings.canvasHeight = 315;
    this.CovercropperSettings.minWidth = 1800;
    this.CovercropperSettings.minHeight = 220;
    this.CovercropperSettings.noFileInput = true;

    this.ProfilecropperSettings = new CropperSettings();
    this.ProfilecropperSettings.width = 660;
    this.ProfilecropperSettings.height = 660;
    this.ProfilecropperSettings.croppedWidth = 660;
    this.ProfilecropperSettings.croppedHeight = 660;
    this.ProfilecropperSettings.canvasWidth = 430;
    this.ProfilecropperSettings.canvasHeight = 315;
    this.ProfilecropperSettings.minWidth = 330;
    this.ProfilecropperSettings.minHeight = 330;
    this.ProfilecropperSettings.noFileInput = true;
  }
  
  ngOnInit() {
    this.Loading = true;
    this.uid = +localStorage.getItem('user_id');
    var tasks = [];
    tasks.push(this.viewService.getView('api_user_badges', [['uid', this.uid]]));
    // tasks.push(this.profileService.getAllMarkers());
    tasks.push(this.profileService.getAllInterests());
    tasks.push(this.viewService.getView('maker_count_all_projects/'+this.uid));
    let source = Observable.forkJoin(tasks).subscribe((data)=>{
      let index = 0;
      this.badges = data[index++] as Array<any>;
      this.allIntersets = data[index++] as Array<any>;
      this.ProjectsCount = data[index++] as number;
      this.UpdateUser();
    });
  }

  // old structure not finished

  onSelected(intrest) {
    this.profile.maker_interests.push(intrest.name);
  }

  saveMarkerspaces() {
    this.SaveUser(this.profile);
  }

  addMakerspace() {
    this.profile.field_add_your_makerspace_s_.push({});
  }

  // new structure
  OpenModal(Template,CSSClass:string){
    this.modalService.open(Template,{windowClass:CSSClass});
  }

  dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile, cropper) {
    this.fileChangeListener(acceptedFile.file, cropper)
  }

  fileChangeListener(file: File, cropper) {
    if (!file) return;
    this.CoverImageData = {};
    this.ProfilePicData = {};
    this.FileName = file.name;
    var image: any = new Image();
    var myReader: FileReader = new FileReader();
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
  }  

  SaveImage(closebtn:HTMLButtonElement,DataObject,ImageType){
    closebtn.click();
    let image:FileEntity = {file:NodeHelper.RemoveFileTypeFromBase64(DataObject.image),filename:this.FileName};
    this.fileService.SendCreatedFile(image).subscribe((data)=>{
      var user:UserProfile;
      if(ImageType === 'cover'){
        user = {uid:this.uid,profile_cover:data.fid};
      }else{
        user = {uid:this.uid,user_photo:data.fid};
      }
      this.CoverImageData = {};
      this.ProfilePicData = {};
      this.FileName = '';
      this.SaveUser(user);
    });
  }

  SaveInfo(closebtn:HTMLButtonElement) {
    closebtn.click();
    if(this.formGroup.valid) {
      this.ProfileInfo.describe_yourself = this.formGroup.value.describe_yourself;
      this.ProfileInfo.started_making = this.formGroup.value.started_making;
    }
    this.ProfileInfo.field_social_accounts
    this.SaveUser(this.ProfileInfo);
  }

  SaveUser(user:UserProfile){
    this.Loading = true;
    user.uid = this.uid;
    this.profileService.updateProfile(user.uid,user).subscribe(data=>{
      this.UpdateUser();
    });
  }

  UpdateUser(){
    this.userService.getUser(this.uid).subscribe(res => {
      this.profile = res;
      this.ProfileInfo.nickname = res.nickname;
      this.ProfileInfo.address = res.address;
      this.ProfileInfo.describe_yourself = res.describe_yourself;
      this.ProfileInfo.bio = res.bio;
      if(res.field_social_accounts){
        this.ProfileInfo.field_social_accounts = res.field_social_accounts;
      }
      this.ProfileInfo.started_making = res.started_making;
      this.customDescription = this.profile.first_name + " " + this.profile.last_name + " Learn all about about this Maker and their work.";
      localStorage.setItem('user_photo', this.profile.user_photo);
      this.formGroup = this.fb.group({
        describe_yourself: [this.ProfileInfo.describe_yourself,Validators.maxLength(140)],
        started_making: [this.ProfileInfo.started_making,Validators.maxLength(300)]
      })
      this.Loading = false;
    });
  }
  prefer(value : string){
    this.ProfileInfo.field_social_accounts.field_preferred = value;
  }

}