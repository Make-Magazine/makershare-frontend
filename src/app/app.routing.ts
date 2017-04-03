import { RouterModule, Routes } from "@angular/router";
import {CollectionComponent}from "../app/components/account/collection/collection.component"


const APP_ROUTES: Routes = [
    { path: '', loadChildren: 'app/components/home/home.module#HomeModule' },
    { path: 'project', loadChildren: 'app/components/project/project.module#ProjectModule' },
    { path: 'showcases', loadChildren: 'app/components/showcase/showcase.module#ShowcaseModule' },
    { path: 'explore', loadChildren: 'app/components/explore/explore.module#ExploreModule' },
    { path: 'learn', loadChildren: 'app/components/learn/learn.module#LearnModule' },
    { path: 'challenges', loadChildren: 'app/components/challenge/challenge.module#ChallengeModule' },
    { path: 'profile', loadChildren: 'app/components/account/profile/profile.module#ProfileModule' },
    { path: 'search', loadChildren: 'app/components/search/search.module#SearchModule' },
    { path: 'collection', loadChildren: 'app/components/account/collection/collection.module#CollectionModule' },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
