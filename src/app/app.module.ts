import { NgModule, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationEnd, NavigationError, Router, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'app/modules/shared/shared.module';
import { DndModule } from 'ng2-dnd';
import { CookieModule } from 'ngx-cookie';
import { NotificationBarModule } from 'ngx-notification-bar/release';
import { ShareButtonsModule } from 'ngx-sharebuttons';

import { prebootClient } from 'preboot/__build/src/browser/preboot_browser';

import { Observable } from 'rxjs/Observable';

import { AppComponent } from 'app/app.component';
//
import { routing } from 'app/app.routing';
// New Structure
import { MessagesModule } from 'app/modules/account/messages/messages.module';
import { AccessDeniedComponent } from 'app/modules/auth0/access-denied/access-denied.component';
import { Four04Component } from 'app/modules/auth0/four04/four04.component';
import { FooterComponent } from 'app/modules/general/footer/footer.component';
import { HeaderComponent } from 'app/modules/general/header/header.component';
import { SearchBoxComponent } from 'app/modules/general/header/search-box/search-box.component';
import { AboutBadgesComponent } from 'app/modules/pages/about-badges/about-badges.component';
import { AboutUsComponent } from 'app/modules/pages/about-us/about-us.component';
import { ClaimProfileComponent } from 'app/modules/pages/claim-profile/claim-profile.component';
import { GuidelinesComponent } from 'app/modules/pages/guidelines/guidelines.component';
import { IntelInnovationComponent } from 'app/modules/pages/intel-innovation/intel-innovation.component';
import { IntelMakeComponent } from 'app/modules/pages/intel-make/intel-make.component';
import { MakerCampComponent } from 'app/modules/pages/maker-camp/maker-camp.component';
import { MakerFaireComponent } from 'app/modules/pages/maker-faire/maker-faire.component';
import { MakerIntelComponent } from 'app/modules/pages/maker-intel/maker-intel.component';
// static pages
import { MakerMovementComponent } from 'app/modules/pages/maker-movement/maker-movement.component';
// GA
// import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import { MakerShedComponent } from 'app/modules/pages/maker-shed/maker-shed.component';
import { MakezineComponent } from 'app/modules/pages/makezine/makezine.component';
import { OtherSitesComponent } from 'app/modules/pages/other-sites/other-sites.component';
import { ShowTellComponent } from 'app/modules/pages/show-tell/show-tell.component';
import { TermsComponent } from 'app/modules/pages/terms/terms.component';
import { WhyPortfolioComponent } from 'app/modules/pages/why-portfolio/why-portfolio.component';

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
    ClaimProfileComponent,
  ],
})
export class AppModule {
  constructor(router: Router, zone: NgZone) {
    if (typeof prebootstrap === 'undefined') {
      return;
    }

    const finished = Observable.combineLatest(
      router.events,
      zone.onMicrotaskEmpty,
    );

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
