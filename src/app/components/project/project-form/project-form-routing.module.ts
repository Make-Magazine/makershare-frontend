import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectFormComponent } from './project-form/project-form.component';

export const ProjectFormRoutes:Routes = [
  { path:'',component:ProjectFormComponent},
  { path:':nid',component:ProjectFormComponent}
]

@NgModule({
  imports: [
    RouterModule.forChild(ProjectFormRoutes),
  ],
  exports: [
    RouterModule,
  ],
})

export class ProjectFormRoutingModule { }
