import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectComponent } from './create-project/create-project.component';

export const CreateProjectRoutes:Routes = [
  {
    path:'',
    component:CreateProjectComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(CreateProjectRoutes),
  ],
  exports: [
    RouterModule,
  ],
})

export class CreateProjectRoutingModule { }
