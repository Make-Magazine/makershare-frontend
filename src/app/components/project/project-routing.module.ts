import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CreateProjectComponent } from './create-project/create-project.module';
// import { ProjectDetailsComponent } from './project-details/project-details.component';



const ProjectRouts: Routes = [
  {
    path: '',
    children: [
      { path: 'create', loadChildren: 'app/components/project/create-project/create-project.module#CreateProjectModule' },
      { path: 'view/:nid', loadChildren: 'app/components/project/project-details/project-details.module#ProjectDetailsModule' },
    ]
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

export class ProjectRoutingModule { }
