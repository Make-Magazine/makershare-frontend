import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcasesComponent } from './showcases/showcases.component';
import { SinglShowcaseComponent } from './single-showcase/SingleShowcase.component';
import { ShowcaseRoutingModule } from './showcase-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ShowcaseProjectModule } from './showcase-project/showcase-project.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ShowcaseRoutingModule,
    SharedModule.forChild(),
    NgbModule,
    ShowcaseProjectModule,
  ],
  declarations: [ShowcasesComponent, SinglShowcaseComponent],
})
export class ShowcaseModule {}
export { ShowcasesComponent };
export { SinglShowcaseComponent };
