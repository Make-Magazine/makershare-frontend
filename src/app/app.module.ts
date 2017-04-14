import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from "./app.routing";
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/general/header/header.component';
import { FooterComponent } from './components/general/footer/footer.component';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { NodeService } from './d7services/node/node.service';
import { MainService } from './d7services/main/main.service';
import { UserService } from './d7services/user/user.service';
import { ViewService } from './d7services/view/view.service';
import { FlagService } from './d7services/flag/flag.service';
import { ProfileService } from './d7services/profile/profile.service';
import { PmService } from './d7services/pm/pm.service';
import { FileService } from './d7services/file/file.service';
import { TaxonomyService } from './d7services/taxonomy/taxonomy.service';
// New Structure
import { MessagesModule } from './components/account/messages/messages.module';
import { NotificationBarModule, NotificationBarService } from 'angular2-notification-bar/release';
import { SharedModule } from './components/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DndModule } from 'ng2-dnd';
// import custom auth0 service
import { Auth } from './auth0/auth.service';
import { AuthGuardService } from './auth0/auth-guard.service';
import { FormsModule } from '@angular/forms';
import { SearchBoxComponent } from './components/general/header/search-box/search-box.component';
import { AccessDeniedComponent } from './auth0/access-denied/access-denied.component';
import { Four04Component } from './auth0/four04/four04.component';
// loader service
import { LoaderService } from './components/shared/loader/loader.service';
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
    SharedModule,
    DndModule.forRoot(),
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]),
  ],
  entryComponents: [],
  providers: [
    TaxonomyService,
    FileService,
    MainService,
    UserService,
    NodeService,
    CookieService,
    ViewService,
    FlagService,
    ProfileService,
    PmService,
    Auth,
    AuthGuardService,
    NotificationBarService,
    LoaderService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
