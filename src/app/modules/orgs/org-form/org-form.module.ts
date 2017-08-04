import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AboutUsComponent } from 'app/modules/orgs/org-form/about-us/about-us.component';
import { BasicInfoComponent } from 'app/modules/orgs/org-form/basic-info/basic-info.component';
import { OrgsRoutingModule } from 'app/modules/orgs/org-form/org-form.routing.module';
import { OrgFormComponent } from 'app/modules/orgs/org-form/org-form/org-form.component';
import { ProjectsComponent } from 'app/modules/orgs/org-form/projects/projects.component';

@NgModule({
  imports: [CommonModule, OrgsRoutingModule],
  declarations: [
    OrgFormComponent,
    BasicInfoComponent,
    AboutUsComponent,
    ProjectsComponent,
  ],
})
export class OrgFormModule {}
