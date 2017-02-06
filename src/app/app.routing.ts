import { RouterModule, Routes } from "@angular/router";

const APP_ROUTES: Routes = [
    // { path: 'user/:id', component: UserComponent },
    // { path: 'user/:id', component: UserComponent, children: USER_ROUTES },
    // { path: '', component: HomeComponent },
    // { path: '**', redirectTo: '/user/1', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
