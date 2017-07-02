import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserService } from '../../../d7services';

@Injectable()
export class ProfilePictureService {

    public url: BehaviorSubject<string> = new BehaviorSubject<string>('/assets/images/profile-default.png');

    constructor(
      private userService: UserService,
    ) {
      this.userService.getStatus().subscribe(status => {
        if(status.user.uid != 0){
          this.userService.getProfilePicture(status.user.uid).subscribe(picture => {
            this.url.next(picture);
          });
        }
      });
    }
    

    update(value: string) {
        this.url.next(value);
    }
}
