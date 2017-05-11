import { Component, OnInit, Input } from '@angular/core';
import { ViewService } from '../../../d7services';

@Component({
  selector: 'app-user-card-msgs',
  templateUrl: './user-card-msgs.component.html'
})
export class UserCardMsgsComponent implements OnInit {

 @Input() uid;
 card;
  constructor(
    private viewService: ViewService
  ) { }

  ngOnInit() {
    this.getcard();
  }

  getcard() {
    this.viewService.getView('maker_profile_card_data2', [['uid', this.uid]]).subscribe(data => {
      this.card = data[0];
    });
  }

}
