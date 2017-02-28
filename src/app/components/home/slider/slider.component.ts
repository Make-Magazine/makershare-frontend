import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  sliders = [];

  constructor(
    private ViewService: ViewService,
  ) { }

  ngOnInit() {

    // loading the slider from the API
    this.ViewService.getView('home_banner').subscribe(data => {
      this.sliders = data;
    }, err => {

    });
  }

}
