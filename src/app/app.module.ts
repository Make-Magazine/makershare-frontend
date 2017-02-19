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
import { CreateProjectComponent } from './components/project/create-project/create-project.component';

//npm tag input
import { TagInputModule } from 'ng2-tag-input';


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
    CreateProjectComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    TagInputModule,
  ],
  providers: [MainService, UserService, NodeService, CookieService, ViewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
