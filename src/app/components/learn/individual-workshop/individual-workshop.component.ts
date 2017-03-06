import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';


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
  previewPdf;
  page: number = 1;
  showElement
  videoLink ;
  sanitizethis;
  popupPreview;
  leaders= [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private sanitizer :DomSanitizer,
    private http:Http,
  ) { }

    ngOnInit() {         
    this.route.params
    // (+) converts string 'id' to a number
    .switchMap((nid) => this.viewService.getView('individual-workshop',[['nid',nid['nid']]]))
    .subscribe(data =>{
      this.workshop = data[0];
       console.log(this.workshop.uid)
       this.viewService.getView('maker_profile_search_data',[['uid',this.workshop.uid],]).subscribe(res => {
       this.leaders= res;
       console.log(res)
        });
      console.log(this.workshop.uid);
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
          if (this.youtube_parser(element.video)) {
            this.sanitizethis = "https://www.youtube.com/oembed?url=" + element.video;
            console.log(this.sanitizethis)
            console.log(this.objects[index])
            this.http.get(this.sanitizethis).map(res => res.json()).subscribe(data => {
            console.log(data.html);
            this.videoLink = this.sanitizer.bypassSecurityTrustHtml(data.html);

            console.log(this.videoLink)
          });
        }
        else if (this.vimeo_parser(element.video))
        {
            this.sanitizethis = "https://vimeo.com/api/oembed.json?url=" + element.video;
            console.log(this.sanitizethis)
            console.log(this.objects[index])
            this.http.get(this.sanitizethis).map(res => res.json()).subscribe(data => {
            console.log(data.html);
            this.videoLink = this.sanitizer.bypassSecurityTrustHtml(data.html);
         });
        }

        //this.objects[index].push(this.videoLink)
        //Object.assign(this.objects[index],this.videoLink)
        //console.log(this.objects[index])
        }
      
      }
       
    console.log(this.leaders)
    });

     this.route.params
    // (+) converts string 'id' to a number
    .switchMap((nid) => this.viewService.getView('more-lessons',[['nid',nid['nid']]]))
    .subscribe(data =>{
      this.lessons = data;
      console.log(data);
  });
    // this.viewService.getView('maker_profile_search_data',[['uid',this.workshop['uid']],]).subscribe(data => {
    //    this.leader= data[0];
    //    console.log(data[0])
    //     });
  
// console.log(this.workshop.uid)
  }
  // preview(i){
  //     console.log(this.objects[i].pdf) 
  //     this.popupPreview =  '<iframe src="http://docs.google.com/gview?url=' + this.objects[i].pdf + '&embedded=true" frameborder="0"></iframe>'
  //   }

  youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    //console.log(match[7])
    return (match&&match[7].length==11)? match[7] : false;
}
 vimeo_parser(url){
   var regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
   var match = url.match(regExp);
    return match[5];
 }
  
}
