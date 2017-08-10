import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-org-form-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {

  @Input() organizationForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
