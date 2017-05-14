import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { SolrService } from '../../d7services/solr/solr.service';

@Component({
  selector: 'app-four04',
  templateUrl: './four04.component.html',
})
export class Four04Component implements OnInit {
  searchQuery: string = '';
  constructor(
    private router: Router,
    private solrService: SolrService,
  ) { }

  ngOnInit() {

  }
  goSearch() {
    this.solrService.autocomplete(this.searchQuery).subscribe(res=>{
      if(res.response.numFound == 0){
        // this.router.navigate(['/']);
        // this.boxStatus = false;
        // this.closeSearchBox();
        return;
      }else {
          // this.boxStatus = false;
          // this.notify.emit();
          let navigationExtras: NavigationExtras = {
            queryParams: { 'query': encodeURIComponent(this.searchQuery) },
            // fragment: 'anchor'
          };
          this.router.navigate(['/search'], navigationExtras);
      }
    })
    
  }

  keyDownFunction(event) {
    if(event.keyCode == 13 && this.searchQuery.length > 0) {
      this.goSearch();
    }else if(event.keyCode == 13 && this.searchQuery.length == 0){
      // this.closeSearchBox();
    }
  }
  clearSearch() {
    this.searchQuery = '';
  }

}
