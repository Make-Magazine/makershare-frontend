import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';
import { Observable } from 'rxjs/Observable';
import { URLNoProtocol } from '../../../../angular/validations/url-no-protocol.validation';
import { FileEntityManage, NodeHelper } from '../../../../core';
import { NotificationBarService, NotificationType } from 'ngx-notification-bar/release';
import {
  FileService,
  MainService,
  ProfileService,
  StatisticsService,
  UserService,
  ViewService,
} from '../../../../core/d7services';
import { ProfileSocial } from '../../../../core/models/profile/profile-social';
import { UserProfile } from '../../../../core/models/profile/user-profile';
import { Auth } from '../../../auth0/auth.service';
import { ProfilePictureService } from '../../../shared/profile-picture/profile-picture.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  searchFailed: boolean = false;
  canCreateOrNot = false;
  CurrentLoggedUserId: number;
  formGroup: FormGroup;
  FormGroupSocial: FormGroup;

  no_of_followers: number;
  numberFollowing: number;
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
    bio: false,
    started_making: false,
  };

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
    bioShort: '',
    field_social_accounts: new ProfileSocial(),
    started_making: '',
    started_making_short: '',
    field_add_your_makerspace_s_: [],
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
    'Interests',
  ];
  DefaultView: string = 'grid';
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
  };
  CountriesList = [];

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private viewService: ViewService,
    private fileService: FileService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public auth: Auth,
    private mainService: MainService,
    private profilePictureService: ProfilePictureService,
    private statisticsService: StatisticsService,
    private title: Title,
    private meta: Meta,
	 private notificationBarService: NotificationBarService,
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

  @ViewChild('cropper')
  set cropper(cropper: ImageCropperComponent) {
    setTimeout(() => {}, 1000);
  }

  formatter = x => {
    if (x.value) {
      return x.value;
    }
    return x;
  };

  SearchCountry = (text$: Observable<string>) => {
    return text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => (this.searchFailed = false))
      .map(term => {
        if (term.length > 1) {
          const res = this.CountriesList
            .filter(element => new RegExp(term, 'gi').test(element.value))
            .splice(0, 10);
          if (res) {
            return res;
          }
          this.searchFailed = true;
        }
        return [];
      });
  };

  buildFormSocial() {
    this.FormGroupSocial = this.fb.group({
      field_website_or_blog: [
        this.profile.field_social_accounts.field_website_or_blog,
        [URLNoProtocol()],
      ],
      field_additional_site: [
        this.profile.field_social_accounts.field_additional_site,
        [URLNoProtocol()],
      ],
      field_facebook: [
        this.profile.field_social_accounts.field_facebook,
        [URLNoProtocol()],
      ],
      field_instagram: [
        this.profile.field_social_accounts.field_instagram,
        [URLNoProtocol()],
      ],
      field_linkedin: [
        this.profile.field_social_accounts.field_linkedin,
        [URLNoProtocol()],
      ],
      field_twitter: [
        this.profile.field_social_accounts.field_twitter,
        [URLNoProtocol()],
      ],
      field_pinterest: [
        this.profile.field_social_accounts.field_pinterest,
        [URLNoProtocol()],
      ],
      field_youtube: [
        this.profile.field_social_accounts.field_youtube,
        [URLNoProtocol()],
      ],
      field_hackster_io: [
        this.profile.field_social_accounts.field_hackster_io,
        [URLNoProtocol()],
      ],
      field_instructables: [
        this.profile.field_social_accounts.field_instructables,
        [URLNoProtocol()],
      ],
      field_hackday: [
        this.profile.field_social_accounts.field_hackday,
        [URLNoProtocol()],
      ],
      field_github: [
        this.profile.field_social_accounts.field_github,
        [URLNoProtocol()],
      ],
      field_twitch: [
        this.profile.field_social_accounts.field_twitch,
        [URLNoProtocol()],
      ],
      field_gitlabs: [
        this.profile.field_social_accounts.field_gitlabs,
        [URLNoProtocol()],
      ],
      field_thingyverse: [
        this.profile.field_social_accounts.field_thingyverse,
        [URLNoProtocol()],
      ],
      field_stackoverflow: [
        this.profile.field_social_accounts.field_stackoverflow,
        [URLNoProtocol()],
      ],
      field_preferred: [this.profile.field_social_accounts.field_preferred],
      field_website_title: [
        this.profile.field_social_accounts.field_website_title,
      ],
      field_blog_title: [this.profile.field_social_accounts.field_blog_title],
    });
  }

  ngOnInit() {
    this.canCreateOrg();
    this.CurrentInfoTab = 'Personal Info';
    this.currentHover = '';
    this.PhotoModalTab = 'upload';
    const userName = this.route.snapshot.params['user_name'];
    this.userService.getStatus().subscribe(data => {
      if (data.user.uid > 0) {
        this.CurrentLoggedUserId = data.user.uid;
      }
    });

    // check if navigating to profile with username paramter => get uid from name else get uid from local storage
    if (userName) {
      this.userService.getIdFromUrl(userName).subscribe(
        res => {
          this.uid = res.uid;
          this.GetUserDetails();
        },
        err => {
          this.router.navigate(['**']);
        },
      );
    } else {
      this.uid = +localStorage.getItem('user_id');
      this.GetUserDetails();
    }
    if (window.innerWidth < 768) {
      this.mobileToggle = true;
    }

    window.onresize = e => {
      if (window.innerWidth < 768) {
        this.mobileToggle = true;
      } else {
        this.mobileToggle = false;
      }
    };
  }

  isEmpty(variable: any): boolean {
    const empty = Object.keys(variable).every(function(key) {
      if (
        key == 'field_website_title' ||
        key == 'field_blog_title' ||
        key == 'field_preferred' ||
        key == 'field_website_or_blog' ||
        key == 'field_additional_site'
      ) {
        return true;
      }
      return variable[key] == '' || variable[key] == null;
    });
    return empty;
  }

  SelectFileAndSave(
    closebtn: HTMLButtonElement,
    SelectedFile: FileEntityManage,
  ) {
    closebtn.click();
    const user: UserProfile = {
      uid: this.uid,
      user_photo: SelectedFile.fid.toString(),
    };
    this.SaveUser(user);
  }

  GetUserDetails() {
    if (!this.uid) {
      this.router.navigate(['**']);
      return;
    }

    const tasks = [];
    const body = { data: this.uid };
    tasks.push(
      this.viewService.getView('api_user_badges', [['uid', this.uid]]),
    );
    tasks.push(this.viewService.getView('projects_categories'));
    tasks.push(
      this.mainService.custompost(
        'maker_count_all_projects/retrieve_count_project_public',
        body,
      ),
    );
    tasks.push(
      this.mainService.custompost(
        'maker_count_all_projects/retrieve_count_project_private',
        body,
      ),
    );
    tasks.push(
      this.mainService.custompost(
        'maker_count_all_projects/retrieve_count_project_draft',
        body,
      ),
    );

    tasks.push(this.viewService.getView('maker_address_api'));
    Observable.forkJoin(tasks).subscribe(data => {
      let index = 0;
      this.badges = data[index++] as Array<any>;
      this.allIntersets = data[index++] as Array<any>;
      this.ProjectsCountPublic = data[index++][0] as number;
      this.ProjectsCountPrivate = data[index++][0] as number;
      this.ProjectsCountDraft = data[index++][0] as number;
      this.CountriesList = data[index++] as Array<any>;
      this.UpdateUser();
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
      if (
        interest.parent_tid &&
        interest.parent_tid == this.SelectedParentInterest &&
        this.ProfileInfo.maker_interests
          .map(element => element.tid)
          .indexOf(interest.tid) == -1
      ) {
        this.ChildrenIntersets.push(interest);
      }
    });
  }

  SetInterest(ParentInterestElement: HTMLSelectElement) {
    this.ProfileInfo.maker_interests.push(
      this.allIntersets[
        this.allIntersets
          .map(element => element.tid)
          .indexOf(this.SelectedChildInterest)
      ],
    );
    // if(this.ProfileInfo.maker_interests.map(element=>element.tid).indexOf(this.SelectedParentInterest) == -1){
    //   this.ProfileInfo.maker_interests.push(this.allIntersets[this.allIntersets.map(element=>element.tid).indexOf(this.SelectedParentInterest)]);
    // }
    ParentInterestElement.value = '_none';
    delete this.SelectedChildInterest;
    delete this.SelectedParentInterest;
    this.AssignParentChildInterests();
  }

  RemoveInterest(InterestId: number): void {
    this.ProfileInfo.maker_interests.splice(
      this.ProfileInfo.maker_interests
        .map(term => term.tid)
        .indexOf(InterestId),
      1,
    );
  }

  OpenModal(Template, ModalName: string) {
    if (ModalName == 'Portfolio Photo') {
      this.modalService.open(Template, { size: 'lg' });
      this.CurrentInfoTab = ModalName;
    } else {
      if (ModalName == 'MakerSpaces') {
        const control = <FormArray>this.formGroup.controls[
          'field_add_your_makerspace_s_'
        ];
        if (control.controls.length == 0) {
          this.AddMakerspaceRow();
        }
      }
      this.CurrentInfoTab = ModalName;
      this.modalService.open(Template, { size: 'lg' });
    }
  }

  dragFileAccepted(acceptedFile, cropper) {
    this.fileChangeListener(acceptedFile.file, cropper);
  }

  fileChangeListener(file: File, cropper) {
    if (!file) {
      return;
    }
    this.ProfilePicData = {};
    this.FileName = file.name;
    const image: any = new Image();
    const myReader: FileReader = new FileReader();
    myReader.onloadend = function(loadEvent: any) {
      image.src = loadEvent.target.result;
      cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
  }

  SaveImage() {
    const image = {
      file: NodeHelper.RemoveFileTypeFromBase64(this.ProfilePicData.image),
      filename: this.FileName,
    };
    this.fileService.SendCreatedFile(image).subscribe(data => {
      this.ProfileInfo.uid = this.uid;
      this.ProfileInfo.user_photo = data.fid;
      this.ProfilePicData = {};
      this.FileName = '';
      this.SaveUser(this.ProfileInfo);
    });
  }

  ReSetAddressValues() {
    if (this.CountryFieldsAndDetails['administrative_areas']) {
      const administrative_area_label = this.CountryFieldsAndDetails.administrative_area_label.toLowerCase();
      if (!this.ProfileInfo.address[administrative_area_label]) {
        this.ProfileInfo.address.governorate = '_none';
      } else {
        this.ProfileInfo.address.governorate = this.profile.address[
          administrative_area_label
        ];
      }
    }
  }

  SaveInfo(closebtn: HTMLButtonElement) {
    if (this.ProfileInfo.address.governorate == '_none') {
      this.ProfileInfo.address.governorate = this.CountryFieldsAndDetails[
        'administrative_areas'
      ][0].value;
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
    if (!CountryKey) {
      return;
    }
    this.viewService
      .getView('maker_address_api/' + CountryKey)
      .subscribe(data => {
        this.CountryFieldsAndDetails = data;
        this.ReSetAddressValues();
      });
  }

  canCreateOrg() {
    this.uid = +localStorage.getItem('user_id');
    const body = {
      uid: this.uid,
    };
    this.mainService
      .custompost('company_profile_api/check_if_user_has_org', body)
      .subscribe(res => {
        if (res[0] == 'can_not_create_org') {
          this.canCreateOrNot == false;
        } else if (res[0] == 'can_create_org') {
          this.canCreateOrNot = true;
        }
      });
  }

  AddMakerspaceRow(makerspace?) {
    const control = <FormArray>this.formGroup.controls[
      'field_add_your_makerspace_s_'
    ];
    const MakerspaceGroup: FormGroup = this.fb.group({
      field_makerspace_name: [
        makerspace ? makerspace.field_makerspace_name : '',
      ],
      field_makerspace_url: [
        makerspace && makerspace.field_makerspace_url
          ? makerspace.field_makerspace_url
          : '',
        URLNoProtocol(),
      ],
    });
    control.push(MakerspaceGroup);
  }

  BuildForm() {
    this.formGroup = this.fb.group({
      describe_yourself: [
        this.ProfileInfo.describe_yourself,
        Validators.maxLength(140),
      ],
      bio: [this.ProfileInfo.bio, Validators.maxLength(800)],
      started_making: [
        this.ProfileInfo.started_making,
        Validators.maxLength(800),
      ],
      field_add_your_makerspace_s_: this.fb.array([], Validators.maxLength(10)),
    });
    if (this.ProfileInfo.field_add_your_makerspace_s_) {
      this.ProfileInfo.field_add_your_makerspace_s_.forEach(
        (makerspace, index) => {
          this.AddMakerspaceRow(makerspace);
        },
      );
    }
  }

  UpdateUser() {
    this.userService.getUser(this.uid).subscribe(
      (profile: UserProfile) => {
        this.SetUser(profile);
        this.GetCountryDetails(profile.address.code);
      },
      err => {},
      () => {
        if (this.CurrentLoggedUserId == this.uid) {
          this.profilePictureService.update(this.profile.user_photo);
        }
      },
    );
  }

  SetUser(user: UserProfile) {
    this.profile = user;
    // this.meta.setTitle(`${this.profile.first_name} ${this.profile.last_name} | Maker Share`);
    // this.meta.setTag('og:image', this.profile.user_photo);
    // this.meta.setTag('og:description', this.customDescription);
    if (this.profile) {
      this.customDescription =
        this.profile.first_name +
        ' ' +
        this.profile.last_name +
        ' Learn all about about this Maker and their work.';
      this.title.setTitle(
        this.profile.first_name +
          ' ' +
          this.profile.last_name +
          ' | Maker Share',
      );
      this.meta.addTags([
        {
          name: 'og:description',
          content: this.customDescription,
        },
        {
          name: 'og:image',
          content: this.profile.user_photo,
        },
      ]);
    }
	 

    this.FileName = user.user_photo.substring(
      user.user_photo.lastIndexOf('/') + 1,
    );
	 console.log(this.FileName);
	 if(this.FileName == "profile-default.png") {
		this.notificationBarService.create({
		  message: 'Please upload a profile photo now to start creating projects.',
		  type: NotificationType.Warning,
		  autoHide: true,
		  allowClose: true,
		  hideOnHover: false,
		  isHtml: true,
		});
	 }
    this.ImageFile = new Image();
    this.ImageFile.src = user.user_photo;
    this.ProfileInfo.nickname = user.nickname;

    if (user.bio.length > 160) {
      this.ProfileInfo.bioShort = user.bio.substring(0, 160) + '...';
    } else {
      this.ProfileInfo.bioShort = user.bio;
    }

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
    this.ProfileInfo.field_add_your_makerspace_s_ =
      user.field_add_your_makerspace_s_;
    this.ProfileInfo.maker_interests = user.maker_interests;
    this.ProfileInfo.started_making = user.started_making;
    if (user.started_making.length > 160) {
      this.ProfileInfo.started_making_short =
        user.started_making.substring(0, 160) + '...';
    } else {
      this.ProfileInfo.started_making_short = user.started_making;
    }

    this.BuildForm();
    this.buildFormSocial();
    this.AssignParentChildInterests();
    for (const social in this.ProfileInfo.field_social_accounts) {
      if (
        social != 'field_website_or_blog' &&
        social != 'field_additional_site' &&
        social != 'field_website_title' &&
        social != 'field_blog_title' &&
        this.ProfileInfo.field_social_accounts[social]
      ) {
        this.emptySocial = false;
      }
    }
  }

  CheckFields() {
    if (this.uid == this.CurrentLoggedUserId) {
      for (const element in this.emptySection) {
        this.emptySection[element] = false;
      }
    } else {
    }
  }

  ToggleProfile() {
    this.mobileToggle = !this.mobileToggle;
  }

  nextTab() {
    this.CurrentInfoTab = this.ModalTabs[
      this.ModalTabs.indexOf(this.CurrentInfoTab) + 1
    ];
  }

  over(socialActive: string) {
    this.currentHover = socialActive;
  }

  leave() {
    this.currentHover = '';
  }
}
