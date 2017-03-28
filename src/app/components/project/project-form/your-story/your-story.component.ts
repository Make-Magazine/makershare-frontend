import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ViewService } from '../../../../d7services/view/view.service';
import { FileService } from '../../../../d7services/file/file.service';
import { ProjectCategory } from '../../../../models/project/project-form/project-category';
import { FileEntity } from '../../../../models/Drupal/file_entity';
import { ProjectForm } from '../../../../models/project/project-form/project';
import { NodeHelper } from '../../../../models/Drupal/NodeHelper';
import { CropperSettings } from 'ng2-img-cropper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-project-form-your-story',
  templateUrl: './your-story.component.html',
  providers: [NgbTooltipConfig],
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
  @Input('project') project: ProjectForm;
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

  //image cropper 
  cropperSettings: CropperSettings;
  imagedata:any;
  
  constructor(
    private fb: FormBuilder,
    private viewService: ViewService,
    private fileService: FileService,
    private modalService: NgbModal,
    private config: NgbTooltipConfig,
  ) {
    this.SetCropperSettings();
    config.placement = 'right';
    config.triggers = 'click:blur';
  }

  /**
   * on loading the component we will assign the printable variables to the parent printable variables
   * also we will build our form
   * and getting base details as categories 
   * 
   */
  ngOnInit() {
    this.cover_image = this.FormPrintableValues.cover_image;
    this.tags = this.FormPrintableValues.tags;
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
        if(NodeHelper.isEmpty(value) || !control.valid){
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
      this.project[index].und[0].value = value;
    }else if(index != 'field_tags'){
      value? this.project[index].und = value : this.project[index].und = [];
    }
  }

  /**
   * this function will watch for the new changes in cover_image field and set the values after converting the file to base64
   * its better if we used custom validator so we can remove the error check here "need works"
   * @param event the selected file object
   */
  ImageUpdated(closebtn:HTMLButtonElement,SkipCropping:boolean){ 
    closebtn.click();
    this.cover_image.file = '';
    this.cover_image.filename = '';
    this.formErrors.field_cover_photo = '';
    if(!NodeHelper.isEmpty(this.imagedata)){
      if(SkipCropping){
        let img = new Image();
        img.src = this.imagedata.original.src;
        if(img.width < this.accepted_image_width || img.height < this.accepted_image_height){
          this.formErrors.field_cover_photo = this.validationMessages.field_cover_photo.validimagesize;
        }else{
          this.cover_image.file = this.imagedata.original.src;
        }
      }else{
        this.cover_image.file = this.imagedata.image;
      }
      this.cover_image.filename = "myprojectcover.png";
      this.imagedata = {};
    }
    if(!this.cover_image.file && !this.formErrors.field_cover_photo){
      this.formErrors.field_cover_photo = this.validationMessages.field_cover_photo.notvalidformat;
    }
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
  SetCategories(ParentCategoryElement:HTMLSelectElement){
    ParentCategoryElement.value = "_none_";
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

   TooltipText = {
     'projectName': {
       'title': 'How to Choose a Project Name:',
       'guide' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis voluptates magni ducimus id quos, fugiat repellat harum reprehenderit, laborum est officiis distinctio veniam nulla facere!'
     },
     'category': {
       'title': 'Choosing a category',
       'guide' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
     },
     'teaser': {
       'title': 'Writing a teaser:',
       'guide' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
     },
     'show_tell': {
       'title': 'Making an awesome SHOW &amp; TELL video:',
       'guide' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis voluptates magni ducimus id quos, fugiat repellat harum reprehenderit, laborum est officiis distinctio veniam nulla facere!',
       'img_src' : 'http://placehold.it/160x90'
     },
     'AHA': {
       'title': 'AHA ad UH-OH Moments',
       'guide' : 'Talk about a positive breakthrough you had while working on the project, or a learning experience or something that went horribly, horribly wrong...'
     },
     'story': {
       'title': 'Tips for creating a great story:',
       'guide' : `<p>Think about: What does your project do? How did you get started? What was your process for working on it? What did you learn by making it? How do people react to your project? If the project didn’t turn out the way you planned, what did you learn from your “failure”?</p><p>Definitely include a video and photos of the finished product. </p>`
     }
   };

  SetCropperSettings():void{
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 600;
    this.cropperSettings.height = 400;
    this.cropperSettings.minWidth = 600;
    this.cropperSettings.minHeight = 400;
    this.cropperSettings.dynamicSizing = true;
    this.cropperSettings.noFileInput = true;    
    this.imagedata = {};
  }

  OpenCoverImageModal(Template){
    this.modalService.open(Template);
  }
  UploadBtn($event,cropper){
    if($event.target.files.length ===0) return; 
    var image:any = new Image();
    var file:File = $event.target.files[0];
    var myReader:FileReader = new FileReader();
    myReader.onloadend = function (loadEvent:any) {
        image.src = loadEvent.target.result;
        cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
  }
}
