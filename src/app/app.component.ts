import { Component, OnInit } from '@angular/core';
import { LoaderService } from './components/shared/loader/loader.service';
//import { LoaderComponentService } from './components/shared/loader-component/loader-component.service';
import { UserService } from './d7services/user/user.service';
import { Angulartics2GoogleAnalytics } from 'angulartics2';

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
    angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics
  ) { }

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

  }

}
