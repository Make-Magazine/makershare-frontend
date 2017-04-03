import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileModule } from './profile/profile.module';
import { CollectionModule } from '../account/collection/collection.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileModule,
    CollectionModule
  ],
  declarations: [],
  exports: []
})
export class AccountModule { }

