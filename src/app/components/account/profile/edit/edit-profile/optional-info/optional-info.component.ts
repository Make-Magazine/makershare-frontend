import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { UserProfile } from "../../../../../../models/profile/userprofile";
import { ProfileService } from '../../../../../../d7services/profile/profile.service';
import { ViewService } from '../../../../../../d7services/view/view.service';
import { CustomValidators } from 'ng2-validation';
import { Observable } from 'rxjs/Observable';
import { URLNoProtocol } from '../../../../../../validations/url-no-protocol.validation';


@Component({
  selector: 'app-optional-info',
  templateUrl: './optional-info.component.html',
})
export class OptionalInfoComponent implements OnInit {

  @Output() emitter = new EventEmitter();
  @Input() userProfile: UserProfile;

  optionalForm:FormGroup;

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
    this.BuildForm();
  }

  BuildForm(){
    console.log(this.userProfile);
    this.optionalForm = this.fb.group({
      field_add_your_makerspace_s_:this.fb.array([]),
      field_social_accounts:this.fb.group({
        field_website_or_blog:[this.userProfile.field_social_accounts.field_website_or_blog,URLNoProtocol()],
        field_additional_site:[this.userProfile.field_social_accounts.field_additional_site,URLNoProtocol()],
        field_facebook:[this.userProfile.field_social_accounts.field_facebook,URLNoProtocol()],
        field_instagram:[this.userProfile.field_social_accounts.field_instagram,URLNoProtocol()],
        field_linkedin:[this.userProfile.field_social_accounts.field_linkedin,URLNoProtocol()],
        field_twitter:[this.userProfile.field_social_accounts.field_twitter,URLNoProtocol()],
        field_pinterest:[this.userProfile.field_social_accounts.field_pinterest,URLNoProtocol()],
        field_youtube:[this.userProfile.field_social_accounts.field_youtube,URLNoProtocol()],
        field_hackster_io:[this.userProfile.field_social_accounts.field_hackster_io,URLNoProtocol()],
        field_instructables:[this.userProfile.field_social_accounts.field_instructables,URLNoProtocol()],
        field_hackday:[this.userProfile.field_social_accounts.field_hackday,URLNoProtocol()],
        field_preferred:[this.userProfile.field_social_accounts.field_preferred],
      })
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
      field_makerspace_url:[makerspace && makerspace.field_makerspace_url? makerspace.field_makerspace_url:'', URLNoProtocol()],
      id:[makerspace? makerspace.id:'',Validators.required]
    });
    control.push(MakerspaceGroup);
  }

}

