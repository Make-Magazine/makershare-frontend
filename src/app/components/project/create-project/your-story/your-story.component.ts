import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ViewService } from '../../../../d7services/view/view.service'

@Component({
  selector: 'app-your-story',
  templateUrl: './your-story.component.html',
})
export class YourStoryComponent implements OnInit {
  @Output() YourStory = new EventEmitter();
  // form fields
  YourStoryForm: FormGroup;
  Name: FormControl;
  Categories: FormControl;
  Teaser: FormControl;
  Coverphoto: FormControl;
  ShowTellVideo: FormControl;
  AhaMoment: FormControl;
  UhOhMoment: FormControl;
  Tags: FormControl;

  // data fields
  ImgURL = '';
  accepted_image_width = 600;
  accepted_image_height = 400;
  Categories_Data = [];

  constructor(
    private fb: FormBuilder,
    private viewService: ViewService,
  ) { 
  }

  ngOnInit() {
    this.buildForm();

    this.viewService.getView('projects_categories').subscribe(data => {
      data.forEach((element, index) => {
        this.Categories_Data[index] = {};
        this.Categories_Data[index].display = element.name;
        this.Categories_Data[index].value = element.tid;
      });
    });
  }

  buildForm(): void {
   this.YourStoryForm = this.fb.group({
     'Name': [this.Name, [Validators.required, Validators.minLength(4)]],
     'Categories': [this.Categories, [Validators.required]],
     'Teaser': [this.Teaser, [Validators.required]],
     'Coverphoto': [this.Coverphoto, [Validators.required]],
     'ShowTellVideo': [this.ShowTellVideo, [CustomValidators.url]],
     'AhaMoment': [this.AhaMoment, [CustomValidators.url]],
     'UhOhMoment': [this.UhOhMoment, [CustomValidators.url]],
     'Tags': [this.Tags, [Validators.required]],
   });
   this.YourStoryForm.valueChanges.subscribe(data => this.onValueChanged(data));
   this.onValueChanged(); // (re)set validation messages now
 }

 ImageUpdated(event){
   this.YourStoryForm.controls['Coverphoto'].setValue(null);
   var files = event.srcElement.files;
   if(files.length == 1 && files[0].type.startsWith("image")){
    var reader = new FileReader();
    reader.onload = (imgsrc:any) => {
      var image = new Image();
      image.src = imgsrc.target.result;
      var valid = true;
      let CreateComponent = this;
      image.onload = function() {
        if(image.width < CreateComponent.accepted_image_width || image.height < CreateComponent.accepted_image_height){
          CreateComponent.formErrors.Coverphoto = CreateComponent.validationMessages.Coverphoto.wrongsize;
          CreateComponent.ImgURL = '';
        }else{
          CreateComponent.ImgURL = imgsrc.target.result;
          CreateComponent.YourStoryForm.controls['Coverphoto'].setValue(files[0]);
        }
      };
    }
    reader.readAsDataURL(files[0]);
   }
   else{
     this.formErrors.Coverphoto = this.validationMessages.Coverphoto.notvalidformat;
     this.ImgURL = '';     
   }
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
    if(this.YourStoryForm.valid){
      this.YourStory.emit(this.YourStoryForm);
    }else{
      this.YourStory.emit(false);
    }
  }

  formErrors = {
     'Name': '',
     'Categories': '',
     'Teaser': '',
     'Coverphoto': '',
     'ShowTellVideo': '',
     'AhaMoment': '',
     'UhOhMoment': '',
     'Tags': '',
   };

   validationMessages = {
     'Name': {
       'required':      'Project Name is required.',
       'minlength':     'Project Name must be at least 4 characters long.',
     },
     'Categories': {
       'required': 'Categories is required.'
     },
     'Teaser': {
       'required': 'Teaser is required.'
     },
     'Coverphoto': {
       'required': 'Cover photo is required.',
       'notvalidformat': 'Please choose an image file.',
       'wrongsize': 'choose a photo that is at least 600 x 400 px.',
     },
     'ShowTellVideo': {
       'url': 'Please enter a valid url, ex: http://example.com.',
     },
     'AhaMoment': {
       'url': 'Please enter a valid url, ex: http://example.com.',
     },
     'UhOhMoment': {
       'url': 'Please enter a valid url, ex: http://example.com.',
     },
     'Tags': {
       'required': 'Tags is required.'
     },
   };
}
