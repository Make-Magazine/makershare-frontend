import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CompaniesComponent } from 'app/modules/companies/companies.component';
import { CompaniesRoutingModule } from 'app/modules/companies/companies.routing.module';
import { SharedModule } from 'app/modules/shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule, CompaniesRoutingModule],
  declarations: [CompaniesComponent],
})
export class CompaniesModule {}
export { CompaniesComponent };
