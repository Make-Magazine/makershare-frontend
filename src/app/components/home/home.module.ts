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
import { ResponsiveModule, ResponsiveConfig } from 'ng2-responsive'
 
 let config = {
    breakPoints: {
        xs: {max: 575},
        sm: {min: 576, max: 767},
        md: {min: 768, max: 991},
        lg: {min: 992, max: 1199},
        xl: {min: 1200}
    },
    debounceTime: 100 // allow to debounce checking timer
  };

  export function ResponsiveDefinition(){ 
          return new ResponsiveConfig(config);
  };
// import {} from './'
@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NgbModule,
    ResponsiveModule
  ],
  declarations: [
    HomeComponent,
    SliderComponent,
    ChallengeComponent,
    ShowcasesComponent,
    SpotlightComponent,
    OnboardingComponent,    
  ],
  providers:[{
     provide: ResponsiveConfig, 
     useFactory: ResponsiveDefinition }]
})
export class HomeModule { }
export {HomeComponent};