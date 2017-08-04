import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'app/modules/shared/shared.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { ImageCropperModule } from 'ng2-img-cropper';
import { AccountRountingModule } from 'app/modules/account/account-rounting.module';

@NgModule({
  imports: [
    CommonModule,
    AccountRountingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forChild(),
    NgbModule,
    ImageCropperModule,
    CKEditorModule,
  ],
  declarations: [],
  exports: [],
})
export class AccountModule {}
