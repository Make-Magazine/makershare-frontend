import { NgModule } from '@angular/core';
import { ProjectDetailsComponent } from './project-details.component';
import { Routes,RouterModule } from '@angular/router';

const ProjectRouts: Routes = [
  {
    path: '', component:ProjectDetailsComponent
  },
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