import { Component, OnInit } from '@angular/core';
import { LoaderService } from './components/shared/loader/loader.service';
//import { LoaderComponentService } from './components/shared/loader-component/loader-component.service';
import { UserService } from './d7services/user/user.service';
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
    this.userService.getAnonymousToken().subscribe(data => {});
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
