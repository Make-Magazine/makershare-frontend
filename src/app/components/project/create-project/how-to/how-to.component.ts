import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { Validators, ReactiveFormsModule, FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms'
import { CustomValidators } from 'ng2-validation'
import { inarray } from '../../../../validations/inarray.validation'
import { ViewService } from '../../../../d7services/view/view.service'
import { CompleterService, CompleterData } from 'ng2-completer';
// import { domain } from '../../../../d7services/global';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/of';

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
  @Input('HowToValues') HowToValues;
  HowToForm: FormGroup;
  ToolsMaterialsParts = [];

  // data arrays
  Durations = ['1-3 hours', '3-8 hours', '8-16 hours (a weekend)', '>16 hours'];
  Diffeculties = ['Easy', 'Moderate', 'Hard'];
  ResourceLabels = ['Schematics', 'Code', 'Knitting Pattern'];
  multi_values_fields = ['Tools','Materials','Resources','Parts'];

  //public url: string = "http://makerdev.orangestudio.com:8080/api/api-project-tools-materials-parts-list?type=tool&name=" ;
    private url = [
    { color: 'red', value: '#f00' },
    { color: 'green', value: '#0f0' },
    { color: 'blue', value: '#00f' },
    { color: 'cyan', value: '#0ff' },
    { color: 'magenta', value: '#f0f' },
    { color: 'yellow', value: '#ff0' },
    { color: 'black', value: '#000' }
  ];
  
  private dataService: CompleterData;

  constructor(
    private fb: FormBuilder,
    private viewService:ViewService,
    private completerService: CompleterService
  ) {
    let timedRes = Observable.from([this.url]).delay(3000);
    this.dataService = completerService.local(timedRes, 'color', 'color');
    }

  ngOnInit() {
    this.buildForm();
  }

  ToolMaterialPart(ControlName, index, value){
    if(this.ToolsMaterialsParts[ControlName]){
      this.ToolsMaterialsParts[ControlName][index] = [];
    }else{
      this.ToolsMaterialsParts[ControlName] = [];
    }
    if(value.length > 1){
      this.viewService.getView('api-project-tools-materials-parts-list',[['type', ControlName],['name',value]]).subscribe(data => {
        this.ToolsMaterialsParts[ControlName][index] = data;
      });
    }
  }

  SetToolMaterialPart(arrayelementname,ControlName,value,index){
    this.ToolsMaterialsParts[arrayelementname][index] = [];
    this.HowToForm.controls[ControlName]['controls'][index]['controls'].Name.setValue(value.name);
    this.HowToForm.controls[ControlName]['controls'][index]['controls'].Nid.setValue(value.nid);
  }

  /**
   * Build form when Initalize the component
   */
  buildForm(): void {
    this.HowToForm = this.fb.group({
      'OtherProjctVideo': ['', [CustomValidators.url]],
      'HowToMake': ['', []],
      'HelpLookingFor': ['', []],
      'Tools': this.fb.array([]),
      'Materials': this.fb.array([]),
      'Parts': this.fb.array([]),
      'Difficulty': [this.Diffeculties[0],[Validators.required,inarray(this.Diffeculties)]],
      'Duration': [this.Durations[0],[Validators.required,inarray(this.Durations)]],
      'Resources': this.fb.array([]),
    });
    if(this.HowToValues){
      this.multi_values_fields.forEach((element, index) => {
        var length = this.HowToValues[element].length;
        for(var i = 0 ;i < length; i++){
          this.AddRow(element);
        }
      });
      this.HowToForm.setValue(this.HowToValues);
    }
    this.HowToForm.valueChanges.subscribe(data => {
      this.onValueChanged(this.HowToForm, this.formErrors,this.validationMessages);
      this.HowTo.emit(this.HowToForm);
    });
    this.onValueChanged(this.HowToForm, this.formErrors, this.validationMessages);
  }

  /**
   * Adding new element to control array and also pushing new error structure for this row
   */
  AddRow(ControlName) {
    const control = <FormArray>this.HowToForm.controls[ControlName];
    let index = control.length + 1;
    const addrCtrl = this.InitRow(ControlName,index);
    control.push(addrCtrl); 
    this.formErrors[ControlName].push(this.GetErrorStructure(ControlName)); 
  }

  /**
   * Removing row from the array 
   */
  RemoveRow(i: number,ControlName) {
    const control = <FormArray>this.HowToForm.controls[ControlName];
    control.removeAt(i);
    this.formErrors[ControlName].splice(i, 1);
    this.SortElements(ControlName);
  }

  /**
   * Initalize the row with validations array and default values
   */
  InitRow(ControlName,index) {
    switch (ControlName){
      case 'Tools':
      {
        return this.fb.group({
          'SortOrder':[index,[CustomValidators.number, Validators.required, CustomValidators.min(1)]],
          'Name': ['', Validators.required],
          'Url': ['', CustomValidators.url],
          'Nid': ['',Validators.required],
        });
      }
      case 'Materials':
      {
        return this.fb.group({
          'SortOrder':[index,[CustomValidators.number, Validators.required, CustomValidators.min(1)]],
          'Name': ['', Validators.required],
          'Quantity': [1, [CustomValidators.number, Validators.required, CustomValidators.min(1)]],
          'Nid': ['',Validators.required],
        });
      }
      case 'Parts':
      {
        return this.fb.group({
          'SortOrder':[index,[CustomValidators.number, Validators.required, CustomValidators.min(1)]],
          'Name': ['', [Validators.required]],
          'Link': ['', CustomValidators.url],
          'Number': [1, [CustomValidators.number, Validators.required, CustomValidators.min(1)]],
          'Nid': ['',Validators.required],
        });
      }
      case 'Resources':
      {
        return this.fb.group({
          'SortOrder':[index,[CustomValidators.number, Validators.required, CustomValidators.min(1)]],
          'File': [, []],
          'RepoLink': ['', CustomValidators.url],
          'Label': ['',[inarray(this.ResourceLabels)]],
        });
      }
    }
  }

  /**
   * Changeing the row position for all the fields
   * getting the current item index and the new index then switch them
   */
  ChangeOrder(CurrentIndex, NewIndex, ControlName){
    const control = <FormArray>this.HowToForm.controls[ControlName];
    let currentrow = control.at(CurrentIndex);
    let newrow = control.at(NewIndex);
    control.setControl(CurrentIndex,newrow);
    control.setControl(NewIndex,currentrow);
    this.SortElements(ControlName);
  }

  /**
   * This function will be fired on every time we make a change on the form 
   * formErrors[field] = ''; will delete the previous errors of the field if any
   * before we clear the field we must check if the field is already an array of FormControls
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
      return {'SortOrder':'', 'Name': '','Url': '','Nid': ''};
    }
    case 'Materials':
    {
      return {'SortOrder':'', 'Name': '','Quantity': '','Nid': ''};
    }
    case 'Parts':
    {
      return {'SortOrder':'', 'Name': '', 'Link': '','Number': '','Nid': ''};
    }
    case 'Resources':
    {
      return {'SortOrder':'', 'RepoLink': '','Label': ''};
    }
   }
    return '';
  }

  /**
   * Sort rows of a field to set sort order equals the current index
   */
  SortElements(ControlName){
    const control = <FormArray>this.HowToForm.controls[ControlName];
    var TempToolsMaterialsParts = [];
    var ctrlnamesingle = ControlName.substring(0, ControlName.length-1);
    control.controls.forEach((element, index) => {
      this.ToolsMaterialsParts[ctrlnamesingle.toLowerCase()][index]=[];
      element['controls']['SortOrder'].setValue(index + 1);
    });
  }

  FileUpdated(event, index, ControlName){
   var files = event.srcElement.files;
   if(files.length == 1){
    this.HowToForm.controls[ControlName]['controls'][index].controls.File.setValue(files[0]);
   }else{
     this.HowToForm.controls[ControlName]['controls'][index].controls.File.setValue(null);
   }
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
    'Parts': [],
    'Difficulty': '',
    'Duration': '',
    'Resources': [],
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
      'Nid':{
        'required': 'Nid is required',
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
      'Nid':{
        'required': 'Nid is required',
      },
    },
    'Parts': {
      'SortOrder':{
        'number':'Sort order must be a number.',
        'required':'Sort order is required',
        'min':'Sort order must be at least 1.',
      },
      'Name':{
        'required':'Name is required',
      },
      'Link':{
        'url': 'Please enter a valid url, ex: http://example.com.',
      },
      'Number':{
        'number':'Quantity must be a number.',
        'required':'Quantity is required.',
        'min':'Quantity must be at least 1.',
      },
      'Nid':{
        'required': 'Nid is required',
      },
    },
    'Difficulty': {
      'required': 'Difficulty required.',
      'inarray': 'Selected difficulty is not accepted.',
    },
    'Duration': {
      'required': 'Duration required.',
      'inarray': 'Selected duration is not accepted.',
    },
    'Resources': {
      'SortOrder':{
        'number':'Sort order must be a number.',
        'required':'Sort order is required.',
        'min':'Sort order must be at least 1.',
      },
      'RepoLink':{
        'url': 'Please enter a valid url, ex: http://example.com.',
      },
      'Label':{
        'required': 'Label required.',
        'inarray': 'Selected label is not accepted.',
      },
    },
  };
}
