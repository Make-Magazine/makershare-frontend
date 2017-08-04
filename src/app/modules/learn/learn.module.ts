import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookComponent } from 'app/modules/learn/book/book.component';
import { IndividualWorkshopComponent } from 'app/modules/learn/individual-workshop/individual-workshop.component';
import { ObjectViewComponent } from 'app/modules/learn/individual-workshop/single-object/object-view/object-view.component';
import { SingleObjectComponent } from 'app/modules/learn/individual-workshop/single-object/single-object.component';
import { LearnRoutingModule } from 'app/modules/learn/learn-routing.module';
import { LearnComponent } from 'app/modules/learn/learn/learn.component';
import { SharedModule } from 'app/modules/shared/shared.module';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

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
