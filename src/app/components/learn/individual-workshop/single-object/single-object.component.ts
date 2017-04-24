import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../../d7services/view/view.service';
// import { DomSanitizer } from '@angular/platform-browser';
// import { Http } from '@angular/http';
// import { BookComponent } from '../../book/book.component';
// import { IndividualWorkshopComponent } from '../../individual-workshop/individual-workshop.component';




@Component({
  selector: 'app-single-object',
  templateUrl: './single-object.component.html',
  styleUrls: ['./single-object.component.css']
})
export class SingleObjectComponent implements OnInit {

  WorkshopNid:number;
  CurrentObjectNid:number;
  CurrentObjectIndex:number;
  CurrentObject:any;
  ObjectsList:any[];
  IsLoading:boolean;


  constructor(
    private route: ActivatedRoute,
    private viewService:ViewService,
  ){

  }

  ngOnInit(){
    this.IsLoading = true;
    //getting workshop nid and current object nid
    this.CurrentObjectNid = this.route.params['_value'].nid;
    this.WorkshopNid = this.route.params['_value'].workshopID;
    this.GetWorkshopObjects();
  }

  GetWorkshopObjects(){
    
    this.viewService.getView('workshop-objects-list', [['nid', this.WorkshopNid]]).subscribe(data => {
      data.forEach((object,index)=>{
        if(object.nid == this.CurrentObjectNid){
          this.CurrentObjectIndex = index;
          return;
        }
      });
      this.ObjectsList = data;
    },err=>{console.log(err)
    },()=>{
      this.GetObjectDetailsById();
    });
  }

  GetObjectDetailsById(){
    this.viewService.getView('learning-object', [['nid', this.CurrentObjectNid]]).subscribe((LearningObject)=>{
      this.CurrentObject = LearningObject[0];
       console.log(this.CurrentObject);
    },err=>{console.log(err)
    },()=>{
      this.IsLoading = false;
    });
  }

  GoToIndex(NewIndex){
    delete this.CurrentObject;
    this.CurrentObjectNid = this.ObjectsList[NewIndex].nid;
    this.CurrentObjectIndex = NewIndex;
    this.GetObjectDetailsById();
  }


  // objects;
  // lessons

  // nid;

  // uid;
  // page: number = 1;
  // links = [];
  // sanitizethis;

  // epubFile = false;
  // objectId;
  // myObject;

  // singleObject;
  // pdflink = null;
  // booklink = null;
  // videolink = null;
  // epubLink = null;

  // workshopNid;
  // objectsList = [];
  // currentIndex: number;
  // totalIndex: number;

  // @Input() ObjectInfo;
  // constructor(
  //   private router: Router,
  //   private route: ActivatedRoute,
  //   private sanitizer: DomSanitizer,
  //   private http: Http,
  //   private viewService: ViewService,

  // ) { }

  // ngOnInit() {
  //   this.objectId = this.route.params['_value'].nid;
  //   this.workshopNid = this.route.params['_value'].workshopID;
  //   this.getObject(this.objectId);
  // }

  // getObject(id) {
  //   this.viewService.getView('learning-object', [['nid', id]])
  //     .subscribe(data => {

  //       // navigation section
  //       this.getNavigation();
  //       this.singleObject = {};
  //       this.singleObject = data[0];
  //       //  console.log(this.singleObject);


  //       if (this.singleObject.video && this.singleObject.video !== '') {
  //         //  console.log(this.singleObject.video)
  //         //  this.epubFile = null;
  //         // this.videolink.reset();
  //         // this.booklink = null;
  //         // this.pdflink = null;
  //         // this.videolink = null;
  //         // this.epubLink = null;
           
  //          this.epubFile = null;
  //         delete this.booklink;
  //         delete this.pdflink;
  //         delete this.videolink;
  //         delete this.epubLink;


  //         if (this.youtube_parser(this.singleObject.video)) {
  //           // this.booklink = null;
  //           // this.pdflink = null;
  //           // this.videolink = null;
  //           // this.epubLink = null;
  //           // this.epubFile = null;
  //           // delete this.booklink;
  //           // delete this.pdflink;
  //           // delete this.videolink;
  //           // delete this.epubLink;


  //           this.sanitizethis = '<iframe src="https://www.youtube.com/embed/' + this.youtube_parser(this.singleObject.video) + '"frameborder="0" style="width:100%; height:270px;"></iframe>';
  //           this.videolink = this.sanitizer.bypassSecurityTrustHtml(this.sanitizethis);
  //           // console.log(this.videolink).
  //           this.epubFile = null;

  //         }
  //         else if (this.vimeo_parser(this.singleObject.video)) {
  //           //  delete this.epubLink;
  //           // this.booklink = null;
  //           // this.pdflink = null;
  //           // this.videolink = null;
  //           // this.epubLink = null;
  //           // this.epubFile = null;

  //           // delete this.booklink;
  //           // delete this.pdflink;
  //           // delete this.videolink;
  //           // delete this.epubLink;

  //           this.sanitizethis = "https://vimeo.com/api/oembed.json?url=" + this.singleObject.video;
  //           this.http.get(this.sanitizethis).map(res => res.json()).subscribe(data => {
  //             this.videolink = this.sanitizer.bypassSecurityTrustHtml(data.html);
  //             //  this.epubFile = null;

  //           });
  //         }
  //       }
  //       if (this.singleObject.pdf && this.singleObject.pdf !== '') {
  //         //  console.log(this.singleObject.pdf)
  //         // this.pdflink = null;
  //         // this.epubFile = null;
  //         // this.booklink = null;
  //         // this.pdflink = null;
  //         // this.videolink = null;
  //         // this.epubLink = null;

  //         delete this.booklink;
  //         delete this.pdflink;
  //         delete this.videolink;
  //         delete this.epubLink;
  //         this.epubFile = null;


  //         this.sanitizethis = '<iframe src="http://docs.google.com/gview?url=' + this.singleObject.pdf + '&embedded=true" frameborder="0" style="width:100%; height:750px;"></iframe>';
  //         this.pdflink = this.sanitizer.bypassSecurityTrustHtml(this.sanitizethis);
  //       }
  //       else if (this.singleObject.book && this.singleObject.book !== '') {
  //         // delete this.epubLink;
  //         //  this.epubLink = null;
  //         //  this.epubFile = null;
             
  //           delete this.booklink;
  //           delete this.pdflink;
  //           delete this.videolink;
  //           delete this.epubLink;

  //         if (this.singleObject.book.endsWith('.epub')) {

  //           this.epubFile = true;
           
  //           // delete this.booklink;
  //           // delete this.pdflink;
  //           // delete this.videolink;
  //           // delete this.epubLink;

  //           this.epubLink = this.singleObject.book;

  //           // console.log(this.epubLink);
  //         } else {
  //           // console.log(this.singleObject.book);

  //           // delete this.booklink;
  //           // delete this.pdflink;
  //           // delete this.videolink;
  //           // delete this.epubLink;

  //           var x = this.singleObject.book.split('.').pop();

  //           this.sanitizethis = '<iframe src="https://docs.google.com/viewer?url=' + this.singleObject.book + '&embedded=true" frameborder="0" style="width:100%; height:750px;"></iframe>';
  //           this.booklink = this.sanitizer.bypassSecurityTrustHtml(this.sanitizethis);
  //           // console.log(this.booklink);
  //         }
  //       }


  //     });
  // }

  // youtube_parser(url) {
  //   var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  //   var match = url.match(regExp);
  //   return (match && match[7].length == 11) ? match[7] : '';
  // }
  // vimeo_parser(url) {
  //   var regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
  //   var match = url.match(regExp);
  //   return match[5];

  // }


  // getNavigation() {
  //   this.viewService.getView('workshop-objects-list', [['nid', this.workshopNid]]).subscribe(data => {
  //     this.totalIndex = data.length - 1;
  //     var objectId = this.objectId;
  //     var currentIndex = 0;

  //     //  this.booklink.reset();
  //     //  this.pdflink.reset();
  //     //  this.videolink.reset();


  //     // this.epubLink = null;
  //     // this.booklink = null;
  //     // this.pdflink = null;
  //     // this.videolink = null;

  //     this.objectsList = data;
  //     this.objectsList.forEach(function (item, index) {
  //       if (objectId == item.nid) {
  //         currentIndex = index;
  //       }
  //     });
  //     this.currentIndex = currentIndex;
  //   });
  // }

  // goPrev() {
  //   let nextObject = this.objectsList[this.currentIndex - 1];
  //   let nextNid = nextObject.nid;

  //   this.currentIndex--;
  //   this.router.navigate(['/workshops/lessons', this.workshopNid, nextNid]);
  //   this.getObject(nextNid);
  // }

  // goNext() {
  //   let nextObject = this.objectsList[this.currentIndex + 1];
  //   // this.epubLink = null;
  //   //   this.booklink = null;
  //   //    this.pdflink = null;
  //   //     this.videolink = null;
  //   this.currentIndex++;
  //   let nextNid = nextObject.nid;
  //   this.router.navigate(['/workshops/lessons', this.workshopNid, nextNid]);
  //   this.getObject(nextNid);
  // }
}
