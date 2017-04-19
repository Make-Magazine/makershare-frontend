import { Component, OnInit } from '@angular/core';
import { PmService } from '../../../../d7services/pm/pm.service'
import { LoaderService } from '../../../shared/loader/loader.service';

@Component({
  selector: 'app-blocked-users',
  templateUrl: './blocked-users.component.html',
  styleUrls: ['./blocked-users.component.css']
})
export class BlockedUsersComponent implements OnInit {
  blocked;
  hide = false;
  constructor(
    private pm: PmService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {
    this.getBlockedUsers();
    this.loaderService.display(true);
  }
  getBlockedUsers() {
    this.pm.getAllBlocked().subscribe(data => {
      this.blocked = data;
      this.loaderService.display(false);
    })
  }
  unBlockUsers(uid, i) {
    this.pm.unBlockUser(uid).subscribe();
    this.blocked.splice(i, 1);
  }
}
