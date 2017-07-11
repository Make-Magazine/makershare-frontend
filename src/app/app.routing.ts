import { RouterModule, Routes } from "@angular/router";

//components
import { AppComponent } from './app.component';
import { AccessDeniedComponent } from './auth0/access-denied/access-denied.component';
import { Four04Component } from './auth0/four04/four04.component';
import { AccessRestrictedComponent } from './components/shared/access-restricted/access-restricted.component';
import { ClaimProfileComponent } from './components/pages/claim-profile/claim-profile.component';

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
import { MakerShedComponent } from './components/pages/maker-shed/maker-shed.component';
import { IntelInnovationComponent } from './components/pages/intel-innovation/intel-innovation.component';
import { GuidelinesComponent } from './components/pages/guidelines/guidelines.component';
import { WhyPortfolioComponent } from './components/pages/why-portfolio/why-portfolio.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { ShowTellComponent } from './components/pages/show-tell/show-tell.component';

const APP_ROUTES: Routes = [
    // {path:'',component:AppComponent},
    //lazy modules
    { path: '', loadChildren: './components/home/home.module#HomeModule' },
    // { path: 'showcases', loadChildren: 'app/components/showcase/showcase.module#ShowcaseModule' },
    // { path: 'projects', loadChildren: './components/projects/projects.module#ProjectsModule' },
    // { path: 'makers', loadChildren: 'app/components/makers/makers.module#MakersModule' },
    // { path: 'missions', loadChildren: './components/challenge/challenge.module#ChallengeModule' },
    // { path: 'portfolio', loadChildren: './components/account/profile/profile.module#ProfileModule' },
    // { path: 'account', loadChildren: './components/account/account.module#AccountModule' },
    // { path: 'search', loadChildren: './components/search/search.module#SearchModule' },
    // { path: 'learning', loadChildren: './components/learn/learn.module#LearnModule' },

    //pages
    // { path: 'why-portfolio', component: WhyPortfolioComponent },
    // { path: 'about-us', component: AboutUsComponent },
    // { path: 'access-denied', component: AccessDeniedComponent },
    // { path: 'the-maker-movement', component: MakerMovementComponent },
    // { path: 'make-intel', component: IntelMakeComponent },
    // { path: 'guidelines', component: GuidelinesComponent },
    // { path: 'badges', component: AboutBadgesComponent },
    // { path: 'show-and-tell', component: ShowTellComponent },
    // { path: 'terms-of-use', component: TermsComponent },
    // { path: 'other-sites', component: OtherSitesComponent },
    // { path: 'makezine', component: MakezineComponent },
    // { path: 'maker-faire', component: MakerFaireComponent },
    // { path: 'makers-intel', component: MakerIntelComponent },
    // { path: 'maker-camp', component: MakerCampComponent },
    // { path: 'maker-shed', component: MakerShedComponent },
    // { path: 'intel-innovation-programs', component: IntelInnovationComponent },
    // { path: 'claim-profile', component: ClaimProfileComponent },
    // { path: '404', component: Four04Component },
    // { path: 'access-restricted', component: AccessRestrictedComponent },
    // { path: '**', redirectTo: '/404' },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
