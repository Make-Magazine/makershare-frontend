import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services';

@Component({
  selector: 'app-maker-photo',
  templateUrl: './maker-photo.component.html',

})
export class MakerPhoto implements OnInit {
  photo_url;
  @Input() maker;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private viewService: ViewService,
  ) {

  }
  ngOnInit() {
    this.getMakerCard();
  }
  getMakerCard() {
    console.log(this.maker);
    this.viewService.getView('maker_card_data', [['uid', this.maker.uid]]).subscribe(data => {
      // this.card = data[0];
      // console.log('photo data');
      // console.log(data);
      this.photo_url = data[0].photo;
    });
  }
}