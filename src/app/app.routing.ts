import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ExploreComponent } from "./components/explore/explore.component";
import { ProfileComponent } from "./components/account/profile/view/profile.component";
import { LearnComponent } from "./components/learn/learn/learn.component";
import { ChallengesComponent, ChallengeDataComponent } from "./components/challenge/challenge.module";
import { IndividualWorkshopComponent } from "./components/learn/individual-workshop/individual-workshop.component";
import { ChallengeSummaryComponent } from "./components/challenge/challenge.module";
import { ShowcasesCollectionComponent, SinglShowcaseComponent } from "./components/showcase/showcases.module";
import { AllProfileComponent } from './components/account/profile/edit/all-profile/all-profile.component';

import { ChallengeProjectComponent } from "./components/challenge/enter-challenge-project/challenge-project.component"


const APP_ROUTES: Routes = [
    { path: 'project', loadChildren:'app/components/project/project.module#ProjectModule' },
    { path: '', component: HomeComponent },
    { path: 'user', component: ProfileComponent },
    { path: 'showcases', component: ShowcasesCollectionComponent },
    { path: 'single-showcase/:nid', component: SinglShowcaseComponent },
    { path: 'explore', component: ExploreComponent },
    { path: 'challenges', component: ChallengesComponent },
    { path: 'challenge-data/:nid', component: ChallengeDataComponent },
    { path: 'learn', component: LearnComponent },
    { path: 'learn', component: LearnComponent },
    { path: 'learn/:page', component: LearnComponent },
    { path: 'challenge-summary', component: ChallengeSummaryComponent },
    { path: 'workshop/:nid', component: IndividualWorkshopComponent },

    { path: 'profile', component: AllProfileComponent },
   { path: 'workshop/:nid', component: IndividualWorkshopComponent },
   {path:'enter-challenge/:nid' , component:ChallengeProjectComponent},
];

export const routing = RouterModule.forRoot(APP_ROUTES);
