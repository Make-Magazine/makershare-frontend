import { field_URL } from '../../../../models/Drupal';
import { Component, OnInit } from '@angular/core';
import { UserProfile } from "../../../../models/profile/userprofile";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
import { Intrests} from '../../../../models/profile/intrests';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {MessageModalComponent} from '../../../shared/message-modal/message-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
userIdProfile;
countProject;
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
  
  regexp = new RegExp('/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/');
  

  formErrors={
    field_website_or_blog:'',
    field_additional_site:'',
    field_facebook:'',
    field_instagram:'',
    field_linkedin:'',
    field_twitter:''
  };

  options = {
        placeholder: "+ interest",
        secondaryPlaceholder: "Enter a new interest",
        separatorKeys: [4, 5],
        maxItems: 20
    }

  validationMessages = {
    'field_website_or_blog': {
      'pattern': 'invalid Website URL'
    },
    'field_additional_site': {
      'pattern': 'invalid Website URL'
    },
    'field_facebook': {
      'pattern': 'invalid Website URL'
    },
    'field_instagram': {
      'pattern': 'invalid Website URL'
    },
    'field_linkedin': {
      'pattern': 'invalid Website URL'
    },
    'field_twitter': {
      'pattern': 'invalid Website URL'
    }
  };
  formGroup:FormGroup;
  FormGroupSocial:FormGroup;
  buildFormSocial() {
    this.FormGroupSocial= this.fb.group({
      'field_website_or_blog': ['', [Validators.pattern(this.regexp)]],
      'field_additional_site': ['', [Validators.pattern(this.regexp)]],
      'field_facebook': ['', [Validators.pattern(this.regexp)]],
      'field_instagram': ['', [Validators.pattern(this.regexp)]],
      'field_linkedin': ['', [Validators.pattern(this.regexp)]],
      'field_twitter': ['', [Validators.pattern(this.regexp)]],
    });
    this.FormGroupSocial.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  CoverImageData: any = {};
  ProfilePicData: any = {};
  FileName:string = '';
  ProjectsCount:number;
  CovercropperSettings: CropperSettings;
  ProfilecropperSettings: CropperSettings;
  allIntersets:Array<any>;
  uid:number;
  userName:string;
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
    private route:ActivatedRoute, private router:Router
  ) {

    
    this.buildFormSocial();
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
    
       this.userService.getStatus().subscribe(data => {
      if(data.user.uid > 0){
        // logged in 
  this.route.params.subscribe((params: Params) => {
         this.userName = params['user_name'];
      });
        this.userService.getIdFromUrl(this.userName).subscribe( data => {
           this.userIdProfile = data.uid;
              //console.log(this.userIdProfile);
        this.getCountProject();
        }, err => {
  
        });
      }
    }, err => {
    });
    //console.log(this.route.snapshot.params['user_name']);
    this.userName = this.route.snapshot.params['user_name'];
    /*check if navigating to profile with username paramter => get uid from name 
      else get uid from local storage
    */
    if(typeof this.userName != "undefined") {
    this.userService.getIdFromUrl(this.userName).subscribe(res => {
      this.uid = res.uid;
    });
  } else {
    this.uid = +localStorage.getItem('user_id');
    }

    this.profileService.getAllInterests().subscribe(allIntersets => {
     this.allIntersets=allIntersets;
     console.log(this.profile)
    }, err => {
      // console.log("error");
      // console.log(err);
    });

    this.Loading = true;
    var tasks = [];
    tasks.push(this.viewService.getView('api_user_badges', [['uid', this.uid]]));
    // tasks.push(this.profileService.getAllMarkers());
    tasks.push(this.profileService.getAllInterests());
    tasks.push(this.viewService.getView('maker_count_all_projects/'+this.userIdProfile));
    let source = Observable.forkJoin(tasks).subscribe((data)=>{
      let index = 0;
      this.badges = data[index++] as Array<any>;
      this.allIntersets = data[index++] as Array<any>;
    //  this.ProjectsCount = data[index++] as number;
      //console.log(this.userIdProfile)
      //console.log(this.ProjectsCount)
      this.UpdateUser();
    });
  }

  // old structure not finished
    /* function to get count projects */
  getCountProject() {
    this.viewService.getView('maker_count_all_projects/'+this.userIdProfile).subscribe(data => {
      this.ProjectsCount = data[0];
      //console.log(this.ProjectsCount)
    }, err => {

    });
  }
  /* end count function */

  onSelected(intrest) {
    this.profile.maker_interests.push(intrest.name);
  }

  interestSelected(interest) {
    this.SaveUser(this.ProfileInfo);
  }

  onInterestRemoved(interest) {
      this.SaveUser(this.ProfileInfo);
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
    
    if(this.formGroup.valid) {
      this.ProfileInfo.describe_yourself = this.formGroup.value.describe_yourself;
      this.ProfileInfo.started_making = this.formGroup.value.started_making;
    }
    
    this.onValueChanged();
    let flag = true;
    for(let feild in this.formErrors){
        if( this.formErrors[feild] != ""){
          flag= false;
        }
    }
    if(flag){
        Object.assign(this.ProfileInfo.field_social_accounts , this.FormGroupSocial.value);
        this.SaveUser(this.ProfileInfo);
        closebtn.click();
  }
  
  }

  SaveUser(user:UserProfile){
    this.Loading = true;
    user.uid = this.uid;

    this.profileService.updateProfile(user.uid,user).subscribe(data=>{
      this.UpdateUser();
    });
  }

  UpdateUser(){
    if(typeof this.uid != "undefined") {
    this.userService.getUser(this.uid).subscribe(res => {
      this.profile = res;
      this.ProfileInfo.nickname = res.nickname;
      this.ProfileInfo.address = res.address;
      this.ProfileInfo.describe_yourself = res.describe_yourself;
      this.ProfileInfo.bio = res.bio;
      if(res.field_social_accounts){
        this.ProfileInfo.field_social_accounts = res.field_social_accounts;
      }
      /**/
      this.ProfileInfo.maker_interests = res.maker_interests;
      /**/

      this.ProfileInfo.started_making = res.started_making;
      this.customDescription = this.profile.first_name + " " + this.profile.last_name + " Learn all about about this Maker and their work.";
      localStorage.setItem('user_photo', this.profile.user_photo);
      this.formGroup = this.fb.group({
        describe_yourself: [this.ProfileInfo.describe_yourself,Validators.maxLength(140)],
        started_making: [this.ProfileInfo.started_making,Validators.maxLength(300)],
      })
      this.Loading = false;
    });
    } else {
      this.router.navigate(['**']);
    }
  }
  
  prefer(event : string){
    this.ProfileInfo.field_social_accounts.field_preferred = event;
    
  }

  onValueChanged(data?: any) {
    if (!this.FormGroupSocial) { return; }
    const form = this.FormGroupSocial;
    if (form != null) {
      for (const field in this.formErrors) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && control.value!= '' && !control.value.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/)) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }

  }

}
