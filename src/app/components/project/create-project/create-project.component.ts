import { Component, OnInit } from '@angular/core';
import { NodeService } from '../../../d7services/node/node.service'
import { Router } from "@angular/router";
import { FormBuilder, Validators , FormControl , FormControlDirective , FormGroup} from '@angular/forms';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  CreateProjectForm: FormGroup;
  name: FormControl;
  categories: FormControl;
  teaser: FormControl;
  coverphoto: FormControl;

  ImgURL = '';

  constructor(
    private fb: FormBuilder,
    private nodeService: NodeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
   this.CreateProjectForm = this.fb.group({
     'name': [this.name, [
         Validators.required,
         Validators.minLength(4),
       ]
     ],
     'categories': [this.categories, [Validators.required]],
     'teaser': [this.teaser, [Validators.required]],
     'coverphoto': [this.coverphoto, [Validators.required]],
   });
   this.CreateProjectForm.valueChanges
     .subscribe(data => this.onValueChanged(data));
   this.onValueChanged(); // (re)set validation messages now
 }

 ImageUpdated(event){
   var files = event.srcElement.files;
   console.log(files);
   if(files.length == 1 && files[0].type.startsWith("image")){
    this.CreateProjectForm.patchValue(files[0]);
    var reader = new FileReader();
    reader.onload = (imgsrc:any) => {
      this.ImgURL =  imgsrc.target.result;
    }
    reader.readAsDataURL(files[0]);
   }
   else{
     this.formErrors.coverphoto = this.validationMessages.coverphoto.notvalidformat;
     this.ImgURL = '';
   }
 }

 onValueChanged(data?: any) {
     if (!this.CreateProjectForm) { return; }
     const form = this.CreateProjectForm;
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
     },
   };

  //create project on submit click
  CreateProject (event){
    if(this.CreateProjectForm.valid){
      console.log(this.CreateProjectForm.value);
    }
  }
}
