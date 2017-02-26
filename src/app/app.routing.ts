import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ExploreComponent } from "./components/explore/explore.component";
import { ProfileComponent } from "./components/account/profile/profile.component";
<<<<<<< HEAD
import { LearnComponent } from "./components/learn/learn/learn.component";
import { ChallengesComponent } from "./components/challenge/challenge.module";

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'user', component: ProfileComponent },
//    { path: 'explore', component: ExploreComponent },
    { path: 'challenges', component: ChallengesComponent },
    { path: 'learn', component: LearnComponent },
    { path: 'challenges/:page', component: ChallengesComponent },
    { path: 'learn/:page', component: LearnComponent },
    
=======


import { LearnComponent } from "./components/learn/learn/learn.component";

import { ChallengesComponent } from "./components/challenge/challenge.module";


const APP_ROUTES: Routes = [
   { path: '', component: HomeComponent },
   { path: 'user', component: ProfileComponent },
   { path: 'explore', component: ExploreComponent },
   { path: 'challenges', component: ChallengesComponent },

   { path: 'learn', component: LearnComponent },

    { path: 'challenges/:page', component: ChallengesComponent },

>>>>>>> 085884e74716677df3002a601be94ef9b6931cf3
    // { path: 'user/:id', component: UserComponent, children: USER_ROUTES },

    // { path: '**', redirectTo: '/user/1', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
