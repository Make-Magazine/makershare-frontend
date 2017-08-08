import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowcasesComponent } from '../showcase/showcases/showcases.component';
import { SingleShowcaseComponent } from '../showcase/single-showcase/single-showcase.component';

const ShowcaseRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ShowcasesComponent },
      { path: ':path', component: SingleShowcaseComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ShowcaseRoutes)],
  exports: [RouterModule],
  declarations: [],
})
export class ShowcaseRoutingModule {}
