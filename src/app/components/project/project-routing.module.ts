import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ProjectRouts: Routes = [
  {
    path: '',
    children: [
      { path: 'create', loadChildren: 'app/components/project/project-form/project-form.module#ProjectFormModule' },
      { path: 'edit', loadChildren: 'app/components/project/project-form/project-form.module#ProjectFormModule' },
      { path: 'view/:nid', loadChildren: 'app/components/project/project-details/project-details.module#ProjectDetailsModule' },
    ]
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

export class ProjectRoutingModule { }
