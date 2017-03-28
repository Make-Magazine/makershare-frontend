import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPortfolioRouting } from './edit-portfolio.routing.module';
import { EditPortfolioComponent } from './edit-portfolio/edit-portfolio.component';
import { PortfolioTabComponent } from './portfolio-tab/portfolio-tab.component';
import { ProjectCardPortfolioComponent } from './project-card-portfolio/project-card-portfolio.component';
import { DndModule } from 'ng2-dnd';

@NgModule({
  imports: [
    CommonModule,
    EditPortfolioRouting,
    DndModule
  ],
  declarations: [EditPortfolioComponent, PortfolioTabComponent, ProjectCardPortfolioComponent]
})
export class EditPortfolioModule { }
