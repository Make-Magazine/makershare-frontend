import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoaderComponentService {

  constructor() { }
    public LoaderComponentstatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    display(value: boolean) {
        this.LoaderComponentstatus.next(value);
    }
}
