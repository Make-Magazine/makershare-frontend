import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { SolrService } from '../../../../d7services/solr/solr.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  searchQuery: string = '';
  constructor(
    private router: Router,
    private solrService: SolrService,
  ) { }
  @Input() boxStatus: boolean;
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {
  }

  closeSearchBox() {
    this.notify.emit();
  }

  goSearch() {
    this.solrService.autocomplete(this.searchQuery).subscribe(res=>{


      if( this.router.url.indexOf('/search') >= 0){
        // in search page
          this.boxStatus = false;
          this.notify.emit();
          let navigationExtras: NavigationExtras = {
            queryParams: { 'query': encodeURIComponent(this.searchQuery) },
            // fragment: 'anchor'
          };
          this.router.navigate(['/search'], navigationExtras);        
      }else {

        // if(res.response.numFound == 0){
        //   // this.router.navigate(['/']);
        //   this.boxStatus = false;
        //   this.closeSearchBox();
        //   return;
        // }else {
            this.boxStatus = false;
            this.notify.emit();
            let navigationExtras: NavigationExtras = {
              queryParams: { 'query': encodeURIComponent(this.searchQuery) },
              // fragment: 'anchor'
            };
            this.router.navigate(['/search'], navigationExtras);
        // }

      }
    })
    
  }

  keyDownFunction(event) {
    if(event.keyCode == 13 && this.searchQuery.length > 0) {
      this.goSearch();
    }else if(event.keyCode == 13 && this.searchQuery.length == 0){
      this.closeSearchBox();
    }
  }
  clearSearch() {
    this.searchQuery = '';
  }

}
