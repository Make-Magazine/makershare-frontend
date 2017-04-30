import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../d7services/user/user.service';

@Component({
  selector: 'app-single',
  templateUrl: './single-notification.component.html',
  styleUrls: ['./single-notification.component.css']
})
export class SingleNotificationComponent implements OnInit {
  @Input('CurrentObject') CurrentObject:any;
  user;
  constructor(private router:Router,
  private userService:UserService) { }

  ngOnInit() {
    // this.getUserAlias();
  
}
// getUserAlias(){

//   this.user.user_id= localStorage.getItem('user_id');
//      if(this.user.user_id){
//        this.user.user_name=localStorage.getItem('user_name');

//        this.userService.getUser(this.user.user_id).subscribe(res => {
//         // console.log(this.profile.full_name);
//         this.user.user_alias=res.path_alias;
//       }, err => {
//         console.log(err);
//       });
//     }

// }
  goToProfile(){
    // should redirect to profile
    this.router.navigate(['portfolio', 'abdulrahman-alhomsi']);
  }

  goToNode(nid: number, type: string){
    // should redirect to node page according to the type string
    // you need to create an array, keys as message type, values routing paths.
    // when you have the type, you can get the correct path, then route.
  }

}
