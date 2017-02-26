import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ExploreComponent } from "./components/explore/explore.component";
import { ProfileComponent } from "./components/account/profile/profile.component";
import { ChallengesComponent } from "./components/challenges/challenges/challenges.component";
import { LearnComponent } from "./components/learn/learn/learn.component";


const APP_ROUTES: Routes = [
   { path: '', component: HomeComponent },
   { path: 'user', component: ProfileComponent },
   { path: 'explore', component: ExploreComponent },
   { path: 'challenges', component: ChallengesComponent },
   { path: 'learn', component: LearnComponent },
   
    // { path: 'user/:id', component: UserComponent, children: USER_ROUTES },

    // { path: '**', redirectTo: '/user/1', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
