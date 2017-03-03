import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ContentService {
  private basePath: string = '/content/i18n/';

  constructor(private http: Http) {
  }

  public getFormConfig(filename: string): any {
    return this.http.get(this.basePath + filename + '.json')
      .map(res => res.json() || {})
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
