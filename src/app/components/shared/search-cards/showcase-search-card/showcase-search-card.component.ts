import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../../d7services/view/view.service';
import { FlagService } from '../../../../d7services/flag/flag.service';
import { UserService } from '../../../../d7services/user/user.service';

@Component({
  selector: 'app-showcase-search-card',
  templateUrl: './showcase-search-card.component.html',
})
export class ShowcaeSearchCardComponent implements OnInit {
  showcase = [];
  isLiked = false;
  userId;
  currentuser;
  checkUserLogin = false;
  @Input() showcaseNid;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService,
  ) { }
  ngOnInit() {
    this.getShowcases();
    this.userId = localStorage.getItem('user_id');
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (data == false) { } else {
        /*like start */
        this.flagService.isFlagged(this.showcaseNid, this.userId, 'like').subscribe(data => {
          this.isLiked = data[0];
          // console.log(this.isLiked)
        }, err => {
          //this.notificationBarService.create({ message: 'Sorry, somthing went wrong, try again later.', type: NotificationType.Error});
          // console.log(err);
        })

        /*like end*/
      }//end else 
    });//end userservice isLogedIn
  }

  getShowcases() {
    this.viewService.getView('shared-showcase-card', [['nid', this.showcaseNid]]).subscribe(data => {
      this.showcase = data[0];
      console.log(this.showcase);
    });
  }
  ShowSingleShowcase(nid) {
    this.router.navigate(['/showcases', nid]);
  }


}
