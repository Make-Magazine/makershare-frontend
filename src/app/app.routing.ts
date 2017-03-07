import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ExploreComponent } from "./components/explore/explore.component";
import { ProfileComponent } from "./components/account/profile/view/profile.component";
import { LearnComponent } from "./components/learn/learn/learn.component";
import { ChallengesComponent,ChallengeDataComponent } from "./components/challenge/challenge.module";
import { IndividualWorkshopComponent } from "./components/learn/individual-workshop/individual-workshop.component";
import { ChallengeSummaryComponent } from "./components/challenge/challenge.module";
import { ShowcasesCollectionComponent, SinglShowcaseComponent } from "./components/showcase/showcases.module";
import {ChallengeProjectComponent} from "./components/challenge/enter-challenge-project/challenge-project.component";
import {CreateProjectComponent} from "./components/project/create-project/create-project/create-project.component";
const APP_ROUTES: Routes = [
   { path: '', component: HomeComponent },
   { path: 'user', component: ProfileComponent },
   { path:'showcases', component: ShowcasesCollectionComponent},
   { path:'single-showcase/:nid', component: SinglShowcaseComponent},
   { path: 'explore', component: ExploreComponent },
   { path: 'challenges', component: ChallengesComponent },
   { path: 'challenge-data/:nid', component: ChallengeDataComponent },
   { path: 'learn', component: LearnComponent },
   { path: 'learn', component: LearnComponent },
   { path: 'learn/:page', component: LearnComponent },
   { path: 'challenge-summary', component: ChallengeSummaryComponent },
   { path: 'workshop/:nid', component: IndividualWorkshopComponent },
   {path:'enter-challenge/:nid' , component:ChallengeProjectComponent},
   {path: 'createproject/:nid' , component:CreateProjectComponent},
    // { path: 'user/:id', component: UserComponent, children: USER_ROUTES },

    // { path: '**', redirectTo: '/user/1', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
