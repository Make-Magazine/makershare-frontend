import { Auth } from './auth0/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from "./app.routing";
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/general/header/header.component';
import { FooterComponent } from './components/general/footer/footer.component';
import { StatisticsService } from './d7services/statistics/statistics.service';

// New Structure
import { MessagesModule } from './components/account/messages/messages.module';
import { NotificationBarModule } from 'angular2-notification-bar/release';
import { SharedModule } from './components/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DndModule } from 'ng2-dnd';
import { ShareButtonsModule } from "ng2-sharebuttons";

// import custom auth0 service

import { FormsModule } from '@angular/forms';
import { SearchBoxComponent } from './components/general/header/search-box/search-box.component';
import { AccessDeniedComponent } from './auth0/access-denied/access-denied.component';
import { Four04Component } from './auth0/four04/four04.component';
// loader service
import { LoaderService } from './components/shared/loader/loader.service';
// Profile Picture Service
import { ProfilePictureService } from './components/shared/profile-picture/profile-picture.service';
//import { LoaderComponentService } from './components/shared/loader-component/loader-component.service';

// static pages
import { MakerMovementComponent } from './components/pages/maker-movement/maker-movement.component';
import { IntelMakeComponent } from './components/pages/intel-make/intel-make.component';
import { AboutBadgesComponent } from './components/pages/about-badges/about-badges.component';
import { TermsComponent } from './components/pages/terms/terms.component';
import { OtherSitesComponent } from './components/pages/other-sites/other-sites.component';
import { MakezineComponent } from './components/pages/makezine/makezine.component';
import { MakerFaireComponent } from './components/pages/maker-faire/maker-faire.component';
import { MakerIntelComponent } from './components/pages/maker-intel/maker-intel.component';
import { MakerCampComponent } from './components/pages/maker-camp/maker-camp.component';
import { IntelInnovationComponent } from './components/pages/intel-innovation/intel-innovation.component';
// GA
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import { MakerShedComponent } from './components/pages/maker-shed/maker-shed.component';
import { ResponsiveModule, ResponsiveConfig } from 'ng2-responsive';
import { MetaModule } from '@nglibs/meta';
import { GuidelinesComponent } from './components/pages/guidelines/guidelines.component';
import { WhyPortfolioComponent } from './components/pages/why-portfolio/why-portfolio.component';
import { ShowTellComponent } from './components/pages/show-tell/show-tell.component';

let config = {
  breakPoints: {
    xs: { max: 575 },
    sm: { min: 576, max: 767 },
    md: { min: 768, max: 991 },
    lg: { min: 992, max: 1199 },
    xl: { min: 1200 }
  },
  debounceTime: 100 // allow to debounce checking timer
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchBoxComponent,
    AccessDeniedComponent,
    Four04Component,
    MakerMovementComponent,
    IntelMakeComponent,
    AboutBadgesComponent,
    TermsComponent,
    OtherSitesComponent,
    MakezineComponent,
    MakerFaireComponent,
    MakerIntelComponent,
    MakerCampComponent,
    IntelInnovationComponent,
    MakerShedComponent,
    GuidelinesComponent,
    WhyPortfolioComponent,
    ShowTellComponent,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule,
    routing,
    MessagesModule,
    NotificationBarModule,
    SharedModule.forRoot(),
    DndModule.forRoot(),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    ResponsiveModule,
    MetaModule.forRoot(),
    ShareButtonsModule.forRoot(),
  ],
  entryComponents: [],
  providers: [
    Auth,
    ProfilePictureService,
    LoaderService,
    StatisticsService,
    {
      provide: ResponsiveConfig,
      useFactory: ResponsiveDefinition
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { };
export function ResponsiveDefinition() {
  return new ResponsiveConfig(config);
};
