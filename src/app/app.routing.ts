import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './modules/auth0/access-denied/access-denied.component';
import { Four04Component } from './modules/auth0/four04/four04.component';
import { AboutBadgesComponent } from './modules/pages/about-badges/about-badges.component';
import { AboutUsComponent } from './modules/pages/about-us/about-us.component';
import { ClaimProfileComponent } from './modules/pages/claim-profile/claim-profile.component';
import { GuidelinesComponent } from './modules/pages/guidelines/guidelines.component';
import { IntelInnovationComponent } from './modules/pages/intel-innovation/intel-innovation.component';
import { IntelMakeComponent } from './modules/pages/intel-make/intel-make.component';
import { MakerCampComponent } from './modules/pages/maker-camp/maker-camp.component';
import { MakerFaireComponent } from './modules/pages/maker-faire/maker-faire.component';
import { MakerIntelComponent } from './modules/pages/maker-intel/maker-intel.component';
// static pages
import { MakerMovementComponent } from './modules/pages/maker-movement/maker-movement.component';
import { MakerShedComponent } from './modules/pages/maker-shed/maker-shed.component';
import { MakezineComponent } from './modules/pages/makezine/makezine.component';
import { OtherSitesComponent } from './modules/pages/other-sites/other-sites.component';
import { ShowTellComponent } from './modules/pages/show-tell/show-tell.component';
import { TermsComponent } from './modules/pages/terms/terms.component';
import { WhyPortfolioComponent } from './modules/pages/why-portfolio/why-portfolio.component';
import { AccessRestrictedComponent } from './modules/shared/access-restricted/access-restricted.component';
import { LoginComponent } from './modules/auth0/login/login.component';

const APP_ROUTES: Routes = [
    { path: '', loadChildren: './modules/home/home.module#HomeModule' },
    { path: 'showcases', loadChildren: './modules/showcase/showcase.module#ShowcaseModule' },
    { path: 'projects', loadChildren: './modules/projects/projects.module#ProjectsModule' },
    { path: 'makers', loadChildren: './modules/makers/makers.module#MakersModule' },
    { path: 'organizations', loadChildren: './modules/companies/companies.module#CompaniesModule' },
    { path: 'feed', loadChildren: './modules/feed/feed.module#FeedModule' },
    { path: 'orgs', loadChildren: './modules/orgs/orgs.module#OrgsModule' },
    { path: 'missions', loadChildren: './modules/missions/mission.module#MissionModule' },
    { path: 'portfolio', loadChildren: './modules/account/profile/profile.module#ProfileModule' },
    { path: 'account', loadChildren: './modules/account/account.module#AccountModule' },
    { path: 'search', loadChildren: './modules/search/search.module#SearchModule' },
    { path: 'learning', loadChildren: './modules/learn/learn.module#LearnModule' },
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
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '/404' },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
