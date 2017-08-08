import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { FlagService, UserService } from '../../../core/d7services';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  providers: [NgbTooltipConfig],
})
export class BookmarkComponent implements OnInit {
  @Input() nodeNid;
  @Input() nodeType: string = '';
  userId;
  private checkUserLogin: boolean = false;
  isBookmarked: boolean;
  private toggleFlag: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private flagService: FlagService,
    private config: NgbTooltipConfig,
  ) {
    this.router = router;
    this.config.placement = 'bottom';
    this.config.triggers = 'hover';
  }

  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    this.userService.isLogedIn().subscribe(data => {
      this.checkUserLogin = data;
      if (this.nodeNid) {
        this.flagService
          .isFlagged(this.nodeNid, this.userId, 'node_bookmark')
          .subscribe(data => {
            this.isBookmarked = data[0];
          });
      }
    });
  }

  bookmarkThis(e: Event) {
    if (!this.checkUserLogin) {
      this.router.navigate(['/access-denied']);
    } else {
      this.toggleFlag = this.isBookmarked ? 'unflag' : 'flag';
      this.flagService
        [this.toggleFlag](this.nodeNid, this.userId, 'node_bookmark')
        .subscribe(response => {
          this.isBookmarked = !this.isBookmarked;
        });
    }
  }
}
