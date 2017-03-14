import { RouterModule, Routes } from "@angular/router";


const APP_ROUTES: Routes = [
    { path: '', loadChildren: 'app/components/home/home.module#HomeModule' },
    { path: 'project', loadChildren: 'app/components/project/project.module#ProjectModule' },
    { path: 'showcases', loadChildren: 'app/components/showcase/showcase.module#ShowcaseModule' },
    { path: 'explore', loadChildren: 'app/components/explore/explore.module#ExploreModule' },
    { path: 'learn', loadChildren: 'app/components/learn/learn.module#LearnModule' },
    { path: 'challenges', loadChildren: 'app/components/challenge/challenge.module#ChallengeModule' },
    { path: 'profile', loadChildren: 'app/components/account/profile/profile.module#ProfileModule' },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
