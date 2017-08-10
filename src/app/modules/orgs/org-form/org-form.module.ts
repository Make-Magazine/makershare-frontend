import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AboutUsComponent } from '../../orgs/org-form/about-us/about-us.component';
import { BasicInfoComponent } from '../../orgs/org-form/basic-info/basic-info.component';
import { OrgsRoutingModule } from '../../orgs/org-form/org-form.routing.module';
import { OrgFormComponent } from '../../orgs/org-form/org-form.component';
import { ProjectsComponent } from '../../orgs/org-form/projects/projects.component';

@NgModule({
  imports: [CommonModule, OrgsRoutingModule, SharedModule.forChild(), ReactiveFormsModule],
  declarations: [
    OrgFormComponent,
    BasicInfoComponent,
    AboutUsComponent,
    ProjectsComponent,
  ],
})
export class OrgFormModule {}
