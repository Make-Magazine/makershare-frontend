import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'app/modules/shared/shared.module';
import { ShowcaseRoutingModule } from 'app/modules/showcase/showcase-routing.module';
import { ShowcasesComponent } from 'app/modules/showcase/showcases/showcases.component';
import { SingleShowcaseComponent } from 'app/modules/showcase/single-showcase/single-showcase.component';

@NgModule({
  imports: [
    CommonModule,
    ShowcaseRoutingModule,
    SharedModule.forChild(),
    NgbModule,
  ],
  declarations: [ShowcasesComponent, SingleShowcaseComponent],
})
export class ShowcaseModule {}
export { ShowcasesComponent };
export { SingleShowcaseComponent };
