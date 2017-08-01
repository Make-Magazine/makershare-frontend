import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SliderComponent } from './slider/slider.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { ShowcasesComponent } from './showcases/showcases.component';
import { SpotlightComponent } from './spotlight/spotlight.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OnboardingComponent } from './onboarding/onboarding.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule.forChild(),
    NgbModule,
  ],
  declarations: [
    HomeComponent,
    SliderComponent,
    ChallengeComponent,
    ShowcasesComponent,
    SpotlightComponent,
    OnboardingComponent,
  ],
})
export class HomeModule {}