import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrgsAboutUsComponent } from 'app/modules/orgs/orgs-about-us/orgs-about-us.component';
import { OrgsProjectsComponent } from 'app/modules/orgs/orgs-projects/orgs-projects.component';
import { OrgsComponent } from 'app/modules/orgs/orgs.component';
import { OrgsRoutingModule } from 'app/modules/orgs/orgs.routing.module';
import { SharedModule } from 'app/modules/shared/shared.module';

@NgModule({
  imports: [CommonModule, OrgsRoutingModule, SharedModule.forChild()],
  declarations: [OrgsComponent, OrgsAboutUsComponent, OrgsProjectsComponent],
})
export class OrgsModule {}
export { OrgsComponent };
