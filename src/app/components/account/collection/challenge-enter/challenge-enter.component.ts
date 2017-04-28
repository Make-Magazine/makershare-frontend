import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../../d7services/view/view.service';
@Component({
  selector: 'app-challenge-enter',
  templateUrl: './challenge-enter.component.html',
})
export class ChallengeEnterComponent implements OnInit {
  @Input()countEntries;
    pages: number = 0;
    hideloadmoreentries = true;
    page_arg;
    userId;
    challenges = [];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
  ) { }
  ngOnInit() {
        this.userId = localStorage.getItem('user_id');

    this.getChallengeEntered();
  }
  getChallengeEntered() {
       if (this.pages >= 0) {
      this.page_arg =
        ['page', this.pages];
    }
    if (this.pages == 0) {
      this.challenges = [];
    }
    // get Maker Challenge entered  from a view
    this.viewService.getView('maker-challenge-entered',[['uid',this.userId],this.page_arg]).subscribe(res => {
      this.challenges = this.challenges.concat(res);
      this.loadMoreVisibilty();
    }, err => {

    });
  }
    deleteMessage(i) {
   /* 
    // this.mainService.delete(globals.endpoint + '/maker_challenge_entry_api', body).subscribe(res => {
    //   this.router.navigate(['challenges/', this.nid]);
    //   // console.log(this.challangeData.title)
    //   this.notificationBarService.create({ message: 'You have submitted Your Project ' + this.selectedProjectName + ' in the Challenge ' + this.challangeData.title, type: NotificationType.Success });
    //   /* bookmark auto after submit project challenge */
    //   if (this.nid) {
    //     this.flagService.flag(this.nid, this.userId, 'node_bookmark').subscribe(response => {
    //     }, err => {
    //     });
    //   }
    //   /* end bookmark  */
    //   /* follow auto after submit project challenge */
    //   if (this.nid) {
    //     this.flagService.flag(this.nid, this.userId, 'follow').subscribe(response => {
    //     }, err => {
    //     });
    //   }
    //   /* end follow  */
    // }, err => {
    //   // console.log(err);
    // });

  }
   /* function load more  */
  loadMoreEntries() {
    this.pages++;
    this.getChallengeEntered();
  }
  /* end function load more  */
    // Function to control load more button
  loadMoreVisibilty() {
    // get the challenges array count
    if (this.countEntries == this.challenges.length) {

      this.hideloadmoreentries = true;

    } else if (this.countEntries > this.challenges.length) {
      this.hideloadmoreentries = false;
    }
  }
  /* END FUNCTION loadMoreVisibilty */
}
