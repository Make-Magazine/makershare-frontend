import { Component, OnInit } from '@angular/core';
import { SliderComponent } from './slider/slider.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { ShowcasesComponent } from './showcases/showcases.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
