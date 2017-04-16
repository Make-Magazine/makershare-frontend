import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { UserProfile } from "../../../../../../models/profile/userprofile";
import { ProfileService } from '../../../../../../d7services/profile/profile.service';
import { ViewService } from '../../../../../../d7services/view/view.service';
import { FileEntity } from '../../../../../../models';
import { CustomValidators } from 'ng2-validation';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-optional-info',
  templateUrl: './optional-info.component.html',
})
export class OptionalInfoComponent implements OnInit {

  @Output() emitter = new EventEmitter();
  @Output() CoverImage = new EventEmitter();
  @Input() userProfile: UserProfile;

  optionalForm:FormGroup;
  FileEntityObject:FileEntity;
  allIntersets: Array<any>;

  SearchMakerspace = (text$: Observable<string>) =>{
    return text$
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((term) => 
        {
          if(term.length > 1){
            return this.viewService.getView('api_makerspaces',[['search', term]])
            .map(result => {
              if(result.length == 0){
              }
              return result;
            })
          }
          return [];
        }
      )
  };

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private viewService:ViewService,
  ) { }

  ngOnInit() {
    this.FileEntityObject = {
      filename:'',
      file:'',
    }
    this.profileService.getAllInterests().subscribe(Interests=>{
      this.allIntersets = Interests;
      this.BuildForm();
    });
    
  }

  BuildForm(){
    this.FileEntityObject.file = this.userProfile.user_photo;
    this.optionalForm = this.fb.group({
      maker_interests:[this.userProfile.maker_interests? this.userProfile.maker_interests:[],],
      bio:this.userProfile.bio,
      started_making:this.userProfile.started_making,
      field_social_accounts:this.fb.group({
        field_website_or_blog:[this.userProfile.field_social_accounts.field_website_or_blog,CustomValidators.url],
        field_additional_site:[this.userProfile.field_social_accounts.field_additional_site,CustomValidators.url],
        field_facebook:[this.userProfile.field_social_accounts.field_facebook,CustomValidators.url],
        field_instagram:[this.userProfile.field_social_accounts.field_instagram,CustomValidators.url],
        field_linkedin:[this.userProfile.field_social_accounts.field_linkedin,CustomValidators.url],
        field_twitter:[this.userProfile.field_social_accounts.field_twitter,CustomValidators.url],
        field_pinterest:[this.userProfile.field_social_accounts.field_pinterest,CustomValidators.url],
        field_youtube:[this.userProfile.field_social_accounts.field_youtube,CustomValidators.url],
        field_hackster_io:[this.userProfile.field_social_accounts.field_hackster_io,CustomValidators.url],
        field_instructables:[this.userProfile.field_social_accounts.field_instructables,CustomValidators.url],
        field_hackday:[this.userProfile.field_social_accounts.field_hackday,CustomValidators.url],
        field_preferred:[this.userProfile.field_social_accounts.field_preferred],
      }),
      field_add_your_makerspace_s_:this.fb.array([]),
    });
    if(this.userProfile.field_add_your_makerspace_s_){
      this.userProfile.field_add_your_makerspace_s_.forEach((makerspace,index) => {
        this.AddMakerspaceRow(makerspace);
      });
    }
    this.optionalForm.valueChanges.subscribe(values=>{
      if(this.optionalForm.valid && this.optionalForm.dirty){
        this.userProfile.uid = +localStorage.getItem("user_id");
        this.userProfile = values;
        this.emitter.emit(this.userProfile);
      }else{
        this.emitter.emit(false);
      }
    });
  }

  SelectMakerspace(index:number,event){
    let makerspace = event.item;
    event.preventDefault();
    const field_add_your_makerspace_s_ = <FormArray>this.optionalForm.controls['field_add_your_makerspace_s_'];
    field_add_your_makerspace_s_.controls[index]['controls'].id.setValue(makerspace.id);
    field_add_your_makerspace_s_.controls[index]['controls'].field_makerspace_name.setValue(makerspace.title);
  }

  AddMakerspaceRow(makerspace?){
    const control = <FormArray>this.optionalForm.controls['field_add_your_makerspace_s_'];
    let MakerspaceGroup:FormGroup = this.fb.group({
      field_makerspace_name:[makerspace? makerspace.field_makerspace_name:'',Validators.required],
      field_makerspace_url:[makerspace && makerspace.field_makerspace_url? makerspace.field_makerspace_url:'', CustomValidators.url],
      id:[makerspace? makerspace.id:'',Validators.required]
    });
    control.push(MakerspaceGroup);
  }

  onFileChange(event){
    this.FileEntityObject = {file:'',filename:''};
    this.CoverImage.emit(undefined);
    if(event.target.files.length == 0) return;
    let file = event.target.files[0];
    this.ConvertToBase64(file,this.FileEntityObject,this.CoverImage);
  }

  public ConvertToBase64(file,FileEntityObject,CoverImage){
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      let img = new Image();
      img.src = reader.result;
      if(img.width < 600 && img.height < 600){
        // display error image size
        return;
      }
      FileEntityObject.filename = file.name;
      FileEntityObject.file = reader.result;
      CoverImage.emit(FileEntityObject);
    };    
   }

}

