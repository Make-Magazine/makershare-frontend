import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PdfViewerComponent } from '../../../../../node_modules/ng2-pdf-viewer';


@Component({
  selector: 'app-individual-workshop',
  templateUrl: './individual-workshop.component.html',
  styleUrls: ['./individual-workshop.component.css']
})
export class IndividualWorkshopComponent implements OnInit {

  workshop;
  objects;
  lessons;
  nid;
  videoURl;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private sanitizer :DomSanitizer,
  ) { }

    ngOnInit() {         
    this.route.params
    // (+) converts string 'id' to a number
    .switchMap((nid) => this.viewService.getView('individual-workshop',[['nid',nid['nid']]]))
    .subscribe(data =>{
      this.workshop = data[0];
      console.log(data);
      this.videoURl = this.sanitizer.bypassSecurityTrustResourceUrl(this.workshop.introductory_video);
    });
      //  console.log(this.route.params);
    this.route.params
    // (+) converts string 'id' to a number
    .switchMap((nid) => this.viewService.getView('individual-workshop-object',[['nid',nid['nid']]]))
    .subscribe(data =>{
      this.objects = data;
      console.log(data);
      for(let index in this.objects){
        let element = this.objects[index];
        if(element.video){
          this.objects[index].video = this.sanitizer.bypassSecurityTrustResourceUrl(element.video);
        }
        
      }
      //  this.videoObject = this.sanitizer.bypassSecurityTrustResourceUrl(this.objects.video);
      //  console.log(this.videoObject);
    });

     this.route.params
    // (+) converts string 'id' to a number
    .switchMap((nid) => this.viewService.getView('more-lessons',[['nid',nid['nid']]]))
    .subscribe(data =>{
      this.lessons = data;
      console.log(data);
  });
    // this.nid = this.workshop.nid;
    // var args = [
    //   ['nid', this.nid],
    // ];
    // this.viewService.getView('individual-workshop-object', [args]).subscribe( data => {
    //   this.object = data[0];
    // }, err => {

    // });
  }
}
