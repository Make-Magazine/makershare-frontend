import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './view/profile.component';
import { ProjectsComponent } from './view/projects/projects.component';
import { ProfileRoutingModule } from './profile.routing.module';
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
import { RouterModule } from '@angular/router';
import { FileManagerComponent } from './view/edit-portfolio/file-manager/file-manager.component';
import { Ng2FileDropModule } from 'ng2-file-drop';
import { ResponsiveModule } from 'ng2-responsive';

//import { MetaModule } from '@nglibs/meta';
// import { PipeModule } from '../../../pipes/custom-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forChild(),
    NgbModule,
    ImageCropperModule,
    CKEditorModule,
    DndModule,
    Ng2FileDropModule,
    ResponsiveModule
    //MetaModule.forRoot()
    // PipeModule.forRoot(),
  ],
  declarations: [
    ProfileComponent,
    ProjectsComponent,
    BaseComponent,
    EditPortfolioComponent,
    PortfolioTabComponent,
    ProjectCardPortfolioComponent,
    FileManagerComponent,
  ]
})
export class ProfileModule { }
