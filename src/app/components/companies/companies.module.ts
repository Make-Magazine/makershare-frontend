import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesComponent } from './companies.component';
import { ProjectsRoutingModule } from './companies.routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule

  ],
  declarations: [CompaniesComponent]
})
export class CompaniesModule { }
export {CompaniesComponent};