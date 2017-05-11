import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Notification } from '../../../models';
import { MainService } from '../../../d7services/main/main.service';
import { UserService } from '../../../d7services/user/user.service';
import { PmService } from '../../../d7services/pm/pm.service';

@Component({
  selector: 'notification-tpl',
  templateUrl: './notification-template.component.html',
})


export class NotificationTemplateComponent implements OnInit {


  @Input() notification:Notification;

  constructor(
    private router: Router,
    private mainService:MainService,
    private userService:UserService,
    private pm: PmService,
  ) { }

  ngOnInit() {   
  }

  MarkAsSeen(seen){
    
    this.ChangeNotificationStatus(seen).subscribe(data=>{
      this.notification.seen = seen;
    });
  }

  ChangeNotificationStatus(seen){
    let notification = {
      mid:this.notification.mid,
      field_seen:{und:[{value:seen}]},
      type:this.notification.type,
    }
    return this.mainService.put('/api/entity_message/'+this.notification.mid,notification);
  }

  OpenNotification(ShowcaseUserID?:number){
    this.ChangeNotificationStatus(1).subscribe(data=>{},err=>console.log(err),()=>{
      // open user profile
      if(ShowcaseUserID){
        if(this.notification.type == 'project_added_to_showcase'){
          this.router.navigate(["/showcases",this.notification.showcase_nid]);
        }else{
          this.userService.getUrlFromId(ShowcaseUserID).subscribe( data => {
            let url = data.url;
            this.router.navigateByUrl("/portfolio/"+url);
          });
        }
      // open entity page
      }else {
        if(this.notification.type == 'challenge_follow_deadline' || this.notification.type == 'challenge_follow_deadline'){
          this.router.navigate(["/missions",this.notification.nid]);
        }else if(this.notification.type == "new_message_sent"){
          this.router.navigate(["/account/inbox/view",this.notification.pm_mid]);
        }else{
          this.router.navigate(["/project/view",this.notification.nid]);
        }
      }
    });
  }


  GoToProfile(path: string){
    // should redirect to profile
    this.router.navigate(['portfolio', 'abdulrahman-alhomsi']);
  }

  GoToNode(nid: number, type: string){
    // should redirect to node page according to the type string
    // you need to create an array, keys as message type, values routing paths.
    // when you have the type, you can get the correct path, then route.
  }

  deleteNotifications(){
   this.pm.deleteNotification(this.notification.mid).subscribe(data=>{
      delete this.notification;
   })
  }
}
