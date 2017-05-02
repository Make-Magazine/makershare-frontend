import { Component, OnInit, EventEmitter, Output, Input,ViewChild,AfterViewInit } from '@angular/core';
import { Validators, ReactiveFormsModule, FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms'
import { CustomValidators } from 'ng2-validation'
import { NodeService } from '../../../../d7services/node/node.service'
import { TaxonomyService } from '../../../../d7services/taxonomy/taxonomy.service'
import { ProjectForm } from '../../../../models';
import { ToolMaterialPart } from '../../../../models';
import { TaxonomyTerm } from '../../../../models';
import { field_collection_item_tool, field_collection_item_part, field_collection_item_material, field_collection_item_resource } from '../../../../models';
import { FileEntity } from '../../../../models';
import { Observable } from 'rxjs/Observable';
import { NodeHelper } from '../../../../models';
import { ViewService } from '../../../../d7services/view/view.service';
import { FileService } from '../../../../d7services/file/file.service';
import { MainService } from '../../../../d7services/main/main.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { domain,endpoint } from '../../../../d7services/globals';
declare var CKEDITOR:any;
@Component({
  selector: 'app-project-form-how-to',
  templateUrl: './how-to.component.html',
  styles: [
    '.tools textarea {max-width:100%;resize:none;}'
  ]
})

export class HowToComponent implements OnInit,AfterViewInit {
@ViewChild('ckeditor') ckeditor:any;
  ngAfterViewInit() {
    this.ckeditor.instance.on('fileUploadRequest', (event) => {
      var fileLoader = event.data.fileLoader;
      var xhr = fileLoader.xhr;
      xhr.setRequestHeader( 'X-CSRF-Token', this.mainService.getToken());
      xhr.setRequestHeader( 'Accept', 'application/json' );
      xhr.setRequestHeader( 'Content-Type', 'application/json');
      xhr.withCredentials = true;
      var myReader: FileReader = new FileReader();
      let self = this;
      myReader.onloadend = function (loadEvent: any) {
        let fileEntity:FileEntity = {
          file:NodeHelper.RemoveFileTypeFromBase64(loadEvent.target.result),
          filename:fileLoader.file.name,
          filepath:'public://ckeditor/'+localStorage.getItem("user_id")+fileLoader.file.name,
        };
        self.fileService.SendCreatedFile(fileEntity).subscribe(data=>{
          xhr.send(JSON.stringify({fid:data.fid,uid:+localStorage.getItem("user_id")}));
        });
      };
      myReader.readAsDataURL(fileLoader.file);
      event.stop();
    });
    CKEDITOR.on( 'dialogDefinition', function( ev ) {
      var dialogName = ev.data.name;
      var dialogDefinition = ev.data.definition;
      if (dialogName == 'image') {
        dialogDefinition.onLoad = function() {
          var dialog = CKEDITOR.dialog.getCurrent();

          var uploadTab = dialogDefinition.getContents('Upload');
          var uploadButton = uploadTab.get('uploadButton');
          console.log('uploadButton', uploadButton);

          uploadButton.onClick = (evt)=>{
            console.log('fire in the hole', evt);
          };

          uploadButton.filebrowser['onSelect'] = (fileUrl, errorMessage)=>{
            console.log('working');
          };
        };
      }
    });
    this.ckeditor.instance.on( 'fileUploadResponse', (event) => {
      event.stop();
      var data = event.data;
      var xhr = data.fileLoader.xhr;
      let response = JSON.parse(xhr.responseText);
      if(!response[0]){
        data.message = 'Error';
        event.cancel();
      }else{
        data.url = response[0];
      }
    });
  }
  /**
   * @output will emit the new values to the parent Component
   * this mainly used for tags object because its an string array so we cannot pass it as a reference
   */
  @Output() emitter = new EventEmitter();
  @Output() CanNavigate = new EventEmitter();
  formatter = (x) => {
    if(x.name){
      return x.name;
    }
    return x;
  };
  /**
   * Output will return the value to the parent component
   * this will match the same name of the event inside the parent component html tag for this child component
   */
  @Input('project') project: ProjectForm;
  @Input('FormPrintableValues') FormPrintableValues;
  HowToForm: FormGroup;
  ToolsMaterialsParts = [];
  Durations: TaxonomyTerm[];
  Difficulties: TaxonomyTerm[];
  resources_files: FileEntity[] = [];
  TempSelectedToolMaterialPart = [];
  searchFailed = {
    tool: false,
    part: false,
    material: false
  };
  CurrentModal: string;

  search = (text$: Observable<string>) => {
    let control = text$['source']['sourceObj'].classList[0];
    return text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searchFailed[control] = false)
      .switchMap((term) => {
        if (term.length > 1) {
          return this.viewService.getView('api-project-tools-materials-parts-list', [['type', control], ['name', term]])
            .map(result => {
              if (result.length == 0) {
                this.searchFailed[control] = true;
              }
              return result;
            })
        }
        return [];
      }
      )
  };

  constructor(
    private fb: FormBuilder,
    private taxonomyService: TaxonomyService,
    private nodeService: NodeService,
    private modalService: NgbModal,
    private fileService: FileService,
    private mainService: MainService,
    private viewService: ViewService
  ) { }

  ngOnInit() {
    this.resources_files = this.FormPrintableValues.resources_files;
    if (!this.resources_files) {
      this.resources_files = [];
    }
    this.taxonomyService.getVocalbularyTerms(5).subscribe((data: TaxonomyTerm[]) => {
      this.Difficulties = data;
    });
    this.taxonomyService.getVocalbularyTerms(6).subscribe((data: TaxonomyTerm[]) => {
      this.Durations = data;
    });
    this.buildForm();
  }

  SetToolMaterialPart(arrayelementname, ControlName,value, index) {
    let name_with_id = value.name + ' (' + value.nid + ')';
    const control = this.HowToForm.controls[ControlName]['controls'][index];
    control.controls['field_' + arrayelementname + '_name'].setValue(name_with_id);
    var field_quantity = "";
    if (control.controls.field_material_quantity) {
      field_quantity = control.controls.field_material_quantity.value;
    } else {
      field_quantity = control.controls.field_quantity.value;
    }

    let allvalues = {
      field_tool_name: name_with_id,
      field_part_name: name_with_id,
      field_material_name: name_with_id,
      field_material_quantity: field_quantity,
      field_quantity: field_quantity,
    };
    let Row = this.GetRowWithValues(allvalues, arrayelementname);
    this.project[ControlName].und.push(Row);
    this.TempSelectedToolMaterialPart[arrayelementname] = '';
    this.AddRow(ControlName);
  }

  GetRowWithValues(values, arrayelementname): any {
    switch (arrayelementname) {
      case 'tool':
        {
          let Tool: field_collection_item_tool = {
            field_tool_name: { und: [{ target_id: values.field_tool_name }] },
            field_quantity: { und: [{ value: values.field_quantity }] },
          };
          return Tool;
        }
      case 'part':
        {
          let Part: field_collection_item_part = {
            field_part_name: { und: [{ target_id: values.field_part_name }] },
            field_quantity: { und: [{ value: values.field_quantity }] },
          };
          return Part;
        }
      case 'material':
        {
          let Material: field_collection_item_material = {
            field_material_name: { und: [{ target_id: values.field_material_name }] },
            field_material_quantity: { und: [{ value: values.field_material_quantity }] },
          };
          return Material;
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
    let multifields = ["field_tools", "field_materials", "field_parts", "field_resources"]
    multifields.forEach(field => {
      this.project[field].und.forEach((element, index) => {
        this.AddRow(field, element);
      });
      this.AddRow(field);
    });
    this.HowToForm.valueChanges.subscribe(data => {
      if(this.HowToForm.dirty && this.HowToForm.touched){
        this.CanNavigate.emit(false);
      }
      this.onValueChanged(this.HowToForm, this.formErrors, this.validationMessages);
      this.project.field_difficulty.und = this.HowToForm.controls['field_difficulty'].value;
      this.project.field_duration.und = this.HowToForm.controls['field_duration'].value;
      this.emitter.emit(this.resources_files);
    });
    this.onValueChanged(this.HowToForm, this.formErrors, this.validationMessages);
  }

  /**
   * Adding new element to control array and also pushing new error structure for this row
   */
  AddRow(ControlName, data?) {
    const control = <FormArray>this.HowToForm.controls[ControlName];
    let index = control.length + 1;
    const addrCtrl = this.InitRow(ControlName, index, data);
    control.push(addrCtrl);
    this.formErrors[ControlName].push(this.GetErrorStructure(ControlName));
  }

  /**
   * Removing row from the array 
   */
  RemoveRow(i: number, ControlName) {
    const control = <FormArray>this.HowToForm.controls[ControlName];
    control.removeAt(i);
    this.formErrors[ControlName].splice(i, 1);
    this.project[ControlName].und.splice(i, 1);
  }

  /**
   * Initalize the row with validations array and default values
   */
  InitRow(ControlName, index, data?) {
    switch (ControlName) {
      case 'field_tools':
        {
          return this.fb.group({
            'field_tool_name': [data && data.field_tool_name && data.field_tool_name.und ? data.field_tool_name.und[0].target_id : '', Validators.required],
            'field_quantity': [data && data.field_quantity && data.field_quantity.und ? data.field_quantity.und[0].value : 1],
          });
        }
      case 'field_parts':
        {
          return this.fb.group({
            'field_part_name': [data ? data.field_part_name.und[0].target_id : '', Validators.required],
            'field_quantity': [data && data.field_quantity && data.field_quantity.und ? data.field_quantity.und[0].value : 1],
          });
        }
      case 'field_materials':
        {
          return this.fb.group({
            'field_material_name': [data ? data.field_material_name.und[0].target_id : '', Validators.required],
            'field_material_quantity': [data && data.field_material_quantity && data.field_material_quantity.und ? data.field_material_quantity.und[0].value : 1],
          });
        }
      case 'field_resources':
        {
          return this.fb.group({
            'field_resources_filename': [data ? data.field_resource_file && data.field_resource_file.und[0].filename : '', Validators.required],
            'field_repository_link': [data && data.field_repository_link && data.field_repository_link.und ? data.field_repository_link.und[0].url : '', CustomValidators.url],
            'field_label': [data && data.field_label? data.field_label.und[0].value : '',],
          });
        }
    }
  }

  /**
   * This function will be fired on every time we make a change on the form 
   * formErrors[field] = ''; will delete the previous errors of the field if any
   * before we clear the field we must check if the field is already an array of FormControls
   */
  onValueChanged(form, formErrors, validationMessages) {
    if (!this.HowToForm) { return; }
    for (const field in formErrors) {
      if (typeof formErrors[field] === 'string') {
        formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = validationMessages[field];
          for (const key in control.errors) {
            formErrors[field] += messages[key] + ' ';
          }
        }
      } else {
        form.get(field).controls.forEach((element, index) => {
          this.onValueChanged(element, formErrors[field][index], validationMessages[field]);
        });
      }
    }
  }

  /**
   * A method to return the error message structure of each field to use them in formErrors
   */
  GetErrorStructure(ControlName?): string | Object {
    switch (ControlName) {
      case 'field_tools':
        {
          return { 'field_tool_name': '' };
        }
      case 'field_parts':
        {
          return { 'field_part_name': '' };
        }
      case 'field_materials':
        {
          return { 'field_material_name': '' };
        }
      case 'field_resources':
        {
          return { 'field_resources_filename': '', 'field_repository_link': '' };
        }
    }
    return '';
  }

  FileUpdated(event, index) {
    const control = this.HowToForm.controls['field_resources']['controls'][index];
    let files = event.srcElement.files;
    if (files.length == 1 && files[0]) {
      control.controls.field_resources_filename.setValue(files[0].name);
      var file: FileEntity = {
        file: '',
        filename: files[0].name
      };
      NodeHelper.ConvertToBase64(files[0], file);
      if (this.resources_files[index]) {
        this.resources_files[index] = file;
      } else {
        this.resources_files.push(file);
        var url: URL;
        if (control.controls.field_repository_link.valid) {
          url = control.value.field_repository_link;
        }
        let field_resource: field_collection_item_resource = {
          field_label: { und: [{value:control.value.field_label}] },
          field_repository_link: { und: [{ url: url }] },
          field_resource_file: { und: [{ filename: file.filename, fid: 0 }] }
        };
        this.project.field_resources.und.push(field_resource);
      }
    }
    this.emitter.emit(this.resources_files);
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
      'field_tool_name': {
        'required': 'Name is required',
      },
    },
    'field_parts': {
      'field_part_name': {
        'required': 'Name is required',
      },
    },
    'field_materials': {
      'field_material_name': {
        'required': 'Name is required',
      },
    },
    'field_resources': {
      'field_resources_filename': {
        'required': 'file is required',
      },
      'field_repository_link': {
        'url': 'Please enter a valid url, ex: http://example.com.',
      },
    }

  };

  OpenAddModal(Template, Control) {
    this.CurrentModal = Control;
    this.modalService.open(Template);
  }

  /**
   * Handle the click on create new tool , material or part from the modal
   * @param CloseButton the button element to close after successful submitting
   * @param NameInput the input element to get the value of the field name
   */
  AddNewToolMaterialPart(CloseButton: HTMLButtonElement, NameInput: HTMLInputElement) {
    if (!NameInput.value) {
      CloseButton.click();
      return;
    }
    let NewToolMaterialPart: ToolMaterialPart = new ToolMaterialPart(this.CurrentModal);
    let FieldName = 'field_' + this.CurrentModal + 's';
    NewToolMaterialPart.SetField(NameInput.value, "title");
    this.nodeService.createNode(NewToolMaterialPart).subscribe((NewNode) => {
      NewNode.name = NameInput.value;
      CloseButton.click();
      NameInput.value = '';
      this.searchFailed[this.CurrentModal] = false;
      this.SetToolMaterialPart(this.CurrentModal, FieldName, NewNode, this.HowToForm.controls[FieldName]['controls'].length - 1);
    });
  }
  CKEditorConfig = {
    uploadUrl: domain+endpoint+'/maker_manage_file/create', 
    imageUploadUrl: domain+endpoint+'/maker_manage_file/create',
    filebrowserUploadUrl: domain+endpoint+'/maker_manage_file/create',
  }
  sidebarText = {
    'how_to': {
      'title': 'How to:',
      'guide': 'Use this field to describe your process in creating this project?Include any images, video, or text you feel will allow others to best remake your project.'
    },
    'tools': {
      'title': 'Tools // Boards & Kits // Materials:',
      'guide': `We've devised three categories to represent the different elements that might have been used to create this project.

Tools: The items you use to affect your materials (crochet hooks, screwdrivers, laser cutters, etc)

Boards: Any pre-made electronic board (Edison, Arduino, Raspberry Pi, etc)
& Kits: Any purchased kit containing combinations of tools, boards, and/or materials.

Materials: Anything that your final project is made from, not including Boards & Kits (cloth, thread, nails, monitor, wood, etc)`
    },
    'difficulties_duration': {
      'title': 'Difficulty & Duration:',
      'guide': 'How difficult would it be for the average person to recrate this? How long would it take them?'
    },

    'resources': {
      'title': 'Resources:',
      'guide': `Are there any important files associated with your project that you'd like to share? This is the place for those. From vector to 3D files, patterns to code, please uploaded any files associated with your poject here.`
    },
    'credit_your_inspiration': {
      'title': 'How to:',
      'guide': 'Use this field to describe your process in creating this project?Include any images, video, or text you feel will allow others to best remake your project.'
    },
  }

  TooltipText = {
    'how_to': {
      'guide': 'Describe your process.'
    },
    'tool_name': {
      'guide': 'Include the manufacturer name if it\'\s relevant.',
    },
    'resources': {
      'guide' : 'Upload any files associated with your project.'
    },
    'inspiration': {
      'guide': 'Who or what sparked your idea for this project.'
    }
  }
}