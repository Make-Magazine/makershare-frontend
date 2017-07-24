import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgsComponent } from './orgs.component';
import { OrgsRoutingModule } from './orgs.routing.module';

@NgModule({
  imports: [
    CommonModule,
    OrgsRoutingModule
    
  ],
  declarations: [
    OrgsComponent
    ]
})
export class OrgsModule { }
export {
  OrgsComponent
};