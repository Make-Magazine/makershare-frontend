import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { ProfileModule } from './profile/profile.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileModule
  ],
  declarations: [
    LoginComponent,
  ],
  exports: [LoginComponent]
})
export class AccountModule { }

