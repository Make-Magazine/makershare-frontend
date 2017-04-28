import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../d7services/view/view.service';
import { UserService } from '../../d7services/user/user.service';
import { NotificationTemplateComponent } from '../notification/notification-template/notification-template.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit {

  notifications = [];
  count: number = 0;
  constructor(
    private viewService: ViewService,
    private userService: UserService,
  ) { }

  ngOnInit() {

    this.getNotifications();

  }

  getNotifications (){
    this.userService.getStatus().subscribe(data => {
      
      if(data.user.uid != 0){
        this.getList(1);
        this.getCount(1);
      }
    }, err => {
      console.log(err);
    });
  }


  getList(uid: number){
    this.viewService.getView('notifications_api', [['uid', 1]]).subscribe(res => {
      console.log(res);
      this.notifications = res;
    });
  }

  getCount(uid: number){
    this.viewService.getView('notifications_count_api', [['uid', 1]]).subscribe(res => {
      console.log(res[0].count);
      this.count = res[0].count;
    });
  }

}
