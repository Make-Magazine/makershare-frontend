import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './Modules/auth0/access-denied/access-denied.component';
import { Four04Component } from './Modules/auth0/four04/four04.component';
import { AccessRestrictedComponent } from './Modules/shared/access-restricted/access-restricted.component';
// static pages
import { MakerMovementComponent } from './Modules/pages/maker-movement/maker-movement.component';
import { IntelMakeComponent } from './Modules/pages/intel-make/intel-make.component';
import { AboutBadgesComponent } from './Modules/pages/about-badges/about-badges.component';
import { TermsComponent } from './Modules/pages/terms/terms.component';
import { OtherSitesComponent } from './Modules/pages/other-sites/other-sites.component';
import { MakezineComponent } from './Modules/pages/makezine/makezine.component';
import { MakerFaireComponent } from './Modules/pages/maker-faire/maker-faire.component';
import { MakerIntelComponent } from './Modules/pages/maker-intel/maker-intel.component';
import { MakerCampComponent } from './Modules/pages/maker-camp/maker-camp.component';
import { MakerShedComponent } from './Modules/pages/maker-shed/maker-shed.component';
import { IntelInnovationComponent } from './Modules/pages/intel-innovation/intel-innovation.component';
import { GuidelinesComponent } from './Modules/pages/guidelines/guidelines.component';
import { WhyPortfolioComponent } from './Modules/pages/why-portfolio/why-portfolio.component';
import { AboutUsComponent } from './Modules/pages/about-us/about-us.component';
import { ShowTellComponent } from './Modules/pages/show-tell/show-tell.component';
import { ClaimProfileComponent } from './Modules/pages/claim-profile/claim-profile.component';

const APP_ROUTES: Routes = [
    { path: '', loadChildren: './Modules/home/home.module#HomeModule' },
    { path: 'showcases', loadChildren: './Modules/showcase/showcase.module#ShowcaseModule' },
    { path: 'projects', loadChildren: './Modules/projects/projects.module#ProjectsModule' },
    { path: 'makers', loadChildren: './Modules/makers/makers.module#MakersModule' },
    { path: 'organizations', loadChildren: './Modules/companies/companies.module#CompaniesModule' },
    { path: 'orgs', loadChildren: './Modules/orgs/orgs.module#OrgsModule' },
    { path: 'missions', loadChildren: './Modules/challenge/challenge.module#ChallengeModule' },
    { path: 'portfolio', loadChildren: './Modules/account/profile/profile.module#ProfileModule' },
    { path: 'account', loadChildren: './Modules/account/account.module#AccountModule' },
    { path: 'search', loadChildren: './Modules/search/search.module#SearchModule' },
    { path: 'learning', loadChildren: './Modules/learn/learn.module#LearnModule' },
    { path: 'access-denied', component: AccessDeniedComponent },
    { path: 'the-maker-movement', component: MakerMovementComponent },
    { path: 'make-intel', component: IntelMakeComponent },
    { path: 'guidelines', component: GuidelinesComponent },
    { path: 'why-portfolio', component: WhyPortfolioComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'badges', component: AboutBadgesComponent },
    { path: 'show-and-tell', component: ShowTellComponent },
    { path: 'terms-of-use', component: TermsComponent },
    { path: 'other-sites', component: OtherSitesComponent },
    { path: 'makezine', component: MakezineComponent },
    { path: 'maker-faire', component: MakerFaireComponent },
    { path: 'makers-intel', component: MakerIntelComponent },
    { path: 'maker-camp', component: MakerCampComponent },
    { path: 'maker-shed', component: MakerShedComponent },
    { path: 'intel-innovation-programs', component: IntelInnovationComponent },
    { path: 'claim-profile', component: ClaimProfileComponent },
    { path: '404', component: Four04Component },
    { path: 'access-restricted', component: AccessRestrictedComponent },
    { path: '**', redirectTo: '/404' },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
