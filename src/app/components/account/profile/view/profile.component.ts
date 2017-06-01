import { Component, OnInit, ViewChild } from '@angular/core';
import { UserProfile } from "../../../../models/profile/userprofile";
import { ProfileSocial } from "../../../../models/profile/ProfileSocial";
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ProfileService, UserService, ViewService, FileService, StatisticsService, MainService } from '../../../../d7services';
import { Ng2FileDropAcceptedFile } from 'ng2-file-drop';
import { CropperSettings } from 'ng2-img-cropper';
import { FileEntity, NodeHelper, FileEntityManage, field_URL } from '../../../../models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable'
import { LoaderService } from '../../../shared/loader/loader.service';
import { Intrests } from '../../../../models/profile/intrests';
import { Auth } from '../../../../auth0/auth.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { ImageCropperComponent } from 'ng2-img-cropper';
import { MetaService } from '@nglibs/meta';
import { ProfilePictureService } from '../../../shared/profile-picture/profile-picture.service';
import { URLNoProtocol } from '../../../../validations/url-no-protocol.validation';
import * as globals from '../../../../d7services/globals';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  @ViewChild('cropper') set cropper(cropper: ImageCropperComponent) {
    setTimeout(() => {
    }, 1000);
  }

  CountriesList = [];
  formatter = (x) => {
    if (x.value) {
      return x.value;
    }
    return x;
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
      });
  };

  searchFailed: boolean = false;
  CurrentLoggedUserId: number;
  formGroup: FormGroup;
  FormGroupSocial: FormGroup;
  buildFormSocial() {
    this.FormGroupSocial = this.fb.group({
      'field_website_or_blog': [this.profile.field_social_accounts.field_website_or_blog, [URLNoProtocol()]],
      'field_additional_site': [this.profile.field_social_accounts.field_additional_site, [URLNoProtocol()]],
      'field_facebook': [this.profile.field_social_accounts.field_facebook, [URLNoProtocol()]],
      'field_instagram': [this.profile.field_social_accounts.field_instagram, [URLNoProtocol()]],
      'field_linkedin': [this.profile.field_social_accounts.field_linkedin, [URLNoProtocol()]],
      'field_twitter': [this.profile.field_social_accounts.field_twitter, [URLNoProtocol()]],
      'field_pinterest': [this.profile.field_social_accounts.field_pinterest, [URLNoProtocol()]],
      'field_youtube': [this.profile.field_social_accounts.field_youtube, [URLNoProtocol()]],
      'field_hackster_io': [this.profile.field_social_accounts.field_hackster_io, [URLNoProtocol()]],
      'field_instructables': [this.profile.field_social_accounts.field_instructables, [URLNoProtocol()]],
      'field_hackday': [this.profile.field_social_accounts.field_hackday, [URLNoProtocol()]],
      'field_github': [this.profile.field_social_accounts.field_github, [URLNoProtocol()]],
      'field_twitch': [this.profile.field_social_accounts.field_twitch, [URLNoProtocol()]],
      'field_gitlabs': [this.profile.field_social_accounts.field_gitlabs, [URLNoProtocol()]],
      'field_thingyverse': [this.profile.field_social_accounts.field_thingyverse, [URLNoProtocol()]],
      'field_stackoverflow':[this.profile.field_social_accounts.field_thingyverse, [URLNoProtocol()]],
      'field_preferred': [this.profile.field_social_accounts.field_preferred],
      'field_website_title': [this.profile.field_social_accounts.field_website_title],
      'field_blog_title': [this.profile.field_social_accounts.field_blog_title]
      
    });
  }
  PhotoModalTab: string;
  countProject: number;
  CurrentInfoTab: string;
  ImageFile: any;
  ProfilePicData: any = {};
  FileName: string = '';
  ProjectsCountPublic: number;
  ProjectsCountPrivate: number;
  ProjectsCountDraft: number;
  ReadMoreFields = {
    bio:false,
    started_making:false,
  }

  ProfilecropperSettings: CropperSettings;
  allIntersets: Array<any>;
  ParentIntersets: Array<any> = [];
  ChildrenIntersets: Array<any> = [];
  SelectedParentInterest;
  SelectedChildInterest;
  uid: number;
  customDescription: string;
  badges: Array<any>;
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
  PlaceholderText = {
    nickname: 'Do you use a nickname?',
    address: 'Where do you live?',
    bio: 'Share something about your background',
    describe_yourself: 'What is your motto as a Maker?',
    social: 'Add your social accounts',
    maker_space: 'Do you belong to any makerspaces?',
    websites: 'Include your other websites',
    started_making: 'Describe how you became a Maker',
    interests: 'Favorite making topics?',
  };
  ModalTabs = [
    'Portfolio Photo',
    'Personal Info',
    'Bio',
    'Social',
    'MakerSpaces',
    'Links',
    'Maker Moment',
    'Interests'
  ]
  DefaultView: string = "grid";
  mobileToggle: boolean = false;
  emptySocial: boolean = true;
  currentHover: string;
  emptySection = {
    motto: true,
    bio: true,
    social: true,
    badges: true,
    makerspace: true,
    websites: true,
    topics: true,
    started_making: true,
  }
  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private viewService: ViewService,
    private fileService: FileService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private route: ActivatedRoute, private router: Router,
    private loaderService: LoaderService,
    public auth: Auth,
    private mainService: MainService,

    private readonly meta: MetaService,
    private profilePictureService: ProfilePictureService,
    private statisticsService: StatisticsService,

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
    this.CurrentInfoTab = 'Personal Info';
    this.currentHover = '';
    this.PhotoModalTab = 'upload';
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
      }, err => {
         this.router.navigate(['**']);
      });
    } else {
      this.uid = +localStorage.getItem('user_id');
      this.GetUserDetails();
    }
    if (window.innerWidth < 768) {
      this.mobileToggle = true;
    }

    window.onresize = (e) => {
      if (window.innerWidth < 768) {
        this.mobileToggle = true;
      } else {
        this.mobileToggle = false;
      }
    }
  }
  SelectFileAndSave(closebtn: HTMLButtonElement, SelectedFile: FileEntityManage) {
    closebtn.click();
    let user: UserProfile = {
      uid: this.uid,
      user_photo: SelectedFile.fid.toString(),
    }
    this.SaveUser(user);
  }
  GetUserDetails() {
    if (!this.uid) {
      this.router.navigate(['**']);
      return;
    }
    var tasks = [];
    let body = { "data": this.uid  };
    tasks.push(this.viewService.getView('api_user_badges', [['uid', this.uid]]));
    tasks.push(this.viewService.getView('projects_categories'));
    tasks.push(this.mainService.post(globals.endpoint + '/maker_count_all_projects/retrieve_count_project_public', body));
    tasks.push(this.mainService.post(globals.endpoint + '/maker_count_all_projects/retrieve_count_project_private', body));
    tasks.push(this.mainService.post(globals.endpoint + '/maker_count_all_projects/retrieve_count_project_draft', body));

    tasks.push(this.viewService.getView('maker_address_api'));
    let source = Observable.forkJoin(tasks).subscribe((data) => {
      let index = 0;
      this.badges = data[index++] as Array<any>;
      this.allIntersets = data[index++] as Array<any>;
      this.ProjectsCountPublic = data[index++]['_body'].replace(']', '').replace('[', '') as number;
      this.ProjectsCountPrivate = data[index++]['_body'].replace(']', '').replace('[', '') as number;
      this.ProjectsCountDraft = data[index++]['_body'].replace(']', '').replace('[', '') as number;
      this.CountriesList = data[index++] as Array<any>;
      this.UpdateUser();
      console.log(this.ProfileInfo)
    });
    // statistics
    if (this.uid != this.CurrentLoggedUserId) {
      this.statisticsService.view_record(this.uid, 'user').subscribe();
    }

  }
  AssignParentChildInterests() {
    this.ParentIntersets = [];
    this.allIntersets.forEach((interest, index) => {
      if (!interest.parent_tid) {
        this.ParentIntersets.push(interest);
      }
    });
  }
  GetInterestsForParent() {
    this.ChildrenIntersets = [];
    this.allIntersets.forEach((interest, index) => {
      if (interest.parent_tid && interest.parent_tid == this.SelectedParentInterest && this.ProfileInfo.maker_interests.map(element => element.tid).indexOf(interest.tid) == -1) {
        this.ChildrenIntersets.push(interest);
      }
    });
  }
  SetInterest(ParentInterestElement: HTMLSelectElement) {
    this.ProfileInfo.maker_interests.push(this.allIntersets[this.allIntersets.map(element => element.tid).indexOf(this.SelectedChildInterest)]);
    // if(this.ProfileInfo.maker_interests.map(element=>element.tid).indexOf(this.SelectedParentInterest) == -1){
    //   this.ProfileInfo.maker_interests.push(this.allIntersets[this.allIntersets.map(element=>element.tid).indexOf(this.SelectedParentInterest)]);
    // }
    ParentInterestElement.value = '_none';
    delete this.SelectedChildInterest;
    delete this.SelectedParentInterest;
    this.AssignParentChildInterests();
  }
  RemoveInterest(InterestId: number, InterestParentId: number): void {
    this.ProfileInfo.maker_interests.splice(this.ProfileInfo.maker_interests.indexOf(InterestId), 1);
    var flag = false;
    this.ProfileInfo.maker_interests.forEach((category, index) => {
      let catIndex = this.allIntersets.map(element => element.tid).indexOf(category.tid);
      if (this.allIntersets[catIndex].parent_tid == InterestParentId) {
        flag = true;
        return;
      }
    });
    if (!flag) {
      this.ProfileInfo.maker_interests.splice(this.ProfileInfo.maker_interests.indexOf(InterestParentId), 1);
    }
  }
  OpenModal(Template, ModalName: string) {
    if (ModalName == 'Portfolio Photo') {
      this.modalService.open(Template, { size: 'lg' });
      this.CurrentInfoTab = ModalName;
    } else {
      if (ModalName == 'MakerSpaces') {
        const control = <FormArray>this.formGroup.controls['field_add_your_makerspace_s_'];
        if (control.controls.length == 0)
          this.AddMakerspaceRow();
      }
      this.CurrentInfoTab = ModalName;
      this.modalService.open(Template, { size: 'lg' });
    }
  }
  dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile, cropper) {
    this.fileChangeListener(acceptedFile.file, cropper);
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
  SaveImage() {
    let image: FileEntity = { file: NodeHelper.RemoveFileTypeFromBase64(this.ProfilePicData.image), filename: this.FileName };
    this.fileService.SendCreatedFile(image).subscribe((data) => {
      this.ProfileInfo.uid = this.uid;
      this.ProfileInfo.user_photo = data.fid;
      this.ProfilePicData = {};
      this.FileName = '';
      this.SaveUser(this.ProfileInfo);
    });
  }

  ReSetAddressValues() {
    if (this.CountryFieldsAndDetails['administrative_areas']) {
      let administrative_area_label = this.CountryFieldsAndDetails.administrative_area_label.toLowerCase();
      if (!this.ProfileInfo.address[administrative_area_label]) {
        this.ProfileInfo.address.governorate = '_none';
      } else {
        this.ProfileInfo.address.governorate = this.profile.address[administrative_area_label];
      }
    }
  }
  SaveInfo(closebtn: HTMLButtonElement) {
    if (this.ProfileInfo.address.governorate == '_none') {
      this.ProfileInfo.address.governorate == this.CountryFieldsAndDetails['administrative_areas'][0].value;
    }
    if (this.FormGroupSocial.valid) {
      this.ProfileInfo.field_social_accounts = this.FormGroupSocial.value;
    }
    if (this.formGroup.valid) {
      this.ProfileInfo.describe_yourself = this.formGroup.value.describe_yourself;
      this.ProfileInfo.bio = this.formGroup.value.bio;
      this.ProfileInfo.started_making = this.formGroup.value.started_making;
    }
    this.ProfileInfo.field_add_your_makerspace_s_ = this.formGroup.value.field_add_your_makerspace_s_;
    if (this.ProfilePicData.image) {
      this.SaveImage();
    } else {
      this.SaveUser(this.ProfileInfo);
    }
  }
  SaveUser(user: UserProfile) {
    user.uid = this.uid;
    this.profileService.updateProfile(user.uid, user).subscribe(data => {
      this.UpdateUser();
    });
  }
  GetCountryDetails(CountryKey: string) {
    if (!CountryKey) return;
    this.viewService.getView('maker_address_api/' + CountryKey).subscribe((data) => {
      this.CountryFieldsAndDetails = data;
      this.ReSetAddressValues();
    });
  }
  AddMakerspaceRow(makerspace?) {
    const control = <FormArray>this.formGroup.controls['field_add_your_makerspace_s_'];
    let MakerspaceGroup: FormGroup = this.fb.group({
      field_makerspace_name: [makerspace ? makerspace.field_makerspace_name : ''],
      field_makerspace_url: [makerspace && makerspace.field_makerspace_url ? makerspace.field_makerspace_url : '', URLNoProtocol()],
    });
    control.push(MakerspaceGroup);
  }
  BuildForm() {
    this.formGroup = this.fb.group({
      describe_yourself: [this.ProfileInfo.describe_yourself, Validators.maxLength(140)],
      bio: [this.ProfileInfo.bio, Validators.maxLength(800)],
      started_making: [this.ProfileInfo.started_making, Validators.maxLength(800)],
      field_add_your_makerspace_s_: this.fb.array([],Validators.maxLength(10)),
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
      }, () => {
        if (this.CurrentLoggedUserId == this.uid)
          this.profilePictureService.update(this.profile.user_photo);
      }
    )
  }
  SetUser(user: UserProfile) {
    this.profile = user;
    this.FileName = user.user_photo.substring(user.user_photo.lastIndexOf('/') + 1);
    this.ImageFile = new Image();
    this.ImageFile.src = user.user_photo;
    this.ProfileInfo.nickname = user.nickname;
    if (user.address) {
      this.ProfileInfo.address = user.address;
    }
    this.ProfileInfo.describe_yourself = user.describe_yourself;
    if (user.bio) {
      this.ProfileInfo.bio = user.bio;
    }
    this.ProfileInfo.address_publish = user.address_publish;
    if (!this.ProfileInfo.address_publish) {
      this.ProfileInfo.address_publish = 1;
    }
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
    this.BuildForm();
    this.buildFormSocial();
    this.AssignParentChildInterests();
    for (let social in this.ProfileInfo.field_social_accounts) {
      if ((social != 'field_website_or_blog' && social != 'field_additional_site' && social != 'field_website_title' && social != 'field_blog_title') && this.ProfileInfo.field_social_accounts[social]) {
        this.emptySocial = false;
      }
    }
  }
  CheckFields() {
    if (this.uid == this.CurrentLoggedUserId) {
      for (let element in this.emptySection) {
        this.emptySection[element] = false;
      }
    } else {

    }
  }
  ToggleProfile() {
    this.mobileToggle = !this.mobileToggle;
  }
  nextTab() {
    this.CurrentInfoTab = this.ModalTabs[this.ModalTabs.indexOf(this.CurrentInfoTab) + 1]
  }
  over(socialActive:string){
    this.currentHover = socialActive;
  }
  leave(){
    this.currentHover = '';    
  }
}