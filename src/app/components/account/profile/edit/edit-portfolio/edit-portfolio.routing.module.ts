import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPortfolioComponent } from './edit-portfolio/edit-portfolio.component';



const EditPortfolioRouts: Routes = [
  {
    path: '', component:EditPortfolioComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(EditPortfolioRouts),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class EditPortfolioRouting { }
