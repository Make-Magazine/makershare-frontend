import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent-settings',
  templateUrl: './parent-settings.component.html'
})
export class ParentSettingsComponent implements OnInit {

current_active_tab: string;
roles;
user_role;
  constructor(
  ) { }

  ngOnInit() {
    this.roles = JSON.parse(localStorage.getItem('roles'));
    console.log(this.roles);
    if ('4' in this.roles){
      this.user_role=4;
    }else if('3' in this.roles){
      this.user_role=3;
    }else if('6' in this.roles){
      this.user_role=6;
    }


    this.current_active_tab = 'default-settings';
  }
}
