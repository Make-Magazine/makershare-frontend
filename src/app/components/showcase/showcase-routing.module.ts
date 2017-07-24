import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowcasesComponent } from './showcases/showcases.component';
import { SinglShowcaseComponent } from './single-showcase/SingleShowcase.component';

const ShowcaseRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ShowcasesComponent },
      { path: ':path', component: SinglShowcaseComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ShowcaseRoutes)],
  exports: [RouterModule],
  declarations: [],
})
export class ShowcaseRoutingModule {}
