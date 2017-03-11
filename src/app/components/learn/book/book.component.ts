declare var ePub: any;
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ViewService } from '../../../d7services/view/view.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  author: {};
  objects;
  sanitizethis
  popupPreview
  epubFile

  constructor(   
    private route: ActivatedRoute,
    private router: Router,
    private viewService: ViewService,
    private sanitizer :DomSanitizer,
    private http:Http,) {}

@Input() link;
  ngOnInit() {
    this.showBook();
    console.log(this.link)
  }

  book: any
  showBook() {

       this.book = ePub(this.link, { fixedLayout: true, height: false,spreads: false });
      // this.book = ePub('http://futurepress.github.io/epub.js/reader/#epubcfi(/6/260[xchapter_124]!4/2/2/2/1:0)', { fixedLayout: true, height: false,spreads: false });
      
      this.book.renderTo('bookReader');
      //this.author = this.book.getMetadata();
      this.book.getMetadata().then(function(meta){
          console.log(meta);  
      });
  }

  prevPage() {
      this.book.prevPage();
  }

  nextPage() {
      this.book.nextPage();
  }
// book: any
  
//   showBook(i){   
//    if(this.objects[i].book.endsWith('.epub'))
//    {
//       this.objects[i].book = ePub('assets/book/book2.epub', { fixedLayout: true, height: false,spreads: false });
      
//       this.objects[i].book.renderTo('bookReader');
//       this.sanitizethis = this.objects[i].book;
//       this.popupPreview = this.sanitizer.bypassSecurityTrustHtml (this.sanitizethis);
//       this.book.getMetadata().then(function(meta){
//           console.log(meta);  
//       });
//    }
//   }
}
