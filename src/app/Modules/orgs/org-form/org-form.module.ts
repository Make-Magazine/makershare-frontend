import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgFormComponent } from './org-form/org-form.component';
import { OrgsRoutingModule } from './org-form.routing.module';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProjectsComponent } from './projects/projects.component';

@NgModule({
  imports: [
    CommonModule,
    OrgsRoutingModule,
  ],
  declarations: [OrgFormComponent, BasicInfoComponent, AboutUsComponent, ProjectsComponent]
})
export class OrgFormModule { }
