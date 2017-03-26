import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectFormComponent } from './project-form/project-form.component';
import { RouterModule, Routes } from '@angular/router';
import { ProjectFormRoutingModule } from './project-form-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TagInputModule } from 'ng2-tag-input';
import { CKEditorModule } from 'ng2-ckeditor';
import { DndModule } from 'ng2-dnd';
import { YourStoryComponent } from './your-story/your-story.component';
import { HowToComponent } from './how-to/how-to.component';
import { TeamComponent } from './team/team.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModule } from 'ng2-img-cropper';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TagInputModule,
    CKEditorModule,
    FormsModule,
    DndModule,
    ProjectFormRoutingModule,
    NgbModule,
    ImageCropperModule,
    SharedModule
  ],
  declarations: [
    YourStoryComponent,
    HowToComponent,
    TeamComponent,
    ProjectFormComponent
  ]
  
})

export class ProjectFormModule { };


