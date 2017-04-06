import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-parent-settings',
  templateUrl: './parent-settings.component.html'
})
export class ParentSettingsComponent implements OnInit {

current_active_tab: string;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.current_active_tab = 'default-settings';
  }
}
