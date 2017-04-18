import { field_URL } from '../../../../models/Drupal';
import { Component, OnInit,ViewChild } from '@angular/core';
import { UserProfile } from "../../../../models/profile/userprofile";
import { ProfileSocial } from "../../../../models/profile/ProfileSocial";
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ProfileService } from '../../../../d7services/profile/profile.service';
import { UserService } from '../../../../d7services/user/user.service';
import { Ng2FileDropAcceptedFile } from 'ng2-file-drop';
import { CropperSettings } from 'ng2-img-cropper';
import { ViewService } from '../../../../d7services/view/view.service';
import { FileEntity, NodeHelper } from '../../../../models';
import { FileService } from '../../../../d7services/file/file.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable'
import { LoaderService } from '../../../shared/loader/loader.service';
import { Intrests } from '../../../../models/profile/intrests';
import { Auth } from '../../../../auth0/auth.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { ImageCropperComponent } from 'ng2-img-cropper';
import { MetaService } from '@nglibs/meta';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  @ViewChild('cropper') cropper:ImageCropperComponent; 

  CountriesList = [];
  SearchMakerspace = (text$: Observable<string>) => {
    return text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searchFailed = false)
      .switchMap((term) => {
        if (term.length > 1) {
          return this.viewService.getView('api_makerspaces', [['search', term]])
            .map(result => {
              if (result.length == 0) {
                this.searchFailed = true;
              }
              return result;
            })
        }
        return [];
      }
      )
  };

  SearchCountry = (text$: Observable<string>) => {
    return text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searchFailed = false)
      .map((term) => {
        if (term.length > 1) {
          let res = this.CountriesList.filter(element => new RegExp(term, 'gi').test(element.value)).splice(0, 10);
          if (res) {
            return res;
          }
          this.searchFailed = true;
        }
        return [];
      })
  };

  searchFailed: boolean = false;
  CurrentLoggedUserId: number;
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
      'field_website_or_blog': [this.profile.field_social_accounts.field_website_or_blog, [CustomValidators.url]],
      'field_additional_site': [this.profile.field_social_accounts.field_additional_site, [CustomValidators.url]],
      'field_facebook': [this.profile.field_social_accounts.field_facebook, [CustomValidators.url]],
      'field_instagram': [this.profile.field_social_accounts.field_instagram, [CustomValidators.url]],
      'field_linkedin': [this.profile.field_social_accounts.field_linkedin, [CustomValidators.url]],
      'field_twitter': [this.profile.field_social_accounts.field_twitter, [CustomValidators.url]],
      'field_pinterest': [this.profile.field_social_accounts.field_pinterest, [CustomValidators.url]],
      'field_youtube': [this.profile.field_social_accounts.field_youtube, [CustomValidators.url]],
      'field_hackster_io': [this.profile.field_social_accounts.field_hackster_io, [CustomValidators.url]],
      'field_instructables': [this.profile.field_social_accounts.field_instructables, [CustomValidators.url]],
      'field_hackday': [this.profile.field_social_accounts.field_hackday, [CustomValidators.url]],
      'field_preferred': [this.profile.field_social_accounts.field_preferred],
    });
  }
  title;
  CurrentModalTab:string;
  ImageFile:any;
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
  CountryFieldsAndDetails = {
    used_fields: [],
    administrative_area_label: '',
  };
  ProfileInfo: UserProfile = {
    address: {
      country: '',
    },
    nickname: '',
    describe_yourself: '',
    bio: '',
    field_social_accounts: new ProfileSocial(),
    started_making: '',
    field_add_your_makerspace_s_: []
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
    private auth: Auth,
    private readonly meta: MetaService

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
    this.CurrentModalTab = 'personal info';
    this.Loading = true;
    let userName = this.route.snapshot.params['user_name'];
    this.userService.getStatus().subscribe(data => {
      if (data.user.uid > 0) {
        this.CurrentLoggedUserId = data.user.uid;
      }
    });
    /*check if navigating to profile with username paramter => get uid from name 
      else get uid from local storage
    */
    if (userName) {
      this.userService.getIdFromUrl(userName).subscribe(res => {
        this.uid = res.uid;
        this.GetUserDetails();
      });
    } else {
      this.uid = +localStorage.getItem('user_id');
      this.GetUserDetails();
    }
  }
  GetUserDetails() {
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
  OpenModal(Template, CSSClass: string,IsPhotoModal?) {
    this.modalService.open(Template, { windowClass: CSSClass });
    if(IsPhotoModal){
      setTimeout(()=>{
        this.cropper.setImage(this.ImageFile);
      });
    }
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

  ReSetAddressValues() {
    if (this.CountryFieldsAndDetails['administrative_areas'] && !this.ProfileInfo.address.governorate) {
      let administrative_area_label = this.CountryFieldsAndDetails.administrative_area_label.toLowerCase();
      if (!this.profile.address[administrative_area_label]) {
        this.ProfileInfo.address.governorate = this.CountryFieldsAndDetails['administrative_areas'][0].value;
      } else {
        this.ProfileInfo.address.governorate = this.profile.address[administrative_area_label];
      }
    }
  }
  SaveInfo(closebtn: HTMLButtonElement) {
    if (this.formGroup.valid) {
      this.ProfileInfo.describe_yourself = this.formGroup.value.describe_yourself;
      this.ProfileInfo.started_making = this.formGroup.value.started_making;
      this.ProfileInfo.field_add_your_makerspace_s_ = this.formGroup.value.field_add_your_makerspace_s_;
      this.SaveUser(this.ProfileInfo);
      closebtn.click();
    }
    this.ReSetAddressValues();
    if (this.FormGroupSocial.valid) {
      Object.assign(this.ProfileInfo.field_social_accounts, this.FormGroupSocial.value);
      this.SaveUser(this.ProfileInfo);
      closebtn.click();
    }
  }
  SaveUser(user: UserProfile) {
    this.Loading = true;
    user.uid = this.uid;
    //delete user.field_add_your_makerspace_s_;
    this.profileService.updateProfile(user.uid, user).subscribe(data => {
      this.UpdateUser();
    });
  }
  GetCountryDetails(CountryKey: string) {
    this.viewService.getView('maker_address_api/' + CountryKey).subscribe((data) => {
      this.CountryFieldsAndDetails = data;
    });
  }
  AddMakerspaceRow(makerspace?) {
    const control = <FormArray>this.formGroup.controls['field_add_your_makerspace_s_'];
    let MakerspaceGroup: FormGroup = this.fb.group({
      field_makerspace_name: [makerspace ? makerspace.field_makerspace_name : '', Validators.required],
      field_makerspace_url: [makerspace && makerspace.field_makerspace_url ? makerspace.field_makerspace_url : '', CustomValidators.url],
      id: [makerspace ? makerspace.id : '', Validators.required]
    });
    control.push(MakerspaceGroup);
  }
  BuildForm() {
    this.formGroup = this.fb.group({
      describe_yourself: [this.ProfileInfo.describe_yourself, Validators.maxLength(140)],
      started_making: [this.ProfileInfo.started_making, Validators.maxLength(300)],
      field_add_your_makerspace_s_: this.fb.array([]),
    });
    if (this.ProfileInfo.field_add_your_makerspace_s_) {
      this.ProfileInfo.field_add_your_makerspace_s_.forEach((makerspace, index) => {
        this.AddMakerspaceRow(makerspace);
      });
    }
  }
  UpdateUser() {
    this.userService.getUser(this.uid).subscribe(
      (profile: UserProfile) => {
        this.SetUser(profile);
        this.GetCountryDetails(profile.address.code);
      }, (err) => {
        console.log(err);
      }, () => {
        if (this.CurrentLoggedUserId == this.uid)
          localStorage.setItem('user_photo', this.profile.user_photo);
        this.BuildForm();
        this.buildFormSocial();
        this.Loading = false;
      }
    )
  }
  SelectMakerspace(index: number, event) {
    let makerspace = event.item;
    event.preventDefault();
    const field_add_your_makerspace_s_ = <FormArray>this.formGroup.controls['field_add_your_makerspace_s_'];
    field_add_your_makerspace_s_.controls[index]['controls'].id.setValue(makerspace.id);
    field_add_your_makerspace_s_.controls[index]['controls'].field_makerspace_name.setValue(makerspace.title);
  }
  SetUser(user: UserProfile) {
    this.profile = user;
    this.FileName = user.user_photo.substring(user.user_photo.lastIndexOf('/')+1);
    this.ImageFile = new Image();
    this.ImageFile.src = user.user_photo;
    this.ProfileInfo.nickname = user.nickname;
    this.ProfileInfo.address = user.address;
    this.ProfileInfo.describe_yourself = user.describe_yourself;
    this.ProfileInfo.bio = user.bio;
    if (user.field_social_accounts) {
      this.ProfileInfo.field_social_accounts = user.field_social_accounts;
    }
    this.ProfileInfo.field_add_your_makerspace_s_ = user.field_add_your_makerspace_s_;
    this.ProfileInfo.maker_interests = user.maker_interests;
    this.ProfileInfo.started_making = user.started_making;
    this.customDescription = this.profile.first_name + " " + this.profile.last_name + " Learn all about about this Maker and their work.";
    this.meta.setTitle(`Maker Share | ${this.profile.first_name} ${this.profile.last_name}`);
    this.meta.setTag('og:image', this.profile.user_photo);
    this.meta.setTag('og:description', this.customDescription);
  }
}