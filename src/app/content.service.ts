import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../environments/environment';

@Injectable()
export class ContentService {
  private response: any;

  constructor(private http: Http) {}

  /**
   * Load data and store locally
   * @param url URL of the http request
   */
  public getData(url: string) {
    this.getDataFromEndPoint(url)
      .subscribe((data) => this.response = data);
  }

  public getDataFromEndPoint(url: string): any {
    return this.http.request(url)
      .map(res => res.json());
  }
}
