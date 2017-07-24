import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesComponent } from './companies.component';
import { SharedModule } from '../shared/shared.module';
import { CompaniesRoutingModule } from './companies.routing.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CompaniesRoutingModule

  ],
  declarations: [
    CompaniesComponent,
    
    ]
})
export class CompaniesModule { }
export {
  CompaniesComponent,
  
};