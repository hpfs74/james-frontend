import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { LoaderState } from './loader';

@Injectable()

export class LoaderService {
  /* tslint:disable */
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();
  /* tslint:enable */

  public show() {
    this.loaderSubject.next(<LoaderState>{ show: true });
  }

  public hide() {
    this.loaderSubject.next(<LoaderState>{ show: false });
  }
}
