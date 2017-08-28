import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrgsAboutUsComponent } from '../orgs/orgs-about-us/orgs-about-us.component';
import { OrgsProjectsComponent } from '../orgs/orgs-projects/orgs-projects.component';
import { OrgsComponent } from '../orgs/orgs.component';
import { OrgsRoutingModule } from '../orgs/orgs.routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, OrgsRoutingModule, SharedModule.forChild()],
  declarations: [OrgsComponent, OrgsAboutUsComponent, OrgsProjectsComponent],
})
export class OrgsModule {}
export { OrgsComponent };
