import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { routing } from "./app.routing";
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/general/header/header.component';
import { FooterComponent } from './components/general/footer/footer.component';
import { LoginComponent } from './components/account/login/login.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { MainService } from './d7services/main/main.service';
import { UserService } from './d7services/user/user.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
  ],
  providers: [MainService, UserService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
