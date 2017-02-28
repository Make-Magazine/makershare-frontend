import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';
@Component({
  selector: 'app-challenge-summary',
  templateUrl: './challenge-summary.component.html',
  styleUrls: ['./challenge-summary.component.css']
})
export class ChallengeSummaryComponent implements OnInit {

  constructor(private viewService: ViewService) { }

  ngOnInit() {
  }

}
