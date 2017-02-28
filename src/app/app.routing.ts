import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ExploreComponent } from "./components/explore/explore.component";
import { ProfileComponent } from "./components/account/profile/profile.component";
import { LearnComponent } from "./components/learn/learn/learn.component";
import { ChallengesComponent,ChallengeDataComponent } from "./components/challenge/challenge.module";

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'user', component: ProfileComponent },
//    { path: 'explore', component: ExploreComponent },
    { path: 'challenges', component: ChallengesComponent },
    { path: 'challenge-data/:nid', component: ChallengeDataComponent },
    { path: 'learn', component: LearnComponent },
    { path: 'learn/:page', component: LearnComponent },
]

export const routing = RouterModule.forRoot(APP_ROUTES);
