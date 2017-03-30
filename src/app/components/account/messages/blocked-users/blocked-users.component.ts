import { Component, OnInit } from '@angular/core';
import { PmService } from '../../../../d7services/pm/pm.service'

@Component({
  selector: 'app-blocked-users',
  templateUrl: './blocked-users.component.html',
  styleUrls: ['./blocked-users.component.css']
})
export class BlockedUsersComponent implements OnInit {
  blocked;
  hide = false;
  constructor(
    private pm: PmService
  ) { }

  ngOnInit() {
    this.getBlockedUsers();
  }
  getBlockedUsers() {
    this.pm.getAllBlocked().subscribe(data => {
      this.blocked = data;
    })
  }
  unBlockUsers(uid, i) {
    this.pm.unBlockUser(uid).subscribe();
    this.blocked.splice(i, 1);
  }
}
