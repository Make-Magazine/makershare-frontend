import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountRountingModule } from './account-rounting.module';
import { SelectModule } from 'ng2-select';
import { IcDatepickerModule } from 'ic-datepicker';
import { TagInputModule } from 'ng2-tag-input';
import { FormsModule } from '@angular/forms';
import { SharedModule }  from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModule } from 'ng2-img-cropper';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  imports: [
    IcDatepickerModule,
    CommonModule,
    AccountRountingModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    TagInputModule,
    SharedModule,
    NgbModule,
    ImageCropperModule,
    CKEditorModule
  ],
  declarations: [],
  exports: []
})
export class AccountModule { }

