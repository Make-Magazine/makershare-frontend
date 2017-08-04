import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TruncatePipe } from 'app/Angular/pipes/truncate';
import { BaseComponent } from 'app/modules/account/profile/base/base.component';
import { ProfileRoutingModule } from 'app/modules/account/profile/profile.routing.module';
import { EditPortfolioComponent } from 'app/modules/account/profile/view/edit-portfolio/edit-portfolio/edit-portfolio.component';
import { FileManagerComponent } from 'app/modules/account/profile/view/edit-portfolio/file-manager/file-manager.component';
import { PortfolioTabComponent } from 'app/modules/account/profile/view/edit-portfolio/portfolio-tab/portfolio-tab.component';
import { ProjectCardPortfolioComponent } from 'app/modules/account/profile/view/edit-portfolio/project-card-portfolio/project-card-portfolio.component';
import { ProfileComponent } from 'app/modules/account/profile/view/profile.component';
import { ProjectsComponent } from 'app/modules/account/profile/view/projects/projects.component';
import { SharedModule } from 'app/modules/shared/shared.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { DndModule } from 'ng2-dnd';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forChild(),
    NgbModule,
    CKEditorModule,
    DndModule,
  ],
  declarations: [
    ProfileComponent,
    ProjectsComponent,
    BaseComponent,
    EditPortfolioComponent,
    PortfolioTabComponent,
    ProjectCardPortfolioComponent,
    FileManagerComponent,
    TruncatePipe,
  ],
})
export class ProfileModule {}
