import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from "./app.routing";
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/general/header/header.component';
import { FooterComponent } from './components/general/footer/footer.component';
import { LoginComponent } from './components/account/login/login.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { NodeService } from './d7services/node/node.service';
import { MainService } from './d7services/main/main.service';
import { UserService } from './d7services/user/user.service';
import { ViewService } from './d7services/view/view.service';
import { ExploreComponent } from './components/explore/explore.component';
import { ProjectsComponent } from './components/account/profile/projects/projects.component';
import { ChallengesComponent } from './components/challenges/challenges/challenges.component';
import { ProjectModule } from './components/project/project.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ProfileComponent,
    ExploreComponent,
    ProjectsComponent,
    ChallengesComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    ProjectModule,
    routing,
  ],
  providers: [MainService, UserService, NodeService, CookieService, ViewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
