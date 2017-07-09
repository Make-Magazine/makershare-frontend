// Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { routing } from "./app.routing";

// Custom modules
import { SharedModule } from './components/shared/shared.module';
import { CookieModule } from 'ngx-cookie';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationBarModule } from 'angular2-notification-bar/release';
import { DndModule } from 'ng2-dnd';
import { ShareButtonsModule } from "ngx-sharebuttons";

// components
import { AppComponent } from './app.component';
import { SearchBoxComponent } from './components/general/header/search-box/search-box.component';
import { AccessDeniedComponent } from './auth0/access-denied/access-denied.component';
import { Four04Component } from './auth0/four04/four04.component';
import { HeaderComponent } from './components/general/header/header.component';
import { FooterComponent } from './components/general/footer/footer.component';

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
import { GuidelinesComponent } from './components/pages/guidelines/guidelines.component';
import { WhyPortfolioComponent } from './components/pages/why-portfolio/why-portfolio.component';
import { ShowTellComponent } from './components/pages/show-tell/show-tell.component';
import { MakerShedComponent } from './components/pages/maker-shed/maker-shed.component';

@NgModule({
  imports: [
    //angular modules
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
    routing,

    //custom modules
    SharedModule.forRoot(),
    CookieModule.forRoot(),
    ReactiveFormsModule,
    NgbModule.forRoot(),
    NotificationBarModule,
    DndModule.forRoot(),
    ShareButtonsModule.forRoot(),
  ],
  declarations: [
    //components
    AppComponent,
    SearchBoxComponent,
    AccessDeniedComponent,
    Four04Component,
    HeaderComponent,
    FooterComponent,

    //static pages
    MakerMovementComponent,
    IntelMakeComponent,
    AboutBadgesComponent,
    TermsComponent,
    AboutUsComponent,
    MakezineComponent,
    MakerFaireComponent,
    MakerIntelComponent,
    IntelInnovationComponent,
    ClaimProfileComponent,
    OtherSitesComponent,
    MakerCampComponent,
    GuidelinesComponent,
    WhyPortfolioComponent,
    ShowTellComponent,
    MakerShedComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}