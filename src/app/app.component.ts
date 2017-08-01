import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { LoaderService } from './components/shared/loader/loader.service';
import { UserService, MainService } from './d7services';
import { Router, NavigationEnd } from '@angular/router';
import { Auth } from './auth0/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { Singleton } from './CORE';

declare var ga:Function;

@Component({
  selector: 'application',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit{
  private isBrowser: boolean = isPlatformBrowser(this.platform_id);

  showLoader: boolean;
  siteMap;
  public location = '';
  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    public auth: Auth,
    private loaderService: LoaderService,
    private userService: UserService,
    private mainService: MainService,
    public router: Router,
  ) {

    auth.handleAuthentication();
    router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        setTimeout(function () {
          window.scrollTo(0, 1);
        }, 0);
      });
          // Using Rx's built in `distinctUntilChanged ` feature to handle url change c/o @dloomb's answer
        router.events.distinctUntilChanged((previous: any, current: any) => {
            // Subscribe to any `NavigationEnd` events where the url has changed
            if(current instanceof NavigationEnd) {
                return previous.url === current.url;
            }
            return true;
        }).subscribe((x: any) => {
          if (this.isBrowser) { 
            ga('set', 'page', x.url);
            ga('send', 'pageview')
          }
        });
      }
  

  ngOnInit() {
    this.SetApplicationSingleton();

    // check if the user is logged in at the back-end or not, if not, logged the user out too from the front-end
    this.userService.getStatus().subscribe(status => {
      if (status.user.uid == 0) {
        this.mainService.removeCookies();
        localStorage.removeItem('id_token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_photo');
        this.userService.getAnonymousToken().subscribe(data => { });
      }
    }, err => {
      // console.log(err);
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
    setTimeout(function () {
      window.scrollTo(0, 1);
    }, 0);


  
  }


  SetApplicationSingleton(){
    console.log(Singleton.Settings.LANGUAGE);
    Singleton.Settings.LANGUAGE = "ar";
  }

}


