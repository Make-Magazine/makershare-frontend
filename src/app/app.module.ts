import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from "./app.routing";
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/general/header/header.component';
import { FooterComponent } from './components/general/footer/footer.component';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { NodeService } from './d7services/node/node.service';
import { MainService } from './d7services/main/main.service';
import { UserService } from './d7services/user/user.service';
import { ViewService } from './d7services/view/view.service';
import { ExploreComponent } from './components/explore/explore.component';


// New Structure
import { ChallengeModule } from './components/challenge/challenge.module';
import { ProjectModule } from './components/project/project.module';
import { AccountModule } from './components/account/account.module';
import { LearnModule } from './components/learn/learn.module';



//import { LearnComponent } from './components/learn/learn/learn.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ExploreComponent,
<<<<<<< HEAD
    // LearnComponent,
=======

    
    LearnComponent,

    

>>>>>>> 085884e74716677df3002a601be94ef9b6931cf3
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    ProjectModule,
    AccountModule,
    ChallengeModule,
    LearnModule,
    
    routing,
  ],
  providers: [MainService, UserService, NodeService, CookieService, ViewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
