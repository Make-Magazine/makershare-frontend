import { Component, OnInit} from '@angular/core';
import { UserService,ViewService } from '../../../../d7services';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
userId;
profile;
notifications;

  constructor(
    private viewService: ViewService,
    private userService: UserService,
  ) { 

  }

  ngOnInit() {
    this.getNotifications();
  }
  getNotifications(){
   this.userService.isLogedIn().subscribe(data => {
      if (data ){
         this.userId = localStorage.getItem('user_id');
         this.viewService.getView('view_all_notifications', [['uid', this.userId]]).subscribe(data => {
            this.notifications=data;
            console.log(this.notifications);
          }, err => {
            console.log(err);
          });
        }
        // this.router.events.subscribe((event) => {
        // });
      });
  }
  

}
