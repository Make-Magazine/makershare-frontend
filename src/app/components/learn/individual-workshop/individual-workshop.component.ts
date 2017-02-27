import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';

@Component({
  selector: 'app-individual-workshop',
  templateUrl: './individual-workshop.component.html',
  styleUrls: ['./individual-workshop.component.css']
})
export class IndividualWorkshopComponent implements OnInit {

    constructor(private viewService: ViewService) {}

  workshopPage = null;
  ngOnInit() {

      // get individual workshop page from a view
    this.viewService.getView('individual_workshop_object', []).subscribe(data => {
      console.log(data);
      this.workshopPage = data;
    }, err => {

    });

  }

}
