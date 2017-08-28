import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MakersComponent } from '../makers/makers.component';
import { ProjectsRoutingModule } from '../makers/makers.routing.modules';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, ProjectsRoutingModule, SharedModule.forChild()],
  declarations: [MakersComponent],
})
export class MakersModule {}
