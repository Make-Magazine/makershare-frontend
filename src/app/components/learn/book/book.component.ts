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
  epubFile;

  constructor(   
    private viewService: ViewService,
    
    ) {}

@Input() link;
  ngOnInit() {
    this.showBook();
  }
   book: any
  showBook() {
      console.log(this.link);
      this.book = ePub(this.link, { fixedLayout: true, height: false,spreads: false });
      //this.book = ePub('assets/book.epub', { fixedLayout: true, height: false,spreads: false });
      
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
}
