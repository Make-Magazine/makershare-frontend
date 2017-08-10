import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-org-form-basic-info',
  templateUrl: './basic-info.component.html'
})
export class BasicInfoComponent implements OnInit {

  @Input() organizationForm: FormGroup;

  constructor() { }

  ngOnInit() {
    console.log(this.organizationForm);
  }

}
