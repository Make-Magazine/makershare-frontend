import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SliderComponent } from './slider/slider.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { ShowcasesComponent } from './showcases/showcases.component';
import { SpotlightComponent } from './spotlight/spotlight.component';

@NgModule({
  imports: [
    CommonModule
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