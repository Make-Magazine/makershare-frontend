import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ViewService } from '../../../../d7services/view/view.service';
import { FileService } from '../../../../d7services/file/file.service';
import { ProjectCategory } from '../../../../models/project/project-category';
import { FileEntity } from '../../../../models/project/create-project/file_entity';
import { Project } from '../../../../models/project/create-project/project';

@Component({
  selector: 'app-your-story',
  templateUrl: './your-story.component.html',
})

export class YourStoryComponent implements OnInit {
  /**
   * @output will emit the new values to the parent Component
   * this mainly used for tags object because its an string array so we cannot pass it as a reference
   */
  @Output() emitter = new EventEmitter();

  /**
   * @input to recieve the project object and printable values "tags and cover image"
   */
  @Input('project') project: Project;
  @Input('FormPrintableValues') FormPrintableValues;
  cover_image:FileEntity;
  tags:string[];

  /**
   * local variables to use only inside this component
   */
  YourStoryForm: FormGroup;
  accepted_image_width = 600;
  accepted_image_height = 400;
  project_categories_parents:ProjectCategory[]= [];
  project_categories_childs:ProjectCategory[] = [];
  current_parent_category:number;
  current_child_category:number;
  child_categories:ProjectCategory[] = [];
  all_categories:ProjectCategory[];
  
  constructor(
    private fb: FormBuilder,
    private viewService: ViewService,
    private fileService: FileService,
  ) {}

  /**
   * on loading the component we will assign the printable variables to the parent printable variables
   * also we will build our form
   * and getting base details as categories 
   * 
   */
  ngOnInit() {
    this.cover_image = this.FormPrintableValues.cover_image;
    this.tags = this.FormPrintableValues.tags;
    if(this.project.field_cover_photo.und[0].fid != 0){
      this.fileService.getFileById(this.project.field_cover_photo.und[0].fid).subscribe((file:FileEntity) =>{
        this.cover_image.file = file.file;
        this.cover_image.filename = file.filename;
      });
    }
    this.buildForm();
    this.viewService.getView('projects_categories').subscribe((categories:ProjectCategory[]) => {
      this.all_categories = categories;
      categories.forEach((element,index) =>{
        if(element.parent_tid){
          this.project_categories_childs.push(element);
        }else{
          this.project_categories_parents.push(element);
        }
      });
    });
  }

  /**
   * when building the form we must assign the default value which is received from the parent and building the form with Validators
   * onValueChanged is used in two ways :
   * 1- for the hole form to check for validation error messages
   * 2- foreach control in the form to get the valid values only and save them to project object or emit them to the parent component
   */
  buildForm(): void {
    this.YourStoryForm = this.fb.group({
      'title': [this.project.title, [Validators.required,Validators.minLength(4)]],
      'field_teaser': [this.project.field_teaser.und[0].value],
      'field_cover_photo': [this.cover_image, [Validators.required]],
      'field_show_tell_video': [this.project.field_show_tell_video.und[0].value, [CustomValidators.url]],
      'field_aha_moment': [this.project.field_aha_moment.und[0].value, []],
      'field_uh_oh_moment': [this.project.field_uh_oh_moment.und[0].value, []],
      'field_story':[this.project.field_story.und[0].value,[Validators.required]],
      'field_tags': [this.tags],
      'field_categories': [this.project.field_categories.und, [Validators.required]],
    });
    this.YourStoryForm.valueChanges.subscribe(data => {
      this.onValueChanged(data);
      this.emitter.emit(this.tags);
    });
    this.onValueChanged(this.YourStoryForm.value);
    for(let index in this.YourStoryForm.controls){
      const control = this.YourStoryForm.controls[index];
      control.valueChanges.subscribe(value =>{
        if(this.isEmpty(value) || !control.valid){
          this.SetControlValue('',index);
        }else{
          this.SetControlValue(value,index);
        }
      });
    }
 }

  /**
   * setting control values
   * this function will set the value to the project property
   * @param value : the value to be setted in the project property
   * @param index : the field name of the property
   */
  SetControlValue(value:any,index:string){
    let field = this.project[index];
    if(typeof field === 'string'){
      this.project[index] = value;
    }else if(field.und[0] && typeof field.und[0] === 'object'){
      field.und[0].value = value;
    }else if(index != 'field_tags'){
      value? field.und = value : field.und = [];
    }
  }

  /**
   * a very usefull method to check the variable if its empty or not
   * this function works with all type of variables "string, number, array and object"
   * @param variable 
   */
  isEmpty(variable) {
    return Object.keys(variable).every(function(key) {
      return variable[key]===''||variable[key]===null;
    });
  }

  /**
   * this function will watch for the new changes in cover_image field and set the values after converting the file to base64
   * its better if we used custom validator so we can remove the error check here "need works"
   * @param event the selected file object
   */
  ImageUpdated(event){ 
    this.cover_image.file = '';
    this.cover_image.filename = '';
    this.formErrors.field_cover_photo = '';
    var files = event.srcElement.files;
    if(files.length == 1 && files[0].type.startsWith("image")){
      this.ConvertToBase64(files[0],this.cover_image);
    }
    else{
      this.formErrors.field_cover_photo = this.validationMessages.field_cover_photo.notvalidformat;      
    }
 }

 /**
  * converting a file object to base64
  * @param file : the file to convert
  * @param ImgObject : the cover image control to set the new values after converting
  */
 ConvertToBase64(file:File,ImgObject:FileEntity){
    var reader = new FileReader();
    reader.readAsDataURL(file);
    let CreateComponent = this;
    reader.onload = function () {
      var image = new Image();
      image.src = reader.result;
      if(image.width < CreateComponent.accepted_image_width || image.height < CreateComponent.accepted_image_height){
        CreateComponent.formErrors.field_cover_photo = CreateComponent.validationMessages.field_cover_photo.validimagesize;
      }else{
        ImgObject.filename = file.name;
        ImgObject.file = reader.result;
      }
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
   }

  /**
   * a function to check the validation for each control and set the error messages to formerrors from messages array
   * @param data : the data to be checked but its not required in our case
   * this data will be helpfull if we need to make any change to the value before setting the error
   */
  onValueChanged(data?: any) {
    if (!this.YourStoryForm) { return; }
    const form = this.YourStoryForm;
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
  }

  /**
   * handling selection of categories
   * @param tid : selected term id 
   * @param mode : parent or child selection
   */
  SelectTerm(tid:number,mode:string){
    if(mode == "parent"){
      this.child_categories = [];
      this.current_parent_category = tid;
      this.project_categories_childs.forEach((element,index)=>{
        if((element.parent_tid == this.current_parent_category) && (this.project.field_categories.und.indexOf(element.tid) == -1)){
          this.child_categories.push(element);
        }
      });
    }else{
      this.current_child_category = tid;
    }
  }

  /**
   * pushing the selected categories to project categories field and check for dublication
   */
  SetCategories(){
    if(this.project.field_categories.und.indexOf(this.current_parent_category) == -1){
      this.project.field_categories.und.push(this.current_parent_category);
    }
    if(this.project.field_categories.und.indexOf(this.current_child_category) == -1){
      this.project.field_categories.und.push(this.current_child_category);
    }
    this.YourStoryForm.controls["field_categories"].patchValue(this.project.field_categories.und);
    delete this.current_parent_category;
    delete this.current_child_category;
  }

  /**
   * an object to store the error messages for each field 
   * this is usefull if we has multiple errors for each field
   */
  formErrors = {
     'title': '',
     'field_categories': '',
     'field_cover_photo': '',
     'field_show_tell_video': '',
     'field_story': '',
   };

   /**
    * the error messages to set in formerrors foreach field and also for each validator
    this way is good to save deffirent error messages for each validation
    */
   validationMessages = {
     'title': {
       'required':      'Project Name is required.',
       'minlength':     'Project Name must be at least 4 characters long.',
     },
     'field_categories': {
       'required': 'Categories is required.'
     },
     'field_cover_photo': {
       'required': 'Cover photo is required.',
       'notvalidformat': 'Please choose an image file.',
       'validimagesize': 'choose a photo that is at least 600 x 400 px.',
     },
     'field_show_tell_video': {
       'url': 'Please enter a valid url, ex: http://example.com.',
     },
     'field_story': {
       'required': 'Story is required.'
     },
   };
}
