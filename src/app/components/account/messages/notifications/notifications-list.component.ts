import { Component, OnInit } from '@angular/core';
import { ViewService,UserService } from '../../../../d7services';
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
  intervalString='';
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
    //  this.loaderService.display(true);
    this.viewService.getView('views/api_notifications', [['display_id', 'services_1'],['uid', this.CurrentUserID], ['page', this.pageNumber]]).subscribe((notifications:Notification[]) => {
      this.notifications = this.notifications.concat(notifications);
      for(var i=0;i<this.notifications.length;i++){
        this.notifications[i].date=this.timeago(this.notifications[i].date);
      }

      // this.loaderService.display(false);

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
    timeago(date){
    var n = date.includes("min") || date.includes('sec');
    var current;
    if(n){
      date = date.substring(0, date.indexOf("hours"));
      if(!date){
      date=date+'0';
  }
  date=date+' hours';

  }
    return date+' ago';
  }
 }
  // timeago(timeStamp) {
  //   var secs = ((new Date()).getTime() / 1000) - timeStamp;
  //   Math.floor(secs);
  //   var minutes = secs / 60;
  //   secs = Math.floor(secs % 60);
  //   if (minutes < 1) {
  //       var sec= secs + (secs > 1 ? ' seconds ago' : ' second ago');
  //   }
  //   var hours = minutes / 60;
  //   minutes = Math.floor(minutes % 60);
  //   if (hours < 1) {
  //       var minute= minutes + (minutes > 1 ? ' minutes ago' : ' minute ago');
  //   }
  //   var days = hours / 24;
  //   hours = Math.floor(hours % 24);
  //   if (days < 1) {
  //       var hour= hours + (hours > 1 ? ' hours ago' : ' hour ago');
  //   }
  //   var weeks = days / 7;
  //   days = Math.floor(days % 7);
  //   if (weeks < 1) {
  //       var day= days + (days > 1 ? ' days ago' : ' day ago');
  //   }
  //   var months = weeks / 4.35;
  //   weeks = Math.floor(weeks % 4.35);
  //   if (months < 1) {
  //       var week= weeks + (weeks > 1 ? ' weeks ago' : ' week ago');
  //   }
  //   var years = months / 12;
  //   months = Math.floor(months % 12);
  //   if (years < 1) {
  //       var month=months + (months > 1 ? ' months ago' : ' month ago');
  //   }
  //   years = Math.floor(years);
  //   var year= years + (years > 1 ? ' years ago' : ' years ago');
  //   if(minutes  || secs ){
  //       if(hours && days && months && years){
  //         return year+''+month+''+day+''+hour+' ago';
  //       }else if(days && months && years){
  //         return year+''+month+''+day+' ago'; 
  //       }else if(months && years){
  //         return year+''+month+' ago'
  //       }

        
  //     //   return year+''+month+''+day+''+hour+' ago';
  //     // }else{
        
  //     //   return years+''+months+''+days+''+'0 hours ago';
  //     // }
  //   }else{
  //       return year+''+month+''+day+''+'0 hours ago';

  //   }
  // // interval = Math.floor(seconds / 60);
  // // if (interval > 1) {
  // //   return this.intervalString=this.intervalString+"0 hours";
  // // }
  // // interval = Math.floor(seconds);
  // //   if (interval > 1) {
  // //   return this.intervalString=this.intervalString+"0 hours";
  // // }

  // }
