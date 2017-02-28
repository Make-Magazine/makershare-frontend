import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-individual-workshop',
  templateUrl: './individual-workshop.component.html',
  styleUrls: ['./individual-workshop.component.css']
})
export class IndividualWorkshopComponent implements OnInit {

  workshop;
  object;
  nid;
  videoURl;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private sanitizer :DomSanitizer,
  ) { }

    ngOnInit() {
      console.log(this.route.params);
    this.route.params
    // (+) converts string 'id' to a number
    .switchMap((nid) => this.viewService.getView('individual-workshop',[['nid',nid['nid']]]))
    .subscribe(data =>{
      this.workshop = data[0];
      console.log(data);
      this.videoURl = this.sanitizer.bypassSecurityTrustResourceUrl(this.workshop.introductory_video);
    });
    // this.nid = this.workshop.nid;
    // var args = [
    //   ['nid', this.nid],
    // ];
    // this.viewService.getView('individual-workshop-object', [args]).subscribe( data => {
    //   this.workshop = data[0];
    // }, err => {

    // });
  }
}
