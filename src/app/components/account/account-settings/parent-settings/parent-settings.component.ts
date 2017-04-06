import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent-settings',
  templateUrl: './parent-settings.component.html'
})
export class ParentSettingsComponent implements OnInit {

current_active_tab: string;
  constructor(
  ) { }

  ngOnInit() {
    this.current_active_tab = 'default-settings';
  }
}
