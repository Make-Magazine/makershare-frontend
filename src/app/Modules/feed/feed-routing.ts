import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed.component';
import { AuthGuardService } from '../auth0/auth-guard.service';


const feedRouts: Routes = [
    { path: '', component:FeedComponent ,  canActivate: [AuthGuardService]}
];

@NgModule({
    imports: [
        RouterModule.forChild(feedRouts),
    ],
    exports: [
        RouterModule
    ],
})


export class FeedRoutingModule { }
