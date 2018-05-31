import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { NotificationBarService, NotificationType } from 'ngx-notification-bar/release';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { filter } from 'rxjs/Operators';
import { UserService } from '../../core/d7services';
import { Singleton } from '../../core/models/application/singleton';
import { ProfilePictureService } from '../shared/profile-picture/profile-picture.service';

// src/app/auth/auth.service.ts


(window as any).global = window;

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'Ya3K0wmP182DRTexd1NdoeLolgXOlqO1',
    domain: 'makermedia.auth0.com',
    responseType: 'token id_token',
    audience: 'https://makermedia.auth0.com/userinfo',
    redirectUri: 'http://localhost:3000/callback',
    scope: 'openid'
  });

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

}