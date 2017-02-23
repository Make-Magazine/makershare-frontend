import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Validators, ReactiveFormsModule, FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms'
import { CustomValidators } from 'ng2-validation'

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
})
export class HowToComponent implements OnInit {

@Output() HowTo = new EventEmitter();
  HowToForm: FormGroup;
  OtherProjctVideo: FormControl;
  HelpLookingFor: FormControl;
  Tools: FormControl;

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
     'HelpLookingFor': [this.OtherProjctVideo, []],
     'Tools': this.fb.array([]),
   });
   this.AddTool();
   this.HowToForm.valueChanges.subscribe(data => 
   {
    this.onValueChanged(this.HowToForm, this.formErrors,this.validationMessages);
    if(this.HowToForm.valid){
      this.HowTo.emit(this.HowToForm);
    }else{
      this.HowTo.emit(false);
    }
   });
   this.onValueChanged(this.HowToForm, this.formErrors, this.validationMessages); // (re)set validation messages now
 }

 AddTool() {
  const control = <FormArray>this.HowToForm.controls['Tools'];
  const addrCtrl = this.InitTool();
  let index = control.length;
  control.push(addrCtrl); 
  this.formErrors['Tools'].push(this.GetErrorStructure('Tools')); 
  /* subscribe to individual tool value changes */
}

RemoveTool(i: number) {
  const control = <FormArray>this.HowToForm.controls['Tools'];
  control.removeAt(i);
}

InitTool() {
  return this.fb.group({
    'SortOrder':['',CustomValidators.number],
    'Name': ['', Validators.required],
    'Url': ['', CustomValidators.url],
  });
}

ChangeOrder(CurrentIndex, NewIndex){
  const control = <FormArray>this.HowToForm.controls['Tools'];
  let currentrow = control.at(CurrentIndex);
  let newrow = control.at(NewIndex);
  control.setControl(CurrentIndex,newrow);
  control.setControl(NewIndex,currentrow);
}

 onValueChanged(form, formErrors, validationMessages) {
    for (const field in formErrors) {
      // clear previous error message (if any)
      if(typeof formErrors[field] === 'string'){
        formErrors[field] = '';
        const control = form.get(field);
        console.log(control);
        if (control && control.dirty && !control.valid) {
          const messages = validationMessages[field];
          for (const key in control.errors) {
            formErrors[field] += messages[key] + ' ';
          }
        }
      }else{
        form.get(field).controls.forEach((element, index) => {
          this.onValueChanged(element,formErrors[field][index] ,validationMessages[field]);
        });
      }
    }
  }

  GetErrorStructure(field?) : string | Object {
    if(field === 'Tools'){
      return {'Name': '','Url': ''};
    }
    return '';
  }

  formErrors = {
     'OtherProjctVideo': '',
     'Tools': [],
   };

   validationMessages = {
     'OtherProjctVideo': {
       'url': 'Please enter a valid url, ex: http://example.com.',
     },
     'Tools': {
      'Name':{
        'required':'Name is required',
      },       
      'Url':{
        'url': 'Please enter a valid url, ex: http://example.com.',
      },
     }
   };
}
