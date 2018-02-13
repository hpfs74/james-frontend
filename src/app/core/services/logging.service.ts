import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable()
export class LoggingService {

  constructor(private http: HttpClient) {
    /**
     * Sets the window.onerror to point to our logging system,
     * to handle page-level errors.
     */
    window.onerror = (error, url, line) => this.log({ error, line, url });
  }

  log(payload: any) {
    // TODO: implement logging to API

    if (payload && payload.stack) {
      payload.stack = payload.stack.split('\n');
    }

    // Fire and forget

    if (!environment.production) {
      console.warn('LOG: ', payload);
    } else {
      this.http.post(
        environment.james.loggingEndpoint,
        payload
      ).toPromise();

    }
  }
}
