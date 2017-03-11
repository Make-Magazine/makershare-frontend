import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { Validators, ReactiveFormsModule, FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms'
import { CustomValidators } from 'ng2-validation'
import { ViewService } from '../../../../d7services/view/view.service'
import { TaxonomyService } from '../../../../d7services/taxonomy/taxonomy.service'
import { Project } from '../../../../models/project/create-project/project';
import { TaxonomyTerm } from '../../../../models/project/create-project/taxonomy-term';
import { field_collection_item_tool,field_collection_item_part,field_collection_item_material } from '../../../../models/project/create-project/field_collection_item';
import { FileEntity } from '../../../../models/project/create-project/file_entity';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
   styles : [`
      .tools textarea {max-width:100%;resize:none;}
  
  `]
})

export class HowToComponent implements OnInit {
  /**
   * @output will emit the new values to the parent Component
   * this mainly used for tags object because its an string array so we cannot pass it as a reference
   */
  @Output() emitter = new EventEmitter();

  /**
   * Output will return the value to the parent component
   * this will match the same name of the event inside the parent component html tag for this child component
   */
  @Input('project') project: Project;
  @Input('FormPrintableValues') FormPrintableValues;
  HowToForm: FormGroup;
  ToolsMaterialsParts = [];
  Durations:TaxonomyTerm[];
  Difficulties:TaxonomyTerm[];
  resources_files:FileEntity[] = [];
  ResourceLabels:TaxonomyTerm[];

  constructor(
    private fb: FormBuilder,
    private viewService:ViewService,
    private taxonomyService:TaxonomyService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.resources_files = this.FormPrintableValues.resource_files;
    this.taxonomyService.getVocalbularyTerms(5).subscribe((data:TaxonomyTerm[]) => {
      this.Difficulties = data;
    });
    this.taxonomyService.getVocalbularyTerms(6).subscribe((data:TaxonomyTerm[]) => {
      this.Durations = data;
    });
    this.taxonomyService.getVocalbularyTerms(12).subscribe((data:TaxonomyTerm[]) => {
      this.ResourceLabels = data;
    });
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
    let name_with_id = value.name+' ('+value.nid+')';
    this.ToolsMaterialsParts[arrayelementname][index] = [];
    const control =  this.HowToForm.controls[ControlName]['controls'][index];
    control.controls['field_'+arrayelementname+'_name'].setValue(name_with_id);
    var url:URL;
    var description:string;
    if(arrayelementname === "tool"){
      if(control.controls.field_tool_url.valid){
        url = control.controls.field_tool_url.value;
      }
      description = control.controls.field_description.value;
    }
    
    let allvalues = {
      field_tool_name: name_with_id,
      field_part_name: name_with_id,
      field_material_name: name_with_id,
      field_sort_order: index + 1,
      field_tool_url: url,
      field_description: description,
      field_material_quantity: control.controls.field_material_quantity.value,
    };
    let Row = this.GetRowWithValues(allvalues, arrayelementname);
    this.project[ControlName].und.push(Row);
    control.valueChanges.subscribe(values => {
      if(arrayelementname === "tool" && !control.controls.field_tool_url.valid){
        values.field_tool_url = '';
      }
      this.project[ControlName].und[values.field_sort_order - 1] = this.GetRowWithValues(values, arrayelementname);
    });
  }

  GetRowWithValues(values, arrayelementname):any{
    switch(arrayelementname){
      case 'tool':
      {
        let Tool:field_collection_item_tool = {
          field_tool_name:{und:[{target_id:values.field_tool_name}]},
          field_sort_order:{und:[{value:values.field_sort_order}]},
          field_tool_url:{und:[{url:values.field_tool_url}]},
          field_description:{und:[{value:values.field_description}]},
          field_material_quantity:{und:[{value:values.field_material_quantity}]},
        };
        return Tool;
      } 
      case 'part':
      {
        let Part:field_collection_item_part = {
          field_part_name:{und:[{target_id:values.field_part_name}]},
          field_sort_order:{und:[{value:values.field_sort_order}]},
          field_material_quantity:{und:[{value:values.field_material_quantity}]},
        };
        return Part;
      } 
      case 'material':
      {
        let Part:field_collection_item_material = {
          field_material_name:{und:[{target_id:values.field_material_name}]},
          field_sort_order:{und:[{value:values.field_sort_order}]},
          field_material_quantity:{und:[{value:values.field_material_quantity}]},
        };
        return Part;
      } 
    }
     
  }

  /**
   * Build the form when Initalize the component
   */
  buildForm(): void {
    this.HowToForm = this.fb.group({
      'field_how_to': [this.project.field_how_to.und[0].value],
      'field_tools': this.fb.array([]),
      'field_parts': this.fb.array([]),
      'field_materials': this.fb.array([]),
      'field_difficulty': [this.project.field_difficulty.und],
      'field_duration': [this.project.field_duration.und],
      'field_resources': this.fb.array([]),
    });
    this.HowToForm.valueChanges.subscribe(data => {
      this.onValueChanged(this.HowToForm, this.formErrors,this.validationMessages);
      this.project.field_difficulty.und = this.HowToForm.controls['field_difficulty'].value;
      this.project.field_duration.und = this.HowToForm.controls['field_duration'].value;
      this.emitter.emit(this.resources_files);
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
      case 'field_parts':
      {
        return this.fb.group({
          'field_sort_order':[index,[CustomValidators.number, Validators.required, CustomValidators.min(1)]],
          'field_part_name': ['', Validators.required],
          'field_material_quantity': [''],
        });
      }
      case 'field_materials':
      {
        return this.fb.group({
          'field_sort_order':[index,[CustomValidators.number, Validators.required, CustomValidators.min(1)]],
          'field_material_name': ['', Validators.required],
          'field_material_quantity': [''],
        });
      }
      case 'field_resources':
      {
        return this.fb.group({
          'field_resources_filename': ['', Validators.required],
          'field_repository_link':['',CustomValidators.url],
          'field_label': [1105,],
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
    if (!this.HowToForm) { return; }
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
    case 'field_parts':
    {
      return {'field_sort_order':'', 'field_part_name': ''};
    }
    case 'field_materials':
    {
      return {'field_sort_order':'', 'field_material_name': ''};
    }
    case 'field_resources':
    {
      return {'field_resources_filename':'', 'field_repository_link':''};
    }
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

  FileUpdated(event, index){
    const control = this.HowToForm.controls['field_resources']['controls'][index];
    let files = event.srcElement.files;
    console.log(files);
    if(files.length == 1 && files[0]){
      control.controls.field_resources_filename.setValue(files[0].name);
      var file:FileEntity = {
        file:'',
        filename:''
      };
      this.ConvertToBase64(files[0],file);
      console.log(file);
      if(this.resources_files[index]){
        this.resources_files[index] = file;
      }else{
        this.resources_files.push(file);
      }
    }
  }

  ConvertToBase64(file,FileEntityObject:FileEntity){
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      FileEntityObject.filename = file.name;
      FileEntityObject.file = reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
   }

  /**
   * An Object of form errors contains the error string value for each field
   * if the field is a multiple value field
   * the field will contain an array of strings for each row
   * @see https://angular.io/docs/ts/latest/cookbook/form-validation.html
   */
  formErrors = {
    'field_tools': [],
    'field_parts': [],
    'field_materials': [],
    'field_resources': [],
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
    'field_parts': {
      'field_sort_order':{
        'number':'Sort order must be a number.',
        'required':'Sort order is required',
        'min':'Sort order must be at least 1.',
      },
      'field_part_name':{
        'required':'Name is required',
      },      
    },
    'field_materials': {
      'field_sort_order':{
        'number':'Sort order must be a number.',
        'required':'Sort order is required',
        'min':'Sort order must be at least 1.',
      },
      'field_material_name':{
        'required':'Name is required',
      },      
    },
    'field_resources': {
      'field_resources_filename':{
        'required':'Sort order is required',
      },
      'field_repository_link':{
        'url': 'Please enter a valid url, ex: http://example.com.',
      },    
    },
  };
}