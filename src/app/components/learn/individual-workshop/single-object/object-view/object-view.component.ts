import { Component, OnInit,Input } from '@angular/core';
import { ViewService } from '../../../../../d7services/view/view.service';
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
    if(this.type == 'Video'){
      this.GetVideoIframeStructure();
    }else if(this.type == 'Book' && !this.CurrentObject.book.endsWith('epub', this.CurrentObject.book.length)){
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
     let pdfHtml =  '<iframe src="http://docs.google.com/gview?url=' + this.CurrentObject.pdf + '&embedded=true" frameborder="0" style="width:100%; height:750px;"></iframe>';
     this.PDFLink = this.sanitizer.bypassSecurityTrustHtml(pdfHtml);
   }
    // this.IframeSantinizedHtml = this.sanitizer.bypassSecurityTrustHtml(Html);
  }

  GetVideoIframeStructure(){
    if(this.CurrentObject.video.indexOf('youtube') != -1){
      let VideoId = this.youtube_parser(this.CurrentObject.video);
      let Html = '<iframe src="https://www.youtube.com/embed/' + VideoId + ' "frameborder="0" style="width:100%; height:270px;"></iframe>';
      this.IframeSantinizedHtml = this.sanitizer.bypassSecurityTrustHtml(Html);
    }else{
      let url = "https://vimeo.com/api/oembed.json?url=" + this.CurrentObject.video;
      this.http.get(url).map(res => res.json()).subscribe(data => {
        this.IframeSantinizedHtml = this.sanitizer.bypassSecurityTrustHtml(data.html);
      });
    }
  }

  youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : '';
  }

}
