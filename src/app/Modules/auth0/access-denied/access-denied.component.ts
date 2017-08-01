import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth.service';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
})
export class AccessDeniedComponent implements OnInit {

  constructor(
    public auth: Auth
  ) { }

  ngOnInit() {   

  }

}
