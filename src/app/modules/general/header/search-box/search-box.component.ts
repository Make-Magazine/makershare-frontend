import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SolrService } from '../../../../core/d7services/solr/solr.service';

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
    this.solrService.autocomplete(this.searchQuery).subscribe(res => {

      if (this.router.url.indexOf('/search') >= 0) {
        // if the current page is search page
        this.boxStatus = false;
        this.notify.emit();
        let navigationExtras: NavigationExtras = {
          queryParams: { 'query': encodeURIComponent(this.searchQuery) },
        };
        this.router.navigate(['/search'], navigationExtras);
      } else {
        this.boxStatus = false;
        this.notify.emit();
        let navigationExtras: NavigationExtras = {
          queryParams: { 'query': encodeURIComponent(this.searchQuery) },
        };
        this.router.navigate(['/search'], navigationExtras);

      }
    })

  }

  keyDownFunction(event) {
    if (event.keyCode == 13 && this.searchQuery.length > 0) {
      this.goSearch();
    } else if (event.keyCode == 13 && this.searchQuery.length == 0) {
      this.closeSearchBox();
    }
  }
  clearSearch() {
    this.searchQuery = '';
  }

}
