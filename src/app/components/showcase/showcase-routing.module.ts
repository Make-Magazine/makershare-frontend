import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShowcasesCollectionComponent } from './showcase-collection/showcasesCollection.component'
import { SinglShowcaseComponent } from './single-showcase/SingleShowcase.component'
import { ShowcaseProjectModule } from './showcase-project/showcase-project.module'
import { ShowcaseProjectComponent } from './showcase-project/showcase-project.component'
const ShowcaseRoutes: Routes = [
  {
    path: '', 
    children: [
      { path: '', component:ShowcasesCollectionComponent },
      { path: ':nid', component:SinglShowcaseComponent },
      // { path: '760/project2/:nid', loadChildren:'app/components/showcase/showcase-project/showcase-project.module#ShowcaseProjectModule' }
      { path: 'project2/:nid/:pnid', component:ShowcaseProjectComponent }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ShowcaseRoutes),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class ShowcaseRoutingModule { }
