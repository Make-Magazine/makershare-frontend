import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from 'app/modules/companies/companies.component';

const companiesRouts: Routes = [{ path: '', component: CompaniesComponent }];

@NgModule({
  imports: [RouterModule.forChild(companiesRouts)],
  exports: [RouterModule],
  declarations: [],
})
export class CompaniesRoutingModule {}
