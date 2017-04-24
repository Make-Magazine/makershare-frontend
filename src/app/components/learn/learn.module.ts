import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnComponent } from './learn/learn.component';
import { IndividualWorkshopComponent } from './individual-workshop/individual-workshop.component';
import { BookComponent } from './book/book.component';
import { LearnRoutingModule }from './learn-routing.module';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SingleObjectComponent } from './individual-workshop/single-object/single-object.component';
import { ObjectViewComponent } from './individual-workshop/single-object/object-view/object-view.component';


//import { MetaModule } from '@nglibs/meta';


@NgModule({ 
  imports: [
    CommonModule,
    LearnRoutingModule,
    Ng2PageScrollModule.forRoot(),
    SharedModule,
    NgbModule,
    //MetaModule.forRoot()
  ],
  declarations: [
    LearnComponent,
    IndividualWorkshopComponent,
    BookComponent,
    SingleObjectComponent,
    ObjectViewComponent,

    
  ]
})
export class LearnModule { }
export {LearnComponent}; 