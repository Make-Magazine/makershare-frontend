import { Component, OnInit, Input } from '@angular/core';
import { ViewService } from '../../../CORE/d7services';

@Component({
  selector: 'app-maker-photo',
  templateUrl: './maker-photo.component.html',

})
export class MakerPhoto implements OnInit {
  photo_url;
  @Input() maker;

  constructor(
    private viewService: ViewService,
  ) {

  }
  ngOnInit() {
    this.getMakerCard();
  }
  getMakerCard() {
    // console.log(this.maker);
    if (this.maker) {
      this.viewService.getView('maker_card_data', [['uid', this.maker.uid]]).subscribe(data => {
        // this.card = data[0];
        // console.log('photo data');
        if (data[0]) {
          this.photo_url = data[0].photo;
        }
      });
    }
  }
}
