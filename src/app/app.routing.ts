import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from 'app/modules/auth0/access-denied/access-denied.component';
import { Four04Component } from 'app/modules/auth0/four04/four04.component';
import { AccessRestrictedComponent } from 'app/modules/shared/access-restricted/access-restricted.component';
// static pages
import { MakerMovementComponent } from 'app/modules/pages/maker-movement/maker-movement.component';
import { IntelMakeComponent } from 'app/modules/pages/intel-make/intel-make.component';
import { AboutBadgesComponent } from 'app/modules/pages/about-badges/about-badges.component';
import { TermsComponent } from 'app/modules/pages/terms/terms.component';
import { OtherSitesComponent } from 'app/modules/pages/other-sites/other-sites.component';
import { MakezineComponent } from 'app/modules/pages/makezine/makezine.component';
import { MakerFaireComponent } from 'app/modules/pages/maker-faire/maker-faire.component';
import { MakerIntelComponent } from 'app/modules/pages/maker-intel/maker-intel.component';
import { MakerCampComponent } from 'app/modules/pages/maker-camp/maker-camp.component';
import { MakerShedComponent } from 'app/modules/pages/maker-shed/maker-shed.component';
import { IntelInnovationComponent } from 'app/modules/pages/intel-innovation/intel-innovation.component';
import { GuidelinesComponent } from 'app/modules/pages/guidelines/guidelines.component';
import { WhyPortfolioComponent } from 'app/modules/pages/why-portfolio/why-portfolio.component';
import { AboutUsComponent } from 'app/modules/pages/about-us/about-us.component';
import { ShowTellComponent } from 'app/modules/pages/show-tell/show-tell.component';
import { ClaimProfileComponent } from 'app/modules/pages/claim-profile/claim-profile.component';

const APP_ROUTES: Routes = [
    { path: '', loadChildren: 'app/modules/home/home.module#HomeModule' },
    { path: 'showcases', loadChildren: 'app/modules/showcase/showcase.module#ShowcaseModule' },
    { path: 'projects', loadChildren: 'app/modules/projects/projects.module#ProjectsModule' },
    { path: 'makers', loadChildren: 'app/modules/makers/makers.module#MakersModule' },
    { path: 'organizations', loadChildren: 'app/modules/companies/companies.module#CompaniesModule' },
    { path: 'feed', loadChildren: 'app/modules/feed/feed.module#FeedModule' },
    { path: 'orgs', loadChildren: 'app/modules/orgs/orgs.module#OrgsModule' },
    { path: 'missions', loadChildren: 'app/modules/missions/mission.module#MissionModule' },
    { path: 'portfolio', loadChildren: 'app/modules/account/profile/profile.module#ProfileModule' },
    { path: 'account', loadChildren: 'app/modules/account/account.module#AccountModule' },
    { path: 'search', loadChildren: 'app/modules/search/search.module#SearchModule' },
    { path: 'learning', loadChildren: 'app/modules/learn/learn.module#LearnModule' },
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
