import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgsComponent } from './orgs.component';


const orgsRouts: Routes = [
   { path: ':path', component:OrgsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(orgsRouts),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})


export class OrgsRoutingModule { }
