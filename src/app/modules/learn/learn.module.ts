import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { SharedModule } from '../shared/shared.module';
import { BookComponent } from './book/book.component';
import { IndividualWorkshopComponent } from './individual-workshop/individual-workshop.component';
import { ObjectViewComponent } from './individual-workshop/single-object/object-view/object-view.component';
import { SingleObjectComponent } from './individual-workshop/single-object/single-object.component';
import { LearnRoutingModule } from './learn-routing.module';
import { LearnComponent } from './learn/learn.component';

@NgModule({
  imports: [
    CommonModule,
    LearnRoutingModule,
    Ng2PageScrollModule.forRoot(),
    SharedModule.forChild(),
    NgbModule,
  ],
  declarations: [
    LearnComponent,
    IndividualWorkshopComponent,
    BookComponent,
    SingleObjectComponent,
    ObjectViewComponent,
  ],
})
export class LearnModule {}
export { LearnComponent };
