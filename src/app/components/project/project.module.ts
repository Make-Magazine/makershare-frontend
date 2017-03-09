import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectRoutingModule } from './project-routing.module';
import { CreateProjectModule } from './create-project/create-project.module';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectStoryComponent } from './project-details/project-story/project-story.component';
import { ProjectHowToComponent } from './project-details/project-how-to/project-how-to.component';

@NgModule({
  imports: [
    CommonModule,
    CreateProjectModule,
    ProjectRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProjectDetailsComponent, ProjectStoryComponent, ProjectHowToComponent],
  exports:[]
})
export class ProjectModule { }
