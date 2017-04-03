import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from './auth0/auth-guard.service';
import { AccessDeniedComponent } from './auth0/access-denied/access-denied.component';
import { Four04Component } from './auth0/four04/four04.component';

const APP_ROUTES: Routes = [
    { path: '', loadChildren: 'app/components/home/home.module#HomeModule' },
    { path: 'project', loadChildren: 'app/components/project/project.module#ProjectModule' },
    { path: 'showcases', loadChildren: 'app/components/showcase/showcase.module#ShowcaseModule' },
    { path: 'explore', loadChildren: 'app/components/explore/explore.module#ExploreModule' },
    { path: 'learn', loadChildren: 'app/components/learn/learn.module#LearnModule' },
    { path: 'challenges', loadChildren: 'app/components/challenge/challenge.module#ChallengeModule' },
    { path: 'profile', loadChildren: 'app/components/account/profile/profile.module#ProfileModule', canActivate: [AuthGuardService] },
    { path: 'search', loadChildren: 'app/components/search/search.module#SearchModule' },
    { path: 'access-denied', component:  AccessDeniedComponent},
    { path: '**', component: Four04Component }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
