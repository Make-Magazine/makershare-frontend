import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../d7services';
import { LoaderService } from '../../../shared/loader/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
})
export class BaseComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {
    // check if user is logged in or not
    this.loaderService.display(true);
    this.userService.getStatus().subscribe(data => {
      if(data.user.uid > 0){
        // logged in 
        this.userService.getUrlFromId(data.user.uid).subscribe( data => {
          let url = data.url;
          this.loaderService.display(false);
          this.router.navigateByUrl('/portfolio/' + url);
        }, err => {
          this.loaderService.display(false);
          this.router.navigateByUrl('/');
        });
      }else {

        // not logged in
        this.loaderService.display(false);
        this.router.navigateByUrl('/');
      }
    }, err => {
      this.router.navigateByUrl('/');
    });
  }

}
