import { Component, OnInit } from '@angular/core';
import { LoaderService } from './components/shared/loader/loader.service';
import { UserService,MainService } from './d7services';
import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  showLoader: boolean;

  constructor(
    private loaderService: LoaderService,
    private userService: UserService,
    private mainService: MainService,
    private router: Router,
    angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics
  ) {
    router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        setTimeout(function(){
            window.scrollTo(0, 1);
        }, 0);
      });

   }

  ngOnInit() {
    // check if the user is logged in at the back-end or not, if not, logged the user out too from the front-end
    this.userService.getStatus().subscribe(status => {
      if(status.user.uid == 0){
        this.mainService.removeCookies();
        localStorage.removeItem('id_token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_photo');              
        this.userService.getAnonymousToken().subscribe(data => {});
      }
    }, err => {
      console.log(err);
      this.mainService.removeCookies();
      localStorage.removeItem('id_token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_photo');      
    })
        
    
    // loader for routing
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
    // loader for components
    // this.loaderComponentService.LoaderComponentstatus.subscribe((val: boolean) => {
    //   this.showLoaderComponent = val;
    // });
    setTimeout(function(){
            window.scrollTo(0, 1);
        }, 0);
  }

}
