import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inbox-notifications',
  templateUrl: './inbox-notifications.component.html'
})
export class InboxNotificationsComponent implements OnInit {
current_active_tab;
  constructor() { }

  ngOnInit() {
      this.current_active_tab = 'notifications';
  }

}
