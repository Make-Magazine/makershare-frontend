import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChallengeComponent } from './challenge/challenge.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { ShowcasesComponent } from './showcases/showcases.component';
import { SliderComponent } from './slider/slider.component';
import { SpotlightComponent } from './spotlight/spotlight.component';
import { SharedModule } from '../shared/shared.module';

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
