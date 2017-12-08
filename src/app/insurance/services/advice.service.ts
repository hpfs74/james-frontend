import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { AuthHttp } from '../../auth/services/auth-http.service';

@Injectable()
export class AdviceService {
  private baseUrl: string;
  private headers: Headers;

  constructor(private authHttp: AuthHttp) {
    this.baseUrl = environment.james.insuranceAdvice;
    this.headers = new Headers();

    this.headers.append('version', 'v2');
  }

  public getAdvice(adviceId: string): Observable<any> {
    const headers = this.headers;
    return this.authHttp.get(`${this.baseUrl}/${adviceId}`, { headers })
      .map(res => res.json());
  }

  public removeAdvice(adviceId: string): Observable<any> {
    const headers = this.headers;
    // TODO: remove hardcode
    return this.authHttp.delete(`${this.baseUrl}/${adviceId}`, { headers })
      .map(res => res.json());
  }
}
