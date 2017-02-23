import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Validators, ReactiveFormsModule, FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms'
import { CustomValidators } from 'ng2-validation'

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
})

export class HowToComponent implements OnInit {

  /**
   * Output will return the value to the parent component
   * this will match the same name of the event inside the parent component html tag for this child component
   */
  @Output() HowTo = new EventEmitter();
  HowToForm: FormGroup;
  OtherProjctVideo: FormControl;
  HelpLookingFor: FormControl;
  Tools: FormControl;
  Materials: FormControl;

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.HowToForm = this.fb.group({
      'OtherProjctVideo': [this.OtherProjctVideo, [CustomValidators.url]],
      'HelpLookingFor': [this.OtherProjctVideo, []],
      'Tools': this.fb.array([]),
      'Materials': this.fb.array([]),
    });
    this.AddRow('Tools');
    this.AddRow('Materials');
    this.HowToForm.valueChanges.subscribe(data => {
      this.onValueChanged(this.HowToForm, this.formErrors,this.validationMessages);
      if(this.HowToForm.valid){
        this.HowTo.emit(this.HowToForm);
      }else{
        this.HowTo.emit(false);
      }
    });
    this.onValueChanged(this.HowToForm, this.formErrors, this.validationMessages);
  }

  AddRow(ControlName) {
    const control = <FormArray>this.HowToForm.controls[ControlName];
    const addrCtrl = this.InitRow(ControlName);
    let index = control.length;
    control.push(addrCtrl); 
    this.formErrors[ControlName].push(this.GetErrorStructure(ControlName)); 
  }

  RemoveRow(i: number,ControlName) {
    const control = <FormArray>this.HowToForm.controls[ControlName];
    control.removeAt(i);
  }

  InitRow(ControlName) {
    switch (ControlName){
      case 'Tools':
      {
        return this.fb.group({
          'SortOrder':['',[CustomValidators.number, Validators.required, CustomValidators.min(1)]],
          'Name': ['', Validators.required],
          'Url': ['', CustomValidators.url],
        });
      }
      case 'Materials':
      {
        return this.fb.group({
          'SortOrder':['',[CustomValidators.number, Validators.required, CustomValidators.min(1)]],
          'Name': ['', Validators.required],
          'Quantity': [1, [CustomValidators.number, Validators.required, CustomValidators.min(1)]],
        });
      }
    }
  }

  ChangeOrder(CurrentIndex, NewIndex, ControlName){
    const control = <FormArray>this.HowToForm.controls[ControlName];
    let currentrow = control.at(CurrentIndex);
    let newrow = control.at(NewIndex);
    control.setControl(CurrentIndex,newrow);
    control.setControl(NewIndex,currentrow);
  }

  /**
   * 
   */
  onValueChanged(form, formErrors, validationMessages) {
    for (const field in formErrors) {
      if(typeof formErrors[field] === 'string'){
        formErrors[field] = '';
        const control = form.get(field);
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

  /**
   * A method to return the error message structure of each field to use them in formErrors
   */
  GetErrorStructure(ControlName?) : string | Object {
   switch (ControlName){
    case 'Tools':
    {
      return {'SortOrder':'', 'Name': '','Url': ''};
    }
    case 'Materials':
    {
      return {'SortOrder':'', 'Name': '','Quantity': ''};
    }
   }
    return '';
  }

  /**
   * An Object of form errors contains the error string value for each field
   * if the field is a multiple value field
   * the field will contain an array of strings for each row
   * @see https://angular.io/docs/ts/latest/cookbook/form-validation.html
   */
  formErrors = {
    'OtherProjctVideo': '',
    'Tools': [],
    'Materials': [],
  };

   /**
    * Validation messages object contains all error messages for each field
    * each field has multiple validations for each error
    * @see https://angular.io/docs/ts/latest/cookbook/form-validation.html
    */
  validationMessages = {
    'OtherProjctVideo': {
      'url': 'Please enter a valid url, ex: http://example.com.',
    },
    'Tools': {
      'SortOrder':{
        'number':'Sort order must be a number.',
        'required':'Sort order is required',
        'min':'Sort order must be at least 1.',
      },
      'Name':{
        'required':'Name is required',
      },       
      'Url':{
        'url': 'Please enter a valid url, ex: http://example.com.',
      },
    },
    'Materials': {
      'SortOrder':{
        'number':'Sort order must be a number.',
        'required':'Sort order is required',
        'min':'Sort order must be at least 1.',
      },
      'Name':{
        'required':'Name is required',
      },
      'Quantity':{
        'number':'Quantity must be a number.',
        'required':'Quantity is required.',
        'min':'Quantity must be at least 1.',
      },
    }
  };
}
