import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsRoutingModule } from './project-details-routing.module'
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectDetailsComponent } from './project-details.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { MetaModule } from '@nglibs/meta';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectDetailsRoutingModule,
    SharedModule.forChild(),
    NgbModule,
    //MetaModule.forRoot()
  ],
  declarations: [ProjectDetailsComponent]
})
export class ProjectDetailsModule { }
