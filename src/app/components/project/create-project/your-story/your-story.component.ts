import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-your-story',
  templateUrl: './your-story.component.html',
  styleUrls: ['./your-story.component.css']
})
export class YourStoryComponent implements OnInit {
  @Output() YourStory = new EventEmitter();
  YourStoryForm: FormGroup;
  ProjectName: FormControl;
  categories: FormControl;
  teaser: FormControl;
  coverphoto: FormControl;

  ImgURL = '';
  accepted_image_width = 600;
  accepted_image_height = 400;
  constructor(
    private fb: FormBuilder,
  ) { 
    this.YourStory.emit(this.YourStoryForm);
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
   this.YourStoryForm = this.fb.group({
     'ProjectName': [this.ProjectName, [
         Validators.required,
         Validators.minLength(4),
       ]
     ],
   });
   this.YourStoryForm.valueChanges.subscribe(data => this.onValueChanged(data));
   this.onValueChanged(); // (re)set validation messages now
 }

 ImageUpdated(event){
   this.YourStoryForm.controls['coverphoto'].setValue(null);
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
          CreateComponent.formErrors.coverphoto = CreateComponent.validationMessages.coverphoto.wrongsize;
          CreateComponent.ImgURL = '';
        }else{
          CreateComponent.ImgURL = imgsrc.target.result;
          CreateComponent.YourStoryForm.controls['coverphoto'].setValue(files[0]);
        }
      };
    }
    reader.readAsDataURL(files[0]);
   }
   else{
     this.formErrors.coverphoto = this.validationMessages.coverphoto.notvalidformat;
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
     'name': '',
     'categories': '',
     'teaser': '',
     'coverphoto': '',
   };

   validationMessages = {
     'name': {
       'required':      'Project Name is required.',
       'minlength':     'Project Name must be at least 4 characters long.',
     },
     'categories': {
       'required': 'Categories is required.'
     },
     'teaser': {
       'required': 'Teaser is required.'
     },
     'coverphoto': {
       'required': 'Cover photo is required.',
       'notvalidformat': 'Please choose an image file.',
       'wrongsize': 'choose a photo that is at least 600 x 400 px',
     },
   };
}
