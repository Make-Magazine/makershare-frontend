import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectComponent } from './create-project/create-project/create-project.component';


const ProjectRouts: Routes = [
  { path: 'project/create',  component: CreateProjectComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(ProjectRouts)
  ],
  exports: [
    RouterModule
  ]
})

export class ProjectRoutingModule { }
