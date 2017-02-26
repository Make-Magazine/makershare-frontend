import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule } from './project-routing.module';
import { CreateProjectModule } from './create-project/create-project.module';

@NgModule({
  imports: [
    CommonModule,
    CreateProjectModule,
    ProjectRoutingModule,
  ],
  declarations: [],
  exports:[]
})
export class ProjectModule { }
