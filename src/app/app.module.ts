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
import { NotificationBarModule, NotificationBarService } from 'angular2-notification-bar';
import { SharedModule } from './components/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DndModule } from 'ng2-dnd';
// import custom auth0 service
import { Auth } from './auth0/auth.service';
import { FormsModule } from '@angular/forms';
import { SearchBoxComponent } from './components/general/header/search-box/search-box.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchBoxComponent,
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
    NotificationBarService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
