import {NgModule, NgZone} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavigationEnd, NavigationError, RouterModule, Router} from '@angular/router';

import {Observable} from 'rxjs';

import {prebootClient} from 'preboot/__build/src/browser/preboot_browser';

import {AppComponent} from './app.component';

//
import { routing } from "./app.routing";
import { HeaderComponent } from './components/general/header/header.component';
import { FooterComponent } from './components/general/footer/footer.component';

// New Structure
import { MessagesModule } from './components/account/messages/messages.module';
import { NotificationBarModule } from 'ngx-notification-bar/release';
import { SharedModule } from './components/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DndModule } from 'ng2-dnd';
import { ShareButtonsModule } from "ngx-sharebuttons";
import { SearchBoxComponent } from './components/general/header/search-box/search-box.component';
import { AccessDeniedComponent } from './auth0/access-denied/access-denied.component';
import { Four04Component } from './auth0/four04/four04.component';
import { HttpModule } from '@angular/http';

// static pages
import { MakerMovementComponent } from './components/pages/maker-movement/maker-movement.component';
import { IntelMakeComponent } from './components/pages/intel-make/intel-make.component';
import { AboutBadgesComponent } from './components/pages/about-badges/about-badges.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { TermsComponent } from './components/pages/terms/terms.component';
import { OtherSitesComponent } from './components/pages/other-sites/other-sites.component';
import { MakezineComponent } from './components/pages/makezine/makezine.component';
import { MakerFaireComponent } from './components/pages/maker-faire/maker-faire.component';
import { MakerIntelComponent } from './components/pages/maker-intel/maker-intel.component';
import { MakerCampComponent } from './components/pages/maker-camp/maker-camp.component';
import { IntelInnovationComponent } from './components/pages/intel-innovation/intel-innovation.component';
import { ClaimProfileComponent } from './components/pages/claim-profile/claim-profile.component';

// GA
// import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import { MakerShedComponent } from './components/pages/maker-shed/maker-shed.component';
import { GuidelinesComponent } from './components/pages/guidelines/guidelines.component';
import { WhyPortfolioComponent } from './components/pages/why-portfolio/why-portfolio.component';
import { ShowTellComponent } from './components/pages/show-tell/show-tell.component';
import { CookieModule } from 'ngx-cookie';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CookieModule.forRoot(),
    SharedModule.forRoot(),
    FormsModule,
    NgbModule.forRoot(),
    RouterModule,
    routing,
    MessagesModule,
    NotificationBarModule,
    DndModule.forRoot(),
    ShareButtonsModule.forRoot(),
    HttpModule,
  ],
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
    AboutUsComponent,
    ShowTellComponent,
    ClaimProfileComponent
  ]
})
export class AppModule {
  constructor(router: Router, zone: NgZone) {
    if (typeof prebootstrap === 'undefined') {
      return;
    }

    const finished = Observable.combineLatest(router.events, zone.onMicrotaskEmpty);

    const subscription = finished.subscribe(([event, stable]) => {
      if (stable === false) {
        return;
      }

      switch (true) {
        case event instanceof NavigationError:
        case event instanceof NavigationEnd:
          setImmediate(() => prebootClient().complete());

          subscription.unsubscribe();
          break;
        default:
          break;
      }
    });
  }
}

declare const prebootstrap;
