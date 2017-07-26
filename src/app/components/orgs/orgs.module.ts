import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgsComponent } from './orgs.component';
import { OrgsRoutingModule } from './orgs.routing.module';
import { OrgsFollowersComponent } from '../orgs/orgs-followers/orgs-followers.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    OrgsRoutingModule,
        SharedModule.forChild(),

    
  ],
  declarations: [
    OrgsComponent,
    OrgsFollowersComponent,
    ]
})
export class OrgsModule { }
export {
  OrgsComponent,
  OrgsFollowersComponent
  
};