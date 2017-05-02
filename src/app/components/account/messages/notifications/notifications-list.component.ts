import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../../d7services/view/view.service';
import { UserService } from '../../../../d7services/user/user.service';
import { Notification } from '../../../../models';
import { LoaderService } from '../../../shared/loader/loader.service';

@Component({
  selector: 'notifications-list',
  templateUrl: './notifications-list.component.html',
})
export class NotificationsListComponent implements OnInit {

  notifications:Notification[] = [];
  notificationsCount:number = 0;
  notificationsCountTotal: number = 0;
  hideLoadMore = false;
  pageNumber: number = 0;
  CurrentUserID = localStorage.getItem("user_id");
  constructor(
    private viewService: ViewService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.GetNotificationsList();
    this.GetNotificationsCountTotal();
    this.GetNotificationsCount();
    // this.loaderService.display(true);
  }

  GetNotificationsList(){
    this.viewService.getView('views/api_notifications', [['display_id', 'services_1'],['uid', this.CurrentUserID], ['page', this.pageNumber]]).subscribe((notifications:Notification[]) => {
      this.notifications = this.notifications.concat(notifications);
      this.loaderService.display(false);

    });
  }

  GetNotificationsCount(){
    this.viewService.getView('notifications_count_api', [['uid', this.CurrentUserID]]).subscribe(data => {
      this.notificationsCount = data[0].count;
    });
  }

  GetNotificationsCountTotal(){
    this.viewService.getView('views/api_notifications', [['display_id', 'services_2'],['uid', this.CurrentUserID]]).subscribe(data => {
      this.notificationsCountTotal = data[0].total;
    });
  }  

  loadMore() {
    this.pageNumber++;
    this.GetNotificationsList();
  }

  
}
