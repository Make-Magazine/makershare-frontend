import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-single',
  templateUrl: './single-notification.component.html',
  styleUrls: ['./single-notification.component.css']
})
export class SingleNotificationComponent implements OnInit {
  @Input('CurrentObject') CurrentObject:any;

  constructor() { }

  ngOnInit() {
  
}

}
