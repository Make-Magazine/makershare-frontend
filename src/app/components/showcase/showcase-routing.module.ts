import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowcasesComponent } from './showcases/showcases.component';
import { SingleShowcaseComponent } from './single-showcase/single-showcase.component';
import { ShowcaseProjectComponent } from './showcase-project/showcase-project.component';

const ShowcaseRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ShowcasesComponent },
      { path: ':path', component: SingleShowcaseComponent },
      {
        path: 'project2/:nid/:sort1/:sort2/:pnid',
        component: ShowcaseProjectComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ShowcaseRoutes)],
  exports: [RouterModule],
  declarations: [],
})
export class ShowcaseRoutingModule {}
