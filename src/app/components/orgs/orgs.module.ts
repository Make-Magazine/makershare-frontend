import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgsComponent } from './orgs.component';
import { OrgsRoutingModule } from './orgs.routing.module';
import { OrgsFollowersComponent } from '../orgs/orgs-followers/orgs-followers.component';
import { OrgsAboutUsComponent } from './orgs-about-us/orgs-about-us.component';
import { OrgsProjectsComponent } from './orgs-projects/orgs-projects.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    OrgsRoutingModule,
        SharedModule.forChild(),

    



  ],
  declarations: [
    OrgsComponent,
    OrgsAboutUsComponent,
    OrgsProjectsComponent,
    OrgsFollowersComponent
  ]
})
export class OrgsModule { }
export {
  OrgsComponent,
  OrgsFollowersComponent
  
};