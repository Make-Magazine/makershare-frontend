import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './view/profile.component';
import { ProjectsComponent } from './view/projects/projects.component';
import { ProfileRoutingModule } from './profile.routing.module';
import { IcDatepickerModule } from 'ic-datepicker';
import { TagInputModule } from 'ng2-tag-input';
import { FormsModule } from '@angular/forms';
import { SharedModule }  from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModule } from 'ng2-img-cropper';
import { CKEditorModule } from 'ng2-ckeditor';
import { BaseComponent } from './base/base.component';
import { EditPortfolioComponent } from './view/edit-portfolio/edit-portfolio/edit-portfolio.component';
import { PortfolioTabComponent } from './view/edit-portfolio/portfolio-tab/portfolio-tab.component';
import { ProjectCardPortfolioComponent } from './view/edit-portfolio/project-card-portfolio/project-card-portfolio.component';
import { DndModule } from 'ng2-dnd';

@NgModule({
  imports: [
    IcDatepickerModule,
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    SharedModule,
    NgbModule,
    ImageCropperModule,
    CKEditorModule,
    DndModule
  ],
  declarations: [
    ProfileComponent,
    ProjectsComponent,
    BaseComponent,
    EditPortfolioComponent,
    PortfolioTabComponent,
    ProjectCardPortfolioComponent,
  ]
})
export class ProfileModule { }
