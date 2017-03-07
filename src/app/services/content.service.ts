import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Feature } from '../models/feature';

@Injectable()
export class ContentService {
  private basePath: string = '/content/i18n/';
  private fileExtension: string = '.json';

  constructor(private http: Http) {
  }

  getTranslationJSON(filename: string): any {
    return this.http.get(this.basePath + filename + this.fileExtension)
      .map(res => res.json() || {})
      .catch(this.handleError);
  }

  getTranslationObject<T>(filename: string): Observable<T[]> {
    return this.http.get(this.basePath + filename + this.fileExtension)
      .map(res => res.json() as T[]);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
