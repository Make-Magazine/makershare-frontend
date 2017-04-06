import { DISABLED } from '@angular/forms/src/model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserProfile } from "../../../../../../models/profile/userprofile";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../../../../../d7services/profile/profile.service';
import { IcDatepickerOptionsInterface } from 'ic-datepicker/dist';
import { value } from '../../../../../../models/challenge/comment';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {

  @Output() saveBasic = new EventEmitter<any>();
  @Input() profile: UserProfile;
  basicForm: FormGroup;
  allCountries: any = [];
  datepickerOptions: IcDatepickerOptionsInterface;
  isCity: boolean = false;
  items: any[] = [];
  postalCode = false;
  zipCode = false;
  disableBD = false;
  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private router: Router
  ) {


  }

  ngOnInit() {
    this.buildForm();
    this.datepickerOptions = {
      position: 'top',
      attrs:{}
    };

    this.profileService.getAllCountries().subscribe(countries => {
      for (var k in countries) {
        this.allCountries.push({ value: k, label: countries[k] });
      }


    }, err => {
      // console.log("error");
      // console.log(err);
    });
  }

  public setCountry(value: any): void {
    // console.log(value);
    this.profileService.getByCountry(value).subscribe(info => {
      // console.log(info);

      this.postalCode = false;
      this.zipCode = false;  
      this.isCity = false    
      // city, postal_code & zip_code
      for(var k in info.used_fields){
        if(info.used_fields[k] == "postal_code"){
          this.postalCode = true; 
          this.basicForm.value.address.postal_code = '';
        }
        if(info.used_fields[k] == "zip_code"){
          this.zipCode = true;
          this.basicForm.value.address.zip_code = '';
        }  
        if(info.used_fields[k] == "administrative_area"){       
          this.isCity = true;
          this.basicForm.value.address.city = '';
        }        
      }
      
      this.items = [];
      for (var k in info.administrative_areas) {
        this.items.push(info.administrative_areas[k]);
      }

    }, err => {
      // console.log("error");
      // console.log(err);
    });
  }

  public cou(value: any): void {
    
  }

  public typed(value: any): void {
    
  }

  public refreshValue(value: any): void {
    
  }
  buildForm(): void {
    this.basicForm = this.fb.group({
      'nickname': ['', [Validators.required]],
      'first_name': ['', [Validators.required]],
      'last_name': ['', [Validators.required]],
      'address': this.fb.group({
        'country': ['', [Validators.required]],
        'state': ['', [Validators.minLength(4)]],
        'city': ['', []],
        'postal_code': ['', [Validators.required, Validators.minLength(5)]],
        'zip_code': ['', '']
      }),
      'address_publish': ['', [Validators.required, Validators.minLength(4)]],
      'describe_yourself': ['', [Validators.required, Validators.maxLength(60)]],
      'birthday_date': new FormControl({value: '', disabled: this.disableBD}, Validators.required),
      'mail': ['', [Validators.required]],
      'birthday_status': [''],
      'newsletter_subscription': ['']
    });
    this.basicForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }



  /**
   * an object to store the error messages for each field 
   * this is usefull if we has multiple errors for each field
   */
  formErrors = {
    'nickname': '',
    'first_name': '',
    'last_name': '',
    'address': {
      'country': '',
      'state': '',
      'city': ''
    },
    'address_publish': '',
    'describe_yourself': '',
    'birthday_date': '',
    'mail': '',
    'birthday_status': '',
    'newsletter_subscription': ''
  };

  /**
   * the error messages to set in formerrors foreach field and also for each validator
   this way is good to save deffirent error messages for each validation
   */
  validationMessages = {
    'nickname': {
      'required': 'nick Name is required.'
    },
    'first_name': {
      'required': 'first name is required.'
    },
    'last_name': {
      'required': 'last name is required.'
    }
    ,
    'address': {
      'country': {
        'required': 'country is required.'
      },
      'state': {
        'required': 'state is required.'
      }
    },
    'address_publish': {
      'required': 'address publish is required.'
    },
    'describe_yourself': {
      'required': 'describe yourself is required.',
      'maxlength': 'field describe yourself is required (maximum 60characters).'
    },
    'birthday_date': '',
    'mail': {
      'required': 'Email is required.'
    }
  };
  disableBirthDate(event :any){
     
     if(!this.basicForm.value["birthday_status"]){
       this.basicForm.controls["birthday_date"].reset();
       this.disableBD = true;
       this.datepickerOptions.attrs.readonly = true;
     }else{
       this.disableBD = false;
       this.datepickerOptions.attrs.readonly = false;
     }
     
  }
  onValueChanged(data?: any) {
    
    if (!this.basicForm) { return; }
    const form = this.basicForm;
    this.saveBasic.emit(this.basicForm);
    if (form != null) {
      for (const field in this.formErrors) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && (control.dirty || data=="save") && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }

  }

}
