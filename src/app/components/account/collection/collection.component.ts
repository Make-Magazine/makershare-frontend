import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
})
export class CollectionComponent implements OnInit {
  activeTab;

  constructor() { }

  ngOnInit() {
    this.activeTab = 'project';
  }
  /* function to change tab*/
  changeChallangeTab(NewTab, e) {
    e.preventDefault();
    this.activeTab = NewTab;
  }
  /*  end function to change tab*/
}
