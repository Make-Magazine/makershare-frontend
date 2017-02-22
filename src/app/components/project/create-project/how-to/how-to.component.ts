import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Validators, ReactiveFormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms'
import { CustomValidators } from 'ng2-validation'

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
})
export class HowToComponent implements OnInit {

@Output() HowTo = new EventEmitter();
  HowToForm: FormGroup;
  OtherProjctVideo: FormControl;


  constructor(
    private fb: FormBuilder,
  ) { 
    this.HowTo.emit(this.HowToForm);
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
   this.HowToForm = this.fb.group({
     'OtherProjctVideo': [this.OtherProjctVideo, [CustomValidators.url]],
   });
   this.HowToForm.valueChanges.subscribe(data => this.onValueChanged(data));
   this.onValueChanged(); // (re)set validation messages now
 }
 onValueChanged(data?: any) {
    if (!this.HowToForm) { return; }
    const form = this.HowToForm;
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
    if(this.HowToForm.valid){
      this.HowTo.emit(this.HowToForm);
    }else{
      this.HowTo.emit(false);
    }
  }

  formErrors = {
     'OtherProjctVideo': '',
   };

   validationMessages = {
     'OtherProjctVideo': {
       'url': 'Please enter a valid url, ex: http://example.com.',
     },
   };
}
