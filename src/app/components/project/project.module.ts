import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule } from './project-routing.module';
import { CreateProjectModule } from './create-project/create-project.module';
import { ProjectDetailsComponent } from './project-details/project-details.component';

@NgModule({
  imports: [
    CommonModule,
    CreateProjectModule,
    ProjectRoutingModule,
  ],
  declarations: [ProjectDetailsComponent],
  exports:[]
})
export class ProjectModule { }
