import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { Validators, ReactiveFormsModule, FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms'
import { CustomValidators } from 'ng2-validation'
import { inarray } from '../../../../validations/inarray.validation'
import { ViewService } from '../../../../d7services/view/view.service'
import { Project } from '../../../../models/project/create-project/project';
import { field_collection_item_tool } from '../../../../models/project/create-project/field_collection_item';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
})

export class HowToComponent implements OnInit {
  /**
   * Output will return the value to the parent component
   * this will match the same name of the event inside the parent component html tag for this child component
   */
  @Input('project') project: Project;
  @Input('FormPrintableValues') FormPrintableValues;
  HowToForm: FormGroup;
  ToolsMaterialsParts = [];

  constructor(
    private fb: FormBuilder,
    private viewService:ViewService,
  ) {}

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
    this.HowToForm.controls[ControlName]['controls'][index]['controls'].field_tool_name.setValue(value.name);
    var url:URL;
    if(this.HowToForm.controls[ControlName]['controls'][index]['controls'].field_tool_url.valid && this.HowToForm.controls[ControlName]['controls'][index]['controls'].field_tool_url.value){
      url = this.HowToForm.controls[ControlName]['controls'][index]['controls'].field_tool_url.value;
    }
    let Tool:field_collection_item_tool = {
      field_tool_name:{und:[{target_id:value.name}]},
      field_sort_order:{und:[{value:index + 1}]},
      field_tool_url:{und:[{url:url}]},
      field_description:{und:[{value:this.HowToForm.controls[ControlName]['controls'][index]['controls'].field_description.value}]},
      field_material_quantity:{und:[{value:this.HowToForm.controls[ControlName]['controls'][index]['controls'].field_material_quantity.value}]},
    };
    this.project.field_tools.und.push(Tool);
  }

  /**
   * Build the form when Initalize the component
   */
  buildForm(): void {
    this.HowToForm = this.fb.group({
      'field_how_to': [this.project.field_how_to.und[0].value],
      'field_tools': this.fb.array([]),
    });
    this.HowToForm.valueChanges.subscribe(data => {
      this.onValueChanged(this.HowToForm, this.formErrors,this.validationMessages);
      console.log(this.project);
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
      case 'field_tools':
      {
        return this.fb.group({
          'field_sort_order':[index,[CustomValidators.number, Validators.required, CustomValidators.min(1)]],
          'field_tool_name': ['', Validators.required],
          'field_tool_url': ['', CustomValidators.url],
          'field_description': [''],
          'field_material_quantity': [''],
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
    case 'field_tools':
    {
      return {'field_sort_order':'', 'field_tool_name': '','field_tool_url': ''};
    }
    // case 'Materials':
    // {
    //   return {'SortOrder':'', 'Name': '','Quantity': '','Nid': ''};
    // }
    // case 'Parts':
    // {
    //   return {'SortOrder':'', 'Name': '', 'Link': '','Number': '','Nid': ''};
    // }
    // case 'Resources':
    // {
    //   return {'SortOrder':'', 'RepoLink': '','Label': ''};
    // }
   }
    return '';
  }

  /**
   * Sort rows of a field to set sort order equals the current index
   */
  SortElements(ControlName){
    const control = <FormArray>this.HowToForm.controls[ControlName];
    let TempToolsMaterialsParts = [];
    let ctrlnamesingle = ControlName.substring(0, ControlName.length-1);
    control.controls.forEach((element, index) => {
      this.ToolsMaterialsParts[ctrlnamesingle.toLowerCase()][index]=[];
      element['controls']['field_sort_order'].setValue(index + 1);
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
    'field_tools': [],
  };

   /**
    * Validation messages object contains all error messages for each field
    * each field has multiple validations for each error
    * @see https://angular.io/docs/ts/latest/cookbook/form-validation.html
    */
  validationMessages = {
    'field_tools': {
      'field_sort_order':{
        'number':'Sort order must be a number.',
        'required':'Sort order is required',
        'min':'Sort order must be at least 1.',
      },
      'field_tool_name':{
        'required':'Name is required',
      },      
      'field_tool_url':{
        'url': 'Please enter a valid url, ex: http://example.com.',
      },
    },
  };
}
