import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'app/modules/home/home.component';

const HomeRouts: Routes = [
  {
    path: '',
    children: [{ path: '', component: HomeComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(HomeRouts)],
  exports: [RouterModule],
  declarations: [],
})
export class HomeRoutingModule {}
