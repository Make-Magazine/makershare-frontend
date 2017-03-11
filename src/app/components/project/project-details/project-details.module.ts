import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsRoutingModule } from './project-details-routing.module'
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectDetailsComponent } from './project-details.component';
import { ProjectStoryComponent } from './project-story/project-story.component';
import { ProjectHowToComponent } from './project-how-to/project-how-to.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectDetailsRoutingModule
  ],
  declarations: [ProjectDetailsComponent,ProjectStoryComponent,ProjectHowToComponent]
})
export class ProjectDetailsModule { }
