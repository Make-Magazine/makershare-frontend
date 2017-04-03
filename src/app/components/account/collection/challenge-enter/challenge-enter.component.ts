import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../../d7services/view/view.service';
@Component({
  selector: 'app-challenge-enter',
  templateUrl: './challenge-enter.component.html',
})
export class ChallengeEnterComponent implements OnInit {
  challenges = [];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
  ) { }
  ngOnInit() {
    this.getChallengeEntered();
  }
  getChallengeEntered() {
    // get Maker Challenge entered  from a view
    this.viewService.getView('maker-challenge-entered').subscribe(res => {
      this.challenges = res;
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
}
