import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation'

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
})
export class TeamComponent implements OnInit {
  @Output() Team = new EventEmitter();
  @Input('TeamValues') TeamValues;
  TeamForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.buildForm();
    if(this.TeamValues){
      this.TeamForm.setValue(this.TeamValues);
    }
  }

  buildForm(): void {
    this.TeamForm = this.fb.group({
      'Team': this.fb.array([]),
    });
    this.AddRow('Team');
    this.TeamForm.valueChanges.subscribe(data => {
      this.onValueChanged(this.TeamForm, this.formErrors,this.validationMessages);
      if(this.TeamForm.valid){
        this.Team.emit(this.TeamForm);
      }else{
        this.Team.emit(false);
      }
    });
    this.onValueChanged(this.TeamForm, this.formErrors, this.validationMessages);
  }

  AddRow(ControlName) {
    const control = <FormArray>this.TeamForm.controls[ControlName];
    let index = control.length + 1;
    const addrCtrl = this.InitRow(ControlName,index);
    control.push(addrCtrl); 
    this.formErrors[ControlName].push(this.GetErrorStructure(ControlName)); 
  }

  InitRow(ControlName,index) {
    return this.fb.group({
      'SortOrder':[index,[CustomValidators.number, Validators.required, CustomValidators.min(1)]],
      'Name': ['', Validators.required],
      'Role': ['', Validators.required],
    });
  }

  SortElements(ControlName){
    const control = <FormArray>this.TeamForm.controls[ControlName];
    control.controls.forEach((element, index) => {
      element['controls']['SortOrder'].setValue(index + 1);
    });
  }

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

  ChangeOrder(CurrentIndex, NewIndex, ControlName){
    const control = <FormArray>this.TeamForm.controls[ControlName];
    let currentrow = control.at(CurrentIndex);
    let newrow = control.at(NewIndex);
    control.setControl(CurrentIndex,newrow);
    control.setControl(NewIndex,currentrow);
    this.SortElements(ControlName);
  }

  RemoveRow(i: number,ControlName) {
    const control = <FormArray>this.TeamForm.controls[ControlName];
    control.removeAt(i);
    this.formErrors[ControlName].splice(i, 1);
    this.SortElements(ControlName);
  }

  GetErrorStructure(ControlName?) : Object {
    return {'SortOrder':'', 'Name': '','Role': ''};
  }

  formErrors = {
    'Team': [],
  };

   /**
    * Validation messages object contains all error messages for each field
    * each field has multiple validations for each error
    * @see https://angular.io/docs/ts/latest/cookbook/form-validation.html
    */
  validationMessages = {
    'Team': {
      'SortOrder':{
        'number':'Sort order must be a number.',
        'required':'Sort order is required',
        'min':'Sort order must be at least 1.',
      },
      'Name':{
        'required':'Name is required',
      },       
      'Role':{
        'required':'Role is required',
      },
    },
  };

}
