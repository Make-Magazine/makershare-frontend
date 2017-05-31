import { RouterModule, Routes } from "@angular/router";
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
import { MakerShedComponent } from './components/pages/maker-shed/maker-shed.component';
import { IntelInnovationComponent } from './components/pages/intel-innovation/intel-innovation.component';
import { GuidelinesComponent } from './components/pages/guidelines/guidelines.component';
import { WhyPortfolioComponent } from './components/pages/why-portfolio/why-portfolio.component';
import { ShowTellComponent } from './components/pages/show-tell/show-tell.component';

//modules
import { HomeModule } from './components/home/home.module';
import { ShowcaseModule } from './components/showcase/showcase.module';
import { ProjectsModule } from './components/projects/projects.module';
import { ChallengeModule } from './components/challenge/challenge.module';
import { ProfileModule } from './components/account/profile/profile.module';
import { AccountModule } from './components/account/account.module';
import { SearchModule } from './components/search/search.module';

const APP_ROUTES: Routes = [
    { path: '', loadChildren: './components/home/home.module#HomeModule' },
    { path: 'makers', loadChildren: './components/showcase/showcase.module#ShowcaseModule' },
    { path: 'projects', loadChildren: './components/projects/projects.module#ProjectsModule' },
    { path: 'missions', loadChildren: './components/challenge/challenge.module#ChallengeModule' },
    { path: 'portfolio', loadChildren: './components/account/profile/profile.module#ProfileModule' },
    { path: 'portfolio/:name', loadChildren: './components/account/profile/profile.module#ProfileModule' },
    { path: 'account', loadChildren: './components/account/account.module#AccountModule' },
    { path: 'search', loadChildren: './components/search/search.module#SearchModule' },
    { path: 'access-denied', component:  AccessDeniedComponent},    
    { path: 'the-maker-movement', component: MakerMovementComponent},
    { path: 'make-intel', component: IntelMakeComponent},
    { path: 'guidelines', component: GuidelinesComponent},
    { path: 'why-portfolio', component: WhyPortfolioComponent},
    { path: 'badges', component: AboutBadgesComponent},
    { path: 'show-and-tell', component: ShowTellComponent},
    { path: 'terms-of-use', component: TermsComponent},
    { path: 'other-sites', component: OtherSitesComponent},
    { path: 'makezine', component: MakezineComponent},
    { path: 'maker-faire', component: MakerFaireComponent},
    { path: 'makers-intel', component: MakerIntelComponent},
    { path: 'maker-camp', component: MakerCampComponent},
    { path: 'maker-shed', component: MakerShedComponent},
    { path: 'intel-innovation-programs', component: IntelInnovationComponent},
    { path: '404', component: Four04Component },
    { path: '**', redirectTo:'/404' },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
