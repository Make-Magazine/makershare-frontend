import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from './auth0/auth-guard.service';
import { AccessDeniedComponent } from './auth0/access-denied/access-denied.component';
import { Four04Component } from './auth0/four04/four04.component';
// static pages
import { MakerMovementComponent } from './components/pages/maker-movement/maker-movement.component';
import { IntelMakeComponent } from './components/pages/intel-make/intel-make.component';
import { AboutBadgesComponent } from './components/pages/about-badges/about-badges.component';
import { TermsComponent } from './components/pages/terms/terms.component';
import { OtherSitesComponent } from './components/pages/other-sites/other-sites.component';
import { MakezineComponent } from './components/pages/makezine/makezine.component';
import { MakerFaireComponent } from './components/pages/maker-faire/maker-faire.component';
import { MakerIntelComponent } from './components/pages/maker-intel/maker-intel.component';
import { MakerCampComponent } from './components/pages/maker-camp/maker-camp.component';
import { IntelInnovationComponent } from './components/pages/intel-innovation/intel-innovation.component';

const APP_ROUTES: Routes = [
    { path: '', loadChildren: 'app/components/home/home.module#HomeModule' },
    { path: 'project', loadChildren: 'app/components/project/project.module#ProjectModule' },
    { path: 'showcases', loadChildren: 'app/components/showcase/showcase.module#ShowcaseModule' },
    { path: 'explore', loadChildren: 'app/components/explore/explore.module#ExploreModule' },
    { path: 'workshops', loadChildren: 'app/components/learn/learn.module#LearnModule' },
    { path: 'missions', loadChildren: 'app/components/challenge/challenge.module#ChallengeModule' },
    { path: 'portfolio', loadChildren: 'app/components/account/profile/profile.module#ProfileModule' },
    { path: 'portfolio/:name', loadChildren: 'app/components/account/profile/profile.module#ProfileModule' },
    { path: 'account', loadChildren: 'app/components/account/account.module#AccountModule' },
    { path: 'search', loadChildren: 'app/components/search/search.module#SearchModule' },
    { path: 'access-denied', component:  AccessDeniedComponent},    
    // static pages
    { path: 'the-maker-movement', component: MakerMovementComponent},
    { path: 'intel-make', component: IntelMakeComponent},
    { path: 'about-badges', component: AboutBadgesComponent},
    { path: 'terms-of-use', component: TermsComponent},
    { path: 'other-sites', component: OtherSitesComponent},
    { path: 'makezine', component: MakezineComponent},
    { path: 'maker-faire', component: MakerFaireComponent},
    { path: 'makers-intel', component: MakerIntelComponent},
    { path: 'maker-camp', component: MakerCampComponent},
    { path: 'intel-innovation-programs', component: IntelInnovationComponent},
    // not found, should be the last routing
    { path: '**', component: Four04Component },

];

export const routing = RouterModule.forRoot(APP_ROUTES);
