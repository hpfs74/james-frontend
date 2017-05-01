import   { ConfigInterface } from './config.interface';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ConfigService {
  config: ConfigInterface;

  constructor(private http: Http) {
  }

  public getApiEndpoint() {
    // if the configuration is not loaded
    if (!(this.config && this.config.api)) {
      // retrieve configuration object


    }

    return this.config.api;
  }

  load(url: string) {
    console.log('Inside Load');
    return new Promise((resolve) => {
      this.http.get(url).map(res => res.json())
        .subscribe(config => {
          console.log('Configuration loaded...........');
          this.config = config;
          resolve();
        });
    });
  }
}
