import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ProfileComponent } from "./components/account/profile/view/profile.component";
// import { ChallengesComponent, ChallengeDataComponent } from "./components/challenge/challenge.module";
import { AllProfileComponent } from './components/account/profile/edit/all-profile/all-profile.component';
import { ChallengeProjectComponent } from "./components/challenge/enter-challenge-project/challenge-project.component"
// import { IndividualWorkshopComponent } from "./components/learn/individual-workshop/individual-workshop.component";
// import { ShowcasesCollectionComponent, SinglShowcaseComponent } from "./components/showcase/showcases.module";
// import { LearnComponent } from "./components/learn/learn/learn.component";
// import { ExploreModule } from "./components/explore/explore.module";


const APP_ROUTES: Routes = [
    { path: 'project', loadChildren: 'app/components/project/project.module#ProjectModule' },
    { path: '', component: HomeComponent },
    { path: 'user', component: ProfileComponent },
    { path: 'showcases', loadChildren: 'app/components/showcase/showcase.module#ShowcaseModule' },
    { path: 'explore', loadChildren:'app/components/explore/explore.module#ExploreModule' },
    { path: 'learn',  loadChildren:'app/components/learn/learn.module#LearnModule' },    
    { path: 'challenges', loadChildren:'app/components/challenge/challenge.module#ChallengeModule' },
    // { path: 'challenge-data/:nid', component: ChallengeDataComponent },
    { path: 'profile', component: AllProfileComponent },
    // { path: 'enter-challenge/:nid', component: ChallengeProjectComponent },
    // { path: 'learn/:page', component: LearnComponent },
    // { path: 'workshop/:nid', component: IndividualWorkshopComponent },
    // { path: 'single-showcase/:nid', component: SinglShowcaseComponent },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
