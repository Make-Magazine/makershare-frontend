import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CompaniesComponent } from '../companies/companies.component';
import { CompaniesRoutingModule } from '../companies/companies.routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule, CompaniesRoutingModule],
  declarations: [CompaniesComponent],
})
export class CompaniesModule {}
export { CompaniesComponent };
