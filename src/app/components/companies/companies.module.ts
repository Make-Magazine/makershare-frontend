import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesComponent } from './companies.component';
import { ProjectsRoutingModule } from './companies.routing.module';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule
  ],
  declarations: [CompaniesComponent]
})
export class CompaniesModule { }
export {CompaniesComponent};