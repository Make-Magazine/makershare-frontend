import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { OptionalInfoComponent } from './optional-info/optional-info.component';
import { EditProfileRoutingModule } from './edit-profile-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { IcDatepickerModule } from 'ic-datepicker';
import { TagInputModule } from 'ng2-tag-input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    EditProfileRoutingModule,
    IcDatepickerModule,
    TagInputModule,
    NgbModule,
    CKEditorModule
  ],
  declarations: [
    EditProfileComponent,
    BasicInfoComponent,
    OptionalInfoComponent,
  ]
})
export class EditProfileModule { }
