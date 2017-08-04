import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChallengeComponent } from 'app/modules/home/challenge/challenge.component';
import { HomeRoutingModule } from 'app/modules/home/home-routing.module';
import { HomeComponent } from 'app/modules/home/home.component';
import { OnboardingComponent } from 'app/modules/home/onboarding/onboarding.component';
import { ShowcasesComponent } from 'app/modules/home/showcases/showcases.component';
import { SliderComponent } from 'app/modules/home/slider/slider.component';
import { SpotlightComponent } from 'app/modules/home/spotlight/spotlight.component';
import { SharedModule } from 'app/modules/shared/shared.module';

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
