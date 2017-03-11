declare var ePub: any;
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  author: {};
  constructor() { }

  ngOnInit() {
    this.showBook();
  }

  book: any
  showBook() {
    //   this.book = ePub('assets/book/book2.epub', { fixedLayout: true, height: false,spreads: false });
      this.book = ePub('http://futurepress.github.io/epub.js', { fixedLayout: true, height: false,spreads: false });
      
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
