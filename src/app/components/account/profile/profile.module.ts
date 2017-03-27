import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './view/profile.component';
import { ProjectsComponent } from './view/projects/projects.component';
import { ProfileRoutingModule } from './profile.routing.module';
import { SelectModule } from 'ng2-select';
import { IcDatepickerModule } from 'ic-datepicker';
import { AllProfileComponent } from './edit/all-profile/all-profile.component';
import { TagInputModule } from 'ng2-tag-input';
import { FormsModule } from '@angular/forms';
import { SharedModule }  from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModule } from 'ng2-img-cropper';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  imports: [
    IcDatepickerModule,
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    TagInputModule,
    SharedModule,
    NgbModule,
    ImageCropperModule,
    CKEditorModule
  ],
  declarations: [
    AllProfileComponent,
    ProfileComponent,
    ProjectsComponent
  ]
})
export class ProfileModule { }
