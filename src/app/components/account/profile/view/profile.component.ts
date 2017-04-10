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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable'
import { LoaderService } from '../../../shared/loader/loader.service';
import { value } from '../../../../models/challenge/comment';
import { Intrests } from '../../../../models/profile/intrests';
import { ActivatedRoute, Router,Params } from '@angular/router';
import {MessageModalComponent} from '../../../shared/message-modal/message-modal.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  CountriesList = [];

  SearchCountry = (text$: Observable<string>) =>{
    return text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searchFailed = false)
      .map((term) => 
        {
          if(term.length > 1){
            let res = this.CountriesList.filter(element => new RegExp(term, 'gi').test(element.value)).splice(0, 10);
            if(res){ 
              return res;
            }
            this.searchFailed = true;
          }
          return [];
        }
      )
  };

  searchFailed:boolean = false;
  idProfile;
  ckEditorConfig: {} = {
    "toolbarGroups": [
      { "name": "document", "groups": ["mode", "document", "doctools"] },
      { "name": 'clipboard', "groups": ['clipboard', 'undo'] },
      { "name": "editing", "groups": ["find", "selection", "spellchecker", "editing"] },
      { "name": "forms", "groups": ["forms"] },
      { "name": 'paragraph', "groups": ['list', 'indent', 'blocks', 'align', 'bidi'] },
      { "name": 'document', "groups": ['mode', 'document', 'doctools'] },
      { "name": 'styles' }
    ],
    "removeButtons": "Source,Save,Templates,Find,Replace,Scayt,SelectAll",
    "extraPlugins": 'wordcount',
    "wordcount": {
      "showParagraphs": false,
      "showWordCount": false,
      "showCharCount": true,
      "countSpacesAsChars": true,
      "countHTML": false,
      "maxCharCount": '550',
    },
  };
  regexp = new RegExp('/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/');
  formErrors = {
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
    field_hackday: '',
  };
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
    },
    'field_pinterest': {
      'pattern': 'invalid Website URL'
    },
    'field_youtube': {
      'pattern': 'invalid Website URL'
    },
    'field_hackster_io': {
      'pattern': 'invalid Website URL'
    },
    'field_instructables': {
      'pattern': 'invalid Website URL'
    },
    'field_hackday': {
      'pattern': 'invalid Website URL'
    }
  };
  formGroup: FormGroup;
  FormGroupSocial: FormGroup;
  buildFormSocial() {
    
    this.FormGroupSocial = this.fb.group({
      'field_website_or_blog': [this.profile.field_social_accounts.field_website_or_blog, [Validators.pattern(this.regexp)]],
      'field_additional_site': [this.profile.field_social_accounts.field_additional_site, [Validators.pattern(this.regexp)]],
      'field_facebook': [this.profile.field_social_accounts.field_facebook, [Validators.pattern(this.regexp)]],
      'field_instagram': [this.profile.field_social_accounts.field_instagram, [Validators.pattern(this.regexp)]],
      'field_linkedin': [this.profile.field_social_accounts.field_linkedin, [Validators.pattern(this.regexp)]],
      'field_twitter': [this.profile.field_social_accounts.field_twitter, [Validators.pattern(this.regexp)]],
      'field_pinterest': [this.profile.field_social_accounts.field_pinterest, [Validators.pattern(this.regexp)]],
      'field_youtube': [this.profile.field_social_accounts.field_youtube, [Validators.pattern(this.regexp)]],
      'field_hackster_io': [this.profile.field_social_accounts.field_hackster_io, [Validators.pattern(this.regexp)]],
      'field_instructables': [this.profile.field_social_accounts.field_instructables, [Validators.pattern(this.regexp)]],
      'field_hackday': [this.profile.field_social_accounts.field_hackday, [Validators.pattern(this.regexp)]],
      'field_preferred': [this.profile.field_social_accounts.field_preferred],
    });
    this.FormGroupSocial.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }
  ProfilePicData: any = {};
  FileName: string = '';
  ProjectsCount: number;
  ProfilecropperSettings: CropperSettings;
  allIntersets: Array<any>;
  uid: number;
  customDescription: string;
  badges: Array<any>;
  Loading: boolean;
  profile: UserProfile;
  ProfileInfo: UserProfile = {
    address: {
      country: '',
    },
    nickname: '',
    describe_yourself: '',
    bio: '',
    field_social_accounts: {
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
      field_hackday: '',
      field_preferred: ''
    },
    started_making: ''
  };
  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private viewService: ViewService,
    private fileService: FileService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private route: ActivatedRoute, private router: Router,
    private loaderService: LoaderService,
  ) {
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
    let userName = this.route.snapshot.params['user_name'];
    this.userService.getStatus().subscribe(data => {
      if(data.user.uid > 0){
        this.idProfile = data.user.uid;
      }
    });
    /*check if navigating to profile with username paramter => get uid from name 
      else get uid from local storage
    */
    if (userName) {
      this.userService.getIdFromUrl(userName).subscribe(res => {
        this.uid = res.uid;
        this.GetUserDetails();
      },()=>{
        this.GetUserDetails();
      });
    } else {
      this.uid = +localStorage.getItem('user_id');
      this.GetUserDetails();
    }
    
  }
  GetUserDetails(){
    if (!this.uid) {
      this.router.navigate(['**']);
      return;
    }
    var tasks = [];
    tasks.push(this.viewService.getView('api_user_badges', [['uid', this.uid]]));
    tasks.push(this.profileService.getAllInterests());
    tasks.push(this.viewService.getView('maker_count_all_projects/' + this.uid));
    tasks.push(this.viewService.getView('maker_address_api'));
    let source = Observable.forkJoin(tasks).subscribe((data) => {
      let index = 0;
      this.badges = data[index++] as Array<any>;
      this.allIntersets = data[index++] as Array<any>;
      this.ProjectsCount = data[index++] as number;
      this.CountriesList = data[index++] as Array<any>;
      this.UpdateUser();
    });
  }
  OpenModal(Template, CSSClass: string) {
    this.modalService.open(Template, { windowClass: CSSClass });
  }
  dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile, cropper) {
    this.fileChangeListener(acceptedFile.file, cropper)
  }
  fileChangeListener(file: File, cropper) {
    if (!file) return;
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
  SaveImage(closebtn: HTMLButtonElement, DataObject, ImageType) {
    closebtn.click();
    let image: FileEntity = { file: NodeHelper.RemoveFileTypeFromBase64(DataObject.image), filename: this.FileName };
    this.fileService.SendCreatedFile(image).subscribe((data) => {
      var user: UserProfile;
      user = { uid: this.uid, user_photo: data.fid };
      this.ProfilePicData = {};
      this.FileName = '';
      this.SaveUser(user);
    });
  }
  SaveInfo(closebtn: HTMLButtonElement) {
    if (this.formGroup.valid) {
      this.ProfileInfo.describe_yourself = this.formGroup.value.describe_yourself;
      this.ProfileInfo.started_making = this.formGroup.value.started_making;
    }
    this.onValueChanged();
    let flag = true;
    for (let feild in this.formErrors) {
      if (this.formErrors[feild] != "") {
        flag = false;
      }
    }
    if (flag) {
      Object.assign(this.ProfileInfo.field_social_accounts, this.FormGroupSocial.value);
      this.SaveUser(this.ProfileInfo);
      closebtn.click();
    }
  }
  SaveUser(user: UserProfile) {
    this.Loading = true;
    user.uid = this.uid;
    this.profileService.updateProfile(user.uid, user).subscribe(data => {
      this.UpdateUser();
    });
  }
  UpdateUser() {
    this.userService.getUser(this.uid).subscribe(res => {
      console.log(res);
      this.profile = res;
      this.ProfileInfo.nickname = res.nickname;
      this.ProfileInfo.address = res.address;
      this.ProfileInfo.describe_yourself = res.describe_yourself;
      this.ProfileInfo.bio = res.bio;
      if (res.field_social_accounts) {
        this.ProfileInfo.field_social_accounts = res.field_social_accounts;
      }
      this.ProfileInfo.maker_interests = res.maker_interests;
      this.ProfileInfo.started_making = res.started_making;
      this.customDescription = this.profile.first_name + " " + this.profile.last_name + " Learn all about about this Maker and their work.";
      if(this.idProfile==this.uid)
      localStorage.setItem('user_photo', this.profile.user_photo);
      this.formGroup = this.fb.group({
        describe_yourself: [this.ProfileInfo.describe_yourself, Validators.maxLength(140)],
        started_making: [this.ProfileInfo.started_making, Validators.maxLength(300)],
      });
      this.buildFormSocial();
      this.Loading = false;
    });
  }
  onValueChanged(data?: any) {
    if (!this.FormGroupSocial) { return; }
    const form = this.FormGroupSocial;
    if (form != null) {
      for (const field in this.formErrors) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && control.value != '' && !control.value.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/)) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  }
}