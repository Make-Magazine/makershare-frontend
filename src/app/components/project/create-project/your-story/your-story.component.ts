import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { validimagesize } from '../../../../validations/valid-image-size.validation';
import { ViewService } from '../../../../d7services/view/view.service';
import { FileService } from '../../../../d7services/file/file.service';
import { CreateYourStoryModel, YourStoryCategory } from '../../../../models/project/create-project/your-story';
import { ProjectCategory } from '../../../../models/project/project-category';
import { FileEntity } from '../../../../models/project/create-project/file_entity';
import { Project } from '../../../../models/project/create-project/project';

@Component({
  selector: 'app-your-story',
  templateUrl: './your-story.component.html',
})

export class YourStoryComponent implements OnInit {
  @Output() emitter = new EventEmitter();
  @Input('project') project: Project;
  @Input('FormPrintableValues') FormPrintableValues;
  cover_image:FileEntity;
  tags:string[];

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

  buildForm(): void {
    this.YourStoryForm = this.fb.group({
      'title': [this.project.title, [Validators.required,Validators.minLength(4)]],
      'field_teaser': [this.project.field_teaser.und[0].value],
      'field_cover_photo': [this.cover_image, [Validators.required,validimagesize(this.accepted_image_width,this.accepted_image_height)]],
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
          this.SetControlValue(control,'',index);
        }else{
          this.SetControlValue(control,value,index);
        }
      });
    }
 }

  SetControlValue(control:any,value:any,index:string){
    let field = this.project[index];
    if(typeof field === 'string'){
      field = value;
    }else if(field.und[0] && typeof field.und[0] === 'object'){
      field.und[0].value = value;
    }else if(index != 'field_tags'){
      value? field.und = value : field.und = [];
    }
  }

  isEmpty(variable) {
    return Object.keys(variable).every(function(key) {
      return variable[key]===''||variable[key]===null;
    });
  }

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

  formErrors = {
     'title': '',
     'field_categories': '',
     'field_cover_photo': '',
     'field_show_tell_video': '',
     'field_story': '',
   };

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
