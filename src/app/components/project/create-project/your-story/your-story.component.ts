import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { validimagesize } from '../../../../validations/valid-image-size.validation';
import { ViewService } from '../../../../d7services/view/view.service';
import { CreateYourStoryModel, Category } from '../../../../models/project/create-project/your-story';
import { ProjectCategory } from '../../../../models/project/project-category';
import { CoverImage } from '../../../../models/project/create-project/cover-image';


@Component({
  selector: 'app-your-story',
  templateUrl: './your-story.component.html',
})

export class YourStoryComponent implements OnInit {
  @Output() YourStory = new EventEmitter();
  @Input('YourStoryModel') YourStoryModel: CreateYourStoryModel;

  // TempModel: CreateYourStoryModel = {
  //   title:'',
  //   Categories:[],
  //   field_aha_moment:'',
  //   field_cover_photo: this.CoverImg,
  //   field_show_tell_video:'',
  //   field_story:'',
  //   field_tags:[],
  //   field_teaser:'',
  //   field_uh_oh_moment:'',
  // };

  ValidValues:CreateYourStoryModel;
  YourStoryForm: FormGroup;
  Categories_Data:Category[];
  accepted_image_width = 600;
  accepted_image_height = 400;

  constructor(
    private fb: FormBuilder,
    private viewService: ViewService,
  ) {}

  ngOnInit() {
    // console.log(this.TempModel);
    this.buildForm();
    this.viewService.getView('projects_categories').subscribe(data => {
      data.forEach((element:ProjectCategory, index) => {
        this.Categories_Data[index].display = element.name;
        this.Categories_Data[index].value = element.tid;
      });
    });
  }

  buildForm(): void {
    this.YourStoryForm = this.fb.group({
      'title': [this.YourStoryModel.title, [Validators.required,Validators.minLength(4)]],
      'Categories': [this.YourStoryModel.Categories, [Validators.required]],
      'field_teaser': [this.YourStoryModel.field_teaser],
      'field_cover_photo': [this.YourStoryModel.field_cover_photo, [Validators.required,validimagesize(this.accepted_image_width,this.accepted_image_height)]],
      'field_show_tell_video': [this.YourStoryModel.field_show_tell_video, [CustomValidators.url]],
      'field_aha_moment': [this.YourStoryModel.field_aha_moment, [CustomValidators.url]],
      'field_uh_oh_moment': [this.YourStoryModel.field_uh_oh_moment, [CustomValidators.url]],
      'field_story':[this.YourStoryModel.field_story,[Validators.required]],
      'field_tags': [this.YourStoryModel.field_tags],
    });
    this.YourStoryForm.valueChanges.subscribe(data => this.onValueChanged(data));
    for(let index in this.YourStoryForm.controls){
      let control = this.YourStoryForm.controls[index];
      control.valueChanges.subscribe((value) => {
        if(control.valid && !this.isEmpty(value)){
          this.ValidValues[index] = value;
        }else{
          delete this.ValidValues[index];
        }
        this.YourStory.emit(this.ValidValues);
      });
    }
   this.onValueChanged();
 }

  isEmpty(variable) {
    return Object.keys(variable).every(function(key) {
      return variable[key]===''||variable[key]===null;
    });
  }

  ImageUpdated(event){   
    var files = event.srcElement.files;
    if(files.length == 1 && files[0].type.startsWith("image")){
      this.ImageFileObjectToBase64(files[0],this.YourStoryModel.field_cover_photo);
    }
    else{
      this.formErrors.field_cover_photo = this.validationMessages.field_cover_photo.notvalidformat;      
    }
 }

 ImageFileObjectToBase64(file:File,ImgObject:CoverImage){
    var reader = new FileReader();
    reader.onload = (imgsrc:any) => {
      var image = new Image();
      image.src = imgsrc.target.result;
      var valid = true;
      let CreateComponent = this;
      image.onload = function() {
        if(image.width < CreateComponent.accepted_image_width || image.height < CreateComponent.accepted_image_height){
          CreateComponent.formErrors.field_cover_photo = CreateComponent.validationMessages.field_cover_photo.validimagesize;
          let EmptyImg:CoverImage;
          ImgObject = EmptyImg;
        }else{
          ImgObject.filename = file.name;
          ImgObject.file = imgsrc.target.result;
        }
      };
    }
    reader.readAsDataURL(file);
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

  formErrors = {
     'title': '',
     'Categories': '',
     'field_cover_photo': '',
     'field_show_tell_video': '',
     'field_aha_moment': '',
     'field_uh_oh_moment': '',
     'field_story': '',
   };

   validationMessages = {
     'title': {
       'required':      'Project Name is required.',
       'minlength':     'Project Name must be at least 4 characters long.',
     },
     'Categories': {
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
     'field_aha_moment': {
       'url': 'Please enter a valid url, ex: http://example.com.',
     },
     'field_uh_oh_moment': {
       'url': 'Please enter a valid url, ex: http://example.com.',
     },
     'field_story': {
       'required': 'Story is required.'
     },
   };
}
