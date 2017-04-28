import { Component, OnInit } from '@angular/core';
import { PmService } from '../../../../d7services/pm/pm.service'
import { LoaderService } from '../../../shared/loader/loader.service';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blocked-users',
  templateUrl: './blocked-users.component.html',
  styleUrls: ['./blocked-users.component.css']
})
export class BlockedUsersComponent implements OnInit {
  blocked = [];
  hide = false;
  constructor(
    private pm: PmService,
    private loaderService: LoaderService,
    private notificationBarService: NotificationBarService,
    private _location: Location,
  ) { }

  ngOnInit() {
    this.getBlockedUsers();
    this.loaderService.display(true);
  }
  getBlockedUsers() {
    this.pm.getAllBlocked().subscribe(data => {
      this.blocked = data;
      if(this.blocked.length == 0){
      this.notificationBarService.create({ message: 'There is no blocked users' , type: NotificationType.Error,allowClose:true,autoHide:false,hideOnHover:false });        
      }
      this.loaderService.display(false);
    })
  }
  unBlockUsers(uid, i) {
    this.pm.unBlockUser(uid).subscribe();
    this.blocked.splice(i, 1);
  }

   previousUrl() {
    this._location.back();
  }
}
