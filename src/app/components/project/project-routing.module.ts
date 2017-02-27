import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectComponent } from './create-project/create-project.module';
import { ProjectDetailsComponent } from './project-details/project-details.component';



const ProjectRouts: Routes = [
  { path: 'project/create',  component: CreateProjectComponent },
  { path: 'project/view/:nid', component: ProjectDetailsComponent }
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

export class ProjectRoutingModule { }
