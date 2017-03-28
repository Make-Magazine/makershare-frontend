declare var ePub: any;
import { Component, OnInit, Input } from '@angular/core';
import { ViewService } from '../../../d7services/view/view.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  author: {};
  objects;
  sanitizethis;
  popupPreview;
  epubFile= false;

  constructor(   
    private viewService: ViewService,
    
    ) {}

@Input() link;
  ngOnInit() {
    // console.log(this.link)
    this.showBook();
  }
   book: any
  showBook() {
      delete this.popupPreview;
      this.epubFile = true;
      this.book = ePub(this.link, { fixedLayout: true, height: false,spreads: false });
      this.book.renderTo('bookReader');
      this.book.getMetadata().then(function(meta){
       });
  }

  prevPage() {
      this.book.prevPage();
  }

  nextPage() {
      this.book.nextPage();
  }
}
