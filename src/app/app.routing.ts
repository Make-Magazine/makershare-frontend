import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ExploreComponent } from "./components/explore/explore.component";
import { ProfileComponent } from "./components/account/profile/profile.component";
import { LearnComponent } from "./components/learn/learn/learn.component";
import { IndividualWorkshopComponent } from "./components/learn/individual-workshop/individual-workshop.component";


import { ChallengesComponent } from "./components/challenge/challenge.module";
<<<<<<< HEAD
import { ChallengeSummaryComponent } from "./components/challenge/challenge.module";

const APP_ROUTES: Routes = [
   { path: '', component: HomeComponent },
   { path: 'user', component: ProfileComponent },
   { path: 'explore', component: ExploreComponent },
   { path: 'challenges', component: ChallengesComponent },

   { path: 'learn', component: LearnComponent },

    { path: 'challenge-summary', component: ChallengeSummaryComponent },

    // { path: 'user/:id', component: UserComponent, children: USER_ROUTES },

    // { path: '**', redirectTo: '/user/1', pathMatch: 'full' }
];
=======


const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'user', component: ProfileComponent },
//    { path: 'explore', component: ExploreComponent },
    { path: 'challenges', component: ChallengesComponent },
    { path: 'learn', component: LearnComponent },

    { path: 'challenges/:page', component: ChallengesComponent },

    { path: 'workshop/:nid', component: IndividualWorkshopComponent },

]
>>>>>>> dd56ea78bacd51c06c00d6bba452b3862dd0460f

export const routing = RouterModule.forRoot(APP_ROUTES);
