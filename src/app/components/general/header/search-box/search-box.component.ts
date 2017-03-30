import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  searchQuery: string;
  constructor(
    private router: Router,
  ) { }
  @Input() boxStatus: boolean;
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {
  }

  closeSearchBox() {
    this.notify.emit();
  }

  goSearch() {
    this.boxStatus = false;
    this.notify.emit();
    let navigationExtras: NavigationExtras = {
      queryParams: { 'query': encodeURIComponent(this.searchQuery) },
      // fragment: 'anchor'
    };
    this.router.navigate(['/search'], navigationExtras);
  }

  keyDownFunction(event) {
    if(event.keyCode == 13) {
      this.goSearch();
    }
  }

}
