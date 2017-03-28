import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPortfolioRouting } from './edit-portfolio.routing.module';
import { EditPortfolioComponent } from './edit-portfolio/edit-portfolio.component';

@NgModule({
  imports: [
    CommonModule,
    EditPortfolioRouting
  ],
  declarations: [EditPortfolioComponent]
})
export class EditPortfolioModule { }
