import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { AuthHttp } from '../../auth/services/auth-http.service';

@Injectable()
export class AdviceService {
  private insuranceAdvice: string;
  private advice: string;
  private headers: Headers;

  constructor(private authHttp: AuthHttp) {
    this.insuranceAdvice = environment.james.insuranceAdvice;
    this.advice = environment.james.advice;
    this.headers = new Headers();

    this.headers.append('version', 'v2');
  }

  public getAdvice(adviceId: string): Observable<any> {
    const headers = this.headers;
    return this.authHttp.get(`${this.advice}/${adviceId}`, { headers })
      .map(res => res.json());
  }

  public saveAdvice(adviceData: string): Observable<any> {
    const headers = this.headers;
    return this.authHttp.post(`${this.insuranceAdvice}`, adviceData, { headers })
      .map(res => res.json());
  }

  public removeAdvice(adviceId: string): Observable<any> {
    const headers = this.headers;
    return this.authHttp.delete(`${this.insuranceAdvice}/${adviceId}`, { headers })
      .map(res => res.json());
  }
}
