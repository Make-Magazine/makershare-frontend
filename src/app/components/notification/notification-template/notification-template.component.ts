import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'notification-tpl',
  templateUrl: './notification-template.component.html',
})


export class NotificationTemplateComponent implements OnInit {


  @Input() notification = {};

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    
  }


  goToProfile(path: string){
    // should redirect to profile
    this.router.navigate(['portfolio', 'abdulrahman-alhomsi']);
  }

  goToNode(nid: number, type: string){
    // should redirect to node page according to the type string
    // you need to create an array, keys as message type, values routing paths.
    // when you have the type, you can get the correct path, then route.
  }

}
