import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable()
export class LoggingService {

  constructor() { }

  log(payload: any) {
    // TODO: implement logging to API
    if (!environment.production) {
      console.warn('LOG: ', payload);
    }
  }
}
