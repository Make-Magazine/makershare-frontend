import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  @Output() saveBasic = new EventEmitter<any>();

  basicForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
  }


  buildForm(): void {
    this.basicForm = this.fb.group({
      'field_nickname': ['', [Validators.required]],
      'field_first_name': ['', [Validators.required]],
      'field_last_name': ['', [Validators.required]],
      'field_address': this.fb.group({
        'country': ['', [Validators.required]],
        'state': ['', [Validators.required, Validators.minLength(4)]],
        'city': ['', [Validators.required]]
      }),
      'field_address_publish': ['', [Validators.required, Validators.minLength(4)]],
      'field_describe_yourself': ['', [Validators.required, Validators.minLength(60)]],
      'field_birthday_date': ['', [Validators.required]],
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
