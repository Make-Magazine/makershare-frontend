import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { FlagService } from '../../../d7services/flag/flag.service';
import { UserService } from '../../../d7services/user/user.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',

})
export class BookmarkComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private userService: UserService,
    private flagService: FlagService
  ) { }
  @Input() nodeNid;
  @Input() user;
  currentuser;
  isBookmarked

  ngOnInit() {

      /*bookmark start */
      this.flagService.isFlagged(this.nodeNid, this.user.uid, 'node_bookmark').subscribe(data => {
        this.isBookmarked = data[0];
      })
      /*bookmark end*/
  }

  /* function bookmark */
  bookmarkThis(e: Event) {
    e.preventDefault();
    if (this.isBookmarked) {
      this.flagService.unflag(this.nodeNid, this.user.uid, 'node_bookmark').subscribe(response => {
        this.isBookmarked = false;
      });
    } else {
      this.flagService.flag(this.nodeNid, this.user.uid, 'node_bookmark').subscribe(response => {
        this.isBookmarked = true;
      });
    }
  }
  /* end function bookmark */

}
