import { ConfigInterface } from './config.interface';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ConfigService {
  config: ConfigInterface;

  constructor(private http: Http) {
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
