import { Component, OnInit,Input} from '@angular/core';
import { ViewService } from '../../../../d7services/view/view.service';
import { UserService } from '../../../../d7services/user/user.service';
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
  ) { }

  ngOnInit() {
    this.getNotifications();
  }
  getNotifications(){
   this.userService.isLogedIn().subscribe(data => {
      if (data ){
         this.userId = localStorage.getItem('user_id');
         this.viewService.getView('web_notifications', [['uid', this.userId]]).subscribe(data => {
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
