import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { UserProfile } from "../../../../../../models/profile/userprofile";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from '../../../../../../d7services/profile/profile.service';
import { ViewService } from '../../../../../../d7services/view/view.service';
import { Observable } from 'rxjs/Observable';
import { CustomValidators } from 'ng2-validation';
import { IcDatepickerOptionsInterface } from 'ic-datepicker';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
})
export class BasicInfoComponent implements OnInit {
  @Input() userProfile: UserProfile;
  @Output() emitter = new EventEmitter();

  basicForm: FormGroup;
  CountryFieldsAndDetails;
  CountriesList=[];
  datepickerOptions: IcDatepickerOptionsInterface;
  
  SearchCountry = (text$: Observable<string>) => {
    return text$
      .debounceTime(300)
      .distinctUntilChanged()
      .map((term) => {
        if (term.length > 1) {
          let res = this.CountriesList.filter(element => new RegExp(term, 'gi').test(element.value)).splice(0, 10);
          if (res) {
            return res;
          }
        }
        return [];
      })
  };
  constructor(
    private profileService: ProfileService,
    private viewService:ViewService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.datepickerOptions = {
      modelType: 'string',
      // adjust the correct form
      stringModelFormat:'YYYY-MM-DD'
    };
    this.viewService.getView('maker_address_api').subscribe(countries=>{
      this.CountriesList = countries;
    });
    if(this.userProfile.address.code){
      this.viewService.getView('maker_address_api/' + this.userProfile.address.code).subscribe((data) => {
        this.CountryFieldsAndDetails = data;
        this.MigrateCountryDetails();
        this.buildForm();
      });
    }else{
      this.buildForm();
    }
  }
  GetCountryDetails(event){
    let code = event.item.key;
    event.preventDefault();
    this.viewService.getView('maker_address_api/' + code).subscribe((data) => {
      this.CountryFieldsAndDetails = 'YYYY-MM-DDdata';
    });
  }

  MigrateCountryDetails(){
    if(this.CountryFieldsAndDetails.used_fields.indexOf('postal_code') != -1){
      if(this.userProfile.address.postal_code){
        this.userProfile.address.zip_code = this.userProfile.address.postal_code.toString();
      }else if(this.userProfile.address['postcode']){
        this.userProfile.address.zip_code = this.userProfile.address['postcode'];
      }
    }
    if(this.CountryFieldsAndDetails.used_fields.indexOf('locality') != -1){
      this.userProfile.address.city = this.userProfile.address[this.CountryFieldsAndDetails.locality_label.toLowerCase()]
    }
    if(this.CountryFieldsAndDetails.administrative_areas){
      this.userProfile.address.governorate = this.userProfile.address[this.CountryFieldsAndDetails.administrative_area_label.toLowerCase()];
    }
  }

  buildForm(): void {
    this.basicForm = this.fb.group({
      'nickname': [this.userProfile.nickname],
      'first_name': [this.userProfile.first_name, [Validators.required]],
      'last_name': [this.userProfile.last_name, [Validators.required]],
      'address_publish': [this.userProfile.address_publish == 1? true:false],
      'describe_yourself': [this.userProfile.describe_yourself, [Validators.required, Validators.maxLength(60)]],
      'birthday_date': ['', Validators.required],
      'mail': [this.userProfile.mail, [Validators.required,CustomValidators.email]],
      'newsletter_subscription': [true],
      'address': this.fb.group({
        'country': [this.userProfile.address.country, [Validators.required]],
        'governorate': [this.userProfile.address.governorate],
        'city': [this.userProfile.address.city],
        'postal_code': [this.userProfile.address.zip_code, [Validators.minLength(5)]],
      }),
    });
    this.basicForm.valueChanges.subscribe(values=>{
      if(this.basicForm.valid){
        this.userProfile = values;
        this.userProfile.uid = +localStorage.getItem('user_id');
        values.address_publish? this.userProfile.address_publish = 1:this.userProfile.address_publish = 0;
        values.newsletter_subscription? this.userProfile.newsletter_subscription = 1:this.userProfile.newsletter_subscription = 0;
      }
      this.emitter.emit(this.basicForm.valid);
      this.onValueChanged(this.basicForm,this.formErrors,this.validationMessages);
    });
  }

  onValueChanged(form, formErrors, validationMessages) {
    console.log(form);
    if(form.value.birthday_date != ''){
      form.value.birthday_date = form.value.birthday_date + ' 00:00:00';
    }
    console.log(form);
    if (!this.basicForm) { return; }
    for (const field in formErrors) {
      if (typeof formErrors[field] === 'string') {
        formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = validationMessages[field];
          for (const key in control.errors) {
            formErrors[field] += messages[key] + ' ';
          }
        }
      } else {
        for(let index of form.get(field).controls){
          let element = form.get(field).controls[index];
          this.onValueChanged(element, formErrors[field][index], validationMessages[field]);
        }
      }
    }
  }


  /**
   * an object to store the error messages for each field 
   * this is usefull if we has multiple errors for each field
   */
  formErrors = {
    'first_name': '',
    'last_name': '',
    'describe_yourself': '',
    'birthday_date': '',
    'mail': '',
    'address': {
      'country': '',
    },
  };

  /**
   * the error messages to set in formerrors foreach field and also for each validator
   this way is good to save deffirent error messages for each validation
   */
  validationMessages = {
    'first_name': {
      'required': 'first name is required.'
    },
    'last_name': {
      'required': 'last name is required.'
    },
    'describe_yourself': {
      'required': 'describe yourself is required.',
      'maxlength': 'field describe yourself is required (maximum 60characters).'
    },
    'mail': {
      'required': 'Email is required.',
      'email': 'Email is not valid.'
    },
    'birthday_date':{
      'required':'birthday_date is required'
    },
    'address': {
      'country': {
        'required': 'country is required.'
      },
    },
  };
}
