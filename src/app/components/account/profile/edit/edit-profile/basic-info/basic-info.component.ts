import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserProfile } from "../../../../../../models/profile/userprofile";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../../../../../d7services/profile/profile.service';
import { IcDatepickerOptionsInterface } from 'ic-datepicker/dist';

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
  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private router: Router
  ) {


  }

  ngOnInit() {
    this.buildForm();

    this.datepickerOptions = {
      position: 'top'
    };


    this.profileService.getAllCountries().subscribe(countries => {
      for (var k in countries) {
        this.allCountries.push({ value: k, label: countries[k] });
      }

     
    }, err => {
      console.log("error");
      console.log(err);
    });
  }

  public setCountry(value: any): void {
    console.log(value);
    this.profileService.getByCountry(value).subscribe(info => {
      console.log(info);
      if (info.administrative_area_label == "Governorate") {
        this.isCity = true
      } else {
        this.isCity = false
      }

      this.postalCode = false;
      this.zipCode = false;        
      // postal_code & zip_code
      for(var k in info.used_fields){
        if(info.used_fields[k] == "postal_code"){
          this.postalCode = true;        
        }
        if(info.used_fields[k] == "zip_code"){
          this.zipCode = true;        
        }        
      }
      
      this.items = [];
      for (var k in info.administrative_areas) {
        this.items.push(info.administrative_areas[k]);
      }

    }, err => {
      console.log("error");
      console.log(err);
    });
  }

  public cou(value: any): void {
    console.log('Removed value is: ', value);
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  public refreshValue(value: any): void {
    console.log('Selected value is: ', value);
  }
  buildForm(): void {
    this.basicForm = this.fb.group({
      'field_nickname': ['', [Validators.required]],
      'field_first_name': ['', [Validators.required]],
      'field_last_name': ['', [Validators.required]],
      'field_address': this.fb.group({
        'country': ['', [Validators.required]],
        'state': ['', [Validators.minLength(4)]],
        'city': ['', []],
        'postal_code': ['', ''],
        'zip_code': ['', '']
      }),
      'field_address_publish': ['', [Validators.required, Validators.minLength(4)]],
      'field_describe_yourself': ['', [Validators.required, Validators.minLength(60)]],
      'field_birthday_date': ['',],
      'mail': ['', [Validators.required]],
      'field_birthday_status': [''],
      'field_newsletter_subscription': ['']
    });
    this.basicForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.basicForm) { return; }
    const form = this.basicForm;
    this.saveBasic.emit(this.basicForm);

  }


}
