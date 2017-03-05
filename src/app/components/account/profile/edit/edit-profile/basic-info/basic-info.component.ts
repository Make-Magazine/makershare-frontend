import { Component, OnInit, Input } from '@angular/core';
import { UserProfile } from "../../../../../../models/profile/userprofile";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {

  @Input() profile: UserProfile = {}
  basicProfileForm: FormGroup;
  nickname: FormControl;
  country: FormControl;
  state: FormControl;
  publish: FormControl;
  describe: FormControl;
  birthday: FormControl;
  email: FormControl;
  city: FormControl;
  birthdayCheck: FormControl;
  subscribe: FormControl;



  formErrors = {
    'nickname': '',
    'country': '',
    'state': '',
    'city': '',
    'publish': '',
    'describe': '',
    'birthday': '',
    'email': '',
    'subscribe': '',
    'birthdayCheck': ''
  };

  validationMessages = {
    'nickname': {
    },
    'country': {
      'required': 'country is required.'
    },
    'state': {
      'required': 'state is required.'
    },
    'city': {
      'required': 'city is required.'
    },
    'publish': {
      'required': 'publish is required.'
    },
    'describe': {
      'required': 'describe is required.'
    },
    'birthday': {
      'required': 'birthday is required.'
    },
    'email': {
      'required': 'Password is required.'
    }, 'birthdayCheck': {
      
    }, 'subscribe': {

    }

  };

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
  }


  buildForm(): void {
    this.basicProfileForm = this.fb.group({
      'nickname': [this.nickname, [Validators.required, Validators.minLength(4)]],
      'country': [this.country, [Validators.required]],
      'state': [this.state, [Validators.required, Validators.minLength(4)]],
      'city': [this.city, [Validators.required]],
      'publish': [this.publish, [Validators.required, Validators.minLength(4)]],
      'describe': [this.describe, [Validators.required, Validators.minLength(60)]],
      'birthday': [this.birthday, [Validators.required]],
      'email': [this.email, [Validators.pattern]],
      'birthdayCheck': [this.birthdayCheck, []],
      'subscribe': [this.subscribe, []]
    });
    this.basicProfileForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.basicProfileForm) { return; }
    const form = this.basicProfileForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }

  }


}
