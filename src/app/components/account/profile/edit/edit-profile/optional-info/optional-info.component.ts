import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { UserProfile } from "../../../../../../models/profile/userprofile";

@Component({
  selector: 'app-optional-info',
  templateUrl: './optional-info.component.html',
  //styleUrls: ['./optional-info.component.css']
})
export class OptionalInfoComponent implements OnInit {

  @Output() saveOptional = new EventEmitter<any>();


  optionalForm: FormGroup;
  imageSrc: string = "http://placehold.it/100x100";

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  initMakerspace() {
    return this.fb.group({
      field_makerspace_name: [''],
      field_makerspace_url: ['']
    });
  }

  onFileChange(event: Event) {
    let file = (<any>event.target).files[0];
    if (!file) {
      return;
    }


    let reader = new FileReader();
    reader.onload = (e) => {
      this.imageSrc = reader.result;
    //  this.optionalForm.controls['field_user_photo'].value = reader.result;
    };
    reader.readAsDataURL(file);
  }
  addMakerspace() {
    const control = <FormArray>this.optionalForm.controls['addresses'];
    control.push(this.initMakerspace());
  }

  buildForm(): void {
    this.optionalForm = this.fb.group({
      'field_user_photo': [''],
      'field_maker_interests': [''],
      'field_bio': [''],
      'field_started_making': [''],
      field_add_your_makerspace_s_: this.fb.array([
        this.initMakerspace(),
      ]),
      'field_social_accounts': this.fb.group({
        field_website_or_blog: [''],
        field_additional_site: [''],
        field_facebook: [''],
        field_instagram: [''],
        field_linkedin: [''],
        field_twitter: [''],
        field_pinterest: [''],
        field_youtube: [''],
        field_hackster_io: [''],
        field_instructables: [''],
        field_hackday: ['']
      })
    });
    this.optionalForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.optionalForm) { return; }
    const form = this.optionalForm;
    this.saveOptional.emit(this.optionalForm.value);
  }
  formSubmit(values) {
    console.log(values);
  }
}

