import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SliderComponent } from './slider/slider.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { ShowcasesComponent } from './showcases/showcases.component';
import { SpotlightComponent } from './spotlight/spotlight.component';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
<<<<<<< HEAD
=======
    HomeRoutingModule
>>>>>>> 5cd5b8bd077094e4edfa8e6facf09e8fdbf277bc
  ],
  declarations: [
    HomeComponent,
    SliderComponent,
    ChallengeComponent,
    ShowcasesComponent,
    SpotlightComponent,
    
  ]
})
export class HomeModule { }
export {HomeComponent};