import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsComponent } from './project-details.component';
import { Routes,RouterModule } from '@angular/router';

const ProjectRouts: Routes = [
  {
    path: '', component:ProjectDetailsComponent
  },
  // { path: '/view/:nid', component: ProjectDetailsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ProjectRouts),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class ProjectDetailsRoutingModule { }