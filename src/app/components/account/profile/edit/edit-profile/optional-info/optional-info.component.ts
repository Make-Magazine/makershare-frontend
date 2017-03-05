import { Component, OnInit,Input } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { UserProfile } from "../../../../../../models/profile/userprofile";

@Component({
  selector: 'app-optional-info',
  templateUrl: './optional-info.component.html',
  //styleUrls: ['./optional-info.component.css']
})
export class OptionalInfoComponent implements OnInit {

 @Input() profile:UserProfile={

 };


 optionalForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();  
  }

  buildForm(): void{
    this.optionalForm = this.fb.group({
      'field_user_photo': [this.profile.field_user_photo],
      'field_maker_interests': [''],
      'field_bio': [this.profile.field_bio],
      'field_started_making': [this.profile.field_started_making],
      'field_social_accounts': [this.profile.field_social_accounts],
    });
  }

  formSubmit(values){
    console.log(values);
  }
}

