import { NgModule, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationEnd, NavigationError, Router, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DndModule } from 'ng2-dnd';
import { CookieModule } from 'ngx-cookie';
import { NotificationBarModule } from 'ngx-notification-bar/release';
import { ShareButtonsModule } from 'ngx-sharebuttons';
import { prebootClient } from 'preboot/__build/src/browser/preboot_browser';
import { Observable } from 'rxjs/Observable';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
// New Structure
import { MessagesModule } from './modules/account/messages/messages.module';
import { AccessDeniedComponent } from './modules/auth0/access-denied/access-denied.component';
import { Four04Component } from './modules/auth0/four04/four04.component';
import { FooterComponent } from './modules/general/footer/footer.component';
import { HeaderComponent } from './modules/general/header/header.component';
import { SearchBoxComponent } from './modules/general/header/search-box/search-box.component';
import { AboutBadgesComponent } from './modules/pages/about-badges/about-badges.component';
import { AboutUsComponent } from './modules/pages/about-us/about-us.component';
import { ClaimProfileComponent } from './modules/pages/claim-profile/claim-profile.component';
import { GuidelinesComponent } from './modules/pages/guidelines/guidelines.component';
import { IntelInnovationComponent } from './modules/pages/intel-innovation/intel-innovation.component';
import { IntelMakeComponent } from './modules/pages/intel-make/intel-make.component';
import { MakerCampComponent } from './modules/pages/maker-camp/maker-camp.component';
import { MakerFaireComponent } from './modules/pages/maker-faire/maker-faire.component';
import { MakerIntelComponent } from './modules/pages/maker-intel/maker-intel.component';
// static pages
import { MakerMovementComponent } from './modules/pages/maker-movement/maker-movement.component';
import { MakerShedComponent } from './modules/pages/maker-shed/maker-shed.component';
import { MakezineComponent } from './modules/pages/makezine/makezine.component';
import { OtherSitesComponent } from './modules/pages/other-sites/other-sites.component';
import { ShowTellComponent } from './modules/pages/show-tell/show-tell.component';
import { TermsComponent } from './modules/pages/terms/terms.component';
import { WhyPortfolioComponent } from './modules/pages/why-portfolio/why-portfolio.component';
import { SharedModule } from './modules/shared/shared.module';

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
