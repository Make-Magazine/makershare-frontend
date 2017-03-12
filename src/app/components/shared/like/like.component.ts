import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { FlagService } from '../../../d7services/flag/flag.service';
import { UserService } from '../../../d7services/user/user.service';
@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',

})
export class LikeComponent implements OnInit {
  @Input() nodeNid;
  currentuser;
  isLiked = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService
  ) { }
  ngOnInit() {
    console.log(this.nodeNid);
    this.userService.getStatus().subscribe(data => {
      this.currentuser = data;

      /*like start */
      this.flagService.isFlagged(this.nodeNid, this.currentuser.user.uid, 'like').subscribe(data => {
        this.isLiked = data[0];
      })
      /*like end*/


    });
  }

  /* function like */
  likeThis(e: Event) {
    e.preventDefault();
    if (this.isLiked) {
      this.flagService.unflag(this.nodeNid, this.currentuser.user.uid, 'like').subscribe(response => {
        this.isLiked = false;
      });
    } else {
      this.flagService.flag(this.nodeNid, this.currentuser.user.uid, 'like').subscribe(response => {
        this.isLiked = true;
      });
    }
  }
  /* end function like */

}
