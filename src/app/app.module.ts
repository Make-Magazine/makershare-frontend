import { BrowserModule } from '@angular/platform-browser';
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

import { ExploreComponent } from './components/explore/explore.component';


// New Structure
import { ChallengeModule } from './components/challenge/challenge.module';
import { ShowcaseModule } from './components/showcase/showcases.module';
import { ProjectModule } from './components/project/project.module';
import { AccountModule } from './components/account/account.module';
import { LearnModule } from './components/learn/learn.module';
import { HomeModule } from './components/home/home.module';
import { MessagesModule } from './components/account/messages/messages.module'


//import { LearnComponent } from './components/learn/learn/learn.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ExploreComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    ProjectModule,
    AccountModule,
    ChallengeModule,
    ShowcaseModule,
    LearnModule,
    HomeModule,
    routing,
    MessagesModule,
  ],
  providers: [MainService, UserService, NodeService, CookieService, ViewService,FlagService,ProfileService,PmService],
  bootstrap: [AppComponent]
})
export class AppModule { }
