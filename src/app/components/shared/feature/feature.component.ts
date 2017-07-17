import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService, FlagService, UserService } from '../../../d7services';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar/release';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
})

export class FeatureComponent implements OnInit {

  @Input() id;
  @Input() type;
  isFeatured: boolean = false;
  userId;
  checkUserLogin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService,
    private notificationBarService: NotificationBarService,
  ) { }
  ngOnInit() {
    this.userId = localStorage.getItem('user_id');

    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data) {
        this.flagService.isFlagged(this.id, this.userId, 'feature_' + this.type).subscribe(data => {
          this.isFeatured = data[0];
        })
      }
    })
  }
  feature(e: Event) {
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (!data) {
        this.router.navigate(['/access-denied']);
      }
      e.preventDefault();

      this.isFeatured ? this.flagger('unflag') : this.flagger('flag');
    })
  }
  flagger(type: string) {
    this.flagService[type](this.id, this.userId, 'feature_' + this.type).subscribe(response => {
      this.isFeatured = !this.isFeatured;
    })
  }
}