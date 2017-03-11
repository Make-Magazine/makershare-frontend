import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserProfile } from "../../../../../models/profile/userprofile";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-all-profile',
  templateUrl: './all-profile.component.html'
})
export class AllProfileComponent implements OnInit {

  @Output() saveBasic = new EventEmitter<any>();

  basicForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
  }


  buildForm(): void {

  }

  onValueChanged(data?: any) {
    if (!this.basicForm) { return; }

    const form = this.basicForm;
    this.saveBasic.emit(this.basicForm);

  }


}
