import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MakersComponent } from 'app/modules/makers/makers.component';
import { ProjectsRoutingModule } from 'app/modules/makers/makers.routing.modules';
import { SharedModule } from 'app/modules/shared/shared.module';

@NgModule({
  imports: [CommonModule, ProjectsRoutingModule, SharedModule.forChild()],
  declarations: [MakersComponent],
})
export class MakersModule {}
