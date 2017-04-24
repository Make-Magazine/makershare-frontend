import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../../d7services/view/view.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { BookComponent } from '../../book/book.component';
import { IndividualWorkshopComponent } from '../../individual-workshop/individual-workshop.component';



@Component({
  selector: 'app-single-object',
  templateUrl: './single-object.component.html',
  styleUrls: ['./single-object.component.css']
})
export class SingleObjectComponent implements OnInit {

  objects;
  lessons
  learns;
  nid;
  previewPdf;
  uid;
  page: number = 1;
  links = [];
  sanitizethis;
  popupPreview;
  epubFile = false;
  epubLink;
  utubelink;
  introlink = false;
  file;
  countlessons;
  objectId;
  myObject;
  videolink;
  singleObject;
  pdflink;
  booklink;
  workshopNid;
  objectsList = [];
  currentIndex: number;
  totalIndex: number;
  @Output() SwitchTab = new EventEmitter();
  @Input() ObjectInfo;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private http: Http,
    private viewService: ViewService,

  ) { }

  ngOnInit() {
    this.objectId = this.route.params['_value'].nid;
    this.workshopNid = this.route.params['_value'].workshopID;
    this.getObject(this.objectId);
      }

  getObject(id){
      this.viewService.getView('learning-object', [['nid', id]])
      .subscribe(data => {

        // navigation section
        this.getNavigation();
        this.singleObject = {};
        this.singleObject = data[0];
        //  console.log(this.singleObject);


        if (this.singleObject.video && this.singleObject.video !== '') {
          //  console.log(this.singleObject.video)
             this.epubFile = null;
          if (this.youtube_parser(this.singleObject.video)) {
            this.sanitizethis = '<iframe src="https://www.youtube.com/embed/' + this.youtube_parser(this.singleObject.video) + '"frameborder="0" style="width:100%; height:270px;"></iframe>';
            this.videolink = this.sanitizer.bypassSecurityTrustHtml(this.sanitizethis);
            // console.log(this.videolink).
             this.epubFile = null;

          }
          else if (this.vimeo_parser(this.singleObject.video)) {
             delete this.epubLink;
            this.sanitizethis = "https://vimeo.com/api/oembed.json?url=" + this.singleObject.video;
            this.http.get(this.sanitizethis).map(res => res.json()).subscribe(data => {
              this.videolink = this.sanitizer.bypassSecurityTrustHtml(data.html);
               this.epubFile = null;

            });
          }
        }
        if (this.singleObject.pdf && this.singleObject.pdf !== '') {
        //  console.log(this.singleObject.pdf)
         this.pdflink = null;
          this.epubFile = null;
          this.sanitizethis = '<iframe src="http://docs.google.com/gview?url=' + this.singleObject.pdf + '&embedded=true" frameborder="0" style="width:100%; height:750px;"></iframe>';
          this.pdflink = this.sanitizer.bypassSecurityTrustHtml(this.sanitizethis);
        }
        else if (this.singleObject.book && this.singleObject.book !== '') {
          delete this.epubLink;
           this.epubLink = null;
           this.epubFile = null;
          if (this.singleObject.book.endsWith('.epub')) {
             this.epubFile = true;
            this.epubLink = this.singleObject.book;
            
            // console.log(this.epubLink);
          } else {
            // console.log(this.singleObject.book);
            var x = this.singleObject.book.split('.').pop();
            delete this.popupPreview;
            this.epubFile = null;
            this.sanitizethis = '<iframe src="https://docs.google.com/viewer?url=' + this.singleObject.book + '&embedded=true" frameborder="0" style="width:100%; height:750px;"></iframe>';
            this.booklink = this.sanitizer.bypassSecurityTrustHtml(this.sanitizethis);
            // console.log(this.booklink);
          }
        }


      });    
  }

  youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : '';
  }
  vimeo_parser(url) {
    var regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
    var match = url.match(regExp);
    return match[5];

  }


  getNavigation() {
    this.viewService.getView('workshop-objects-list', [['nid', this.workshopNid]]).subscribe(data => {
      this.totalIndex = data.length - 1;
      var objectId = this.objectId;
      var currentIndex = 0;
     
      this.objectsList = data;
      this.objectsList.forEach(function (item, index) {
        if (objectId == item.nid) {
          currentIndex = index;
        }
      });
      this.currentIndex = currentIndex;
    });
  }

  goPrev() {
    let nextObject = this.objectsList[this.currentIndex - 1];
    let nextNid = nextObject.nid;
     this.epubLink = null;
      this.booklink = null;
       this.pdflink = null;
        this.videolink = null;
    this.currentIndex--;
    this.router.navigate(['/workshops/lessons', this.workshopNid, nextNid]);
    this.getObject(nextNid);
  }

  goNext() {
    let nextObject = this.objectsList[this.currentIndex + 1];
    this.epubLink = null;
      this.booklink = null;
       this.pdflink = null;
        this.videolink = null;
    this.currentIndex++;
    let nextNid = nextObject.nid;
    this.router.navigate(['/workshops/lessons', this.workshopNid, nextNid]);
    this.getObject(nextNid);
  }
}
