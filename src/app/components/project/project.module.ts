import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectRoutingModule } from './project-routing.module';
// import { ProjectDetailsComponent } from './project-details/project-details.component';
// import { ProjectStoryComponent } from './project-details/project-story/project-story.component';
// import { ProjectHowToComponent } from './project-details/project-how-to/project-how-to.component';

@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    // ProjectDetailsComponent, ProjectStoryComponent, ProjectHowToComponent
    ],
  exports:[]
})
export class ProjectModule { }
