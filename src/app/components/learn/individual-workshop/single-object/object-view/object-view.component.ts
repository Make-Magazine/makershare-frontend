import { Component, OnInit,Input } from '@angular/core';
import { ViewService } from '../../../../../d7services';
import { Http } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-object-view',
  templateUrl: './object-view.component.html',
})
export class ObjectViewComponent implements OnInit {
  @Input('CurrentObject') CurrentObject:any;
  type:string;
  IframeSantinizedHtml;
  NotEpubLink;
  PDFLink;

  constructor(
    private viewService:ViewService,
    private http:Http,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit() {
    
    this.type = this.CurrentObject.learning_content_type;
    if(this.type == 'Book' && !this.CurrentObject.book.endsWith('epub', this.CurrentObject.book.length)){
      this.GetGoogleDocStructure();
    }
    else if (this.type == 'PDF') {
        this.GetGoogleDocStructure();
    }
  }

  GetGoogleDocStructure(){
   if(this.type == 'Book' && !this.CurrentObject.book.endsWith('epub', this.CurrentObject.book.length)){
     let bookHtml =  '<iframe src="https://docs.google.com/viewer?url=' + this.CurrentObject.book + '&embedded=true" frameborder="0" style="width:100%; height:750px;"></iframe>';
     this.NotEpubLink = this.sanitizer.bypassSecurityTrustHtml(bookHtml);
   }
   else if (this.type == 'PDF'){
     let pdfHtml =  '<iframe src="http://docs.google.com/gview?url=' + this.CurrentObject.pdf + '&embedded=true" frameborder="0" style="width:760px; height:750px;"></iframe>';
     this.PDFLink = this.sanitizer.bypassSecurityTrustHtml(pdfHtml);
   }
  }
}
