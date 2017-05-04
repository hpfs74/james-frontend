import { Injectable, EventEmitter } from '@angular/core';
import {
  Http, Headers, RequestOptions, RequestOptionsArgs,
  Response, RequestMethod, Request, Connection, ConnectionBackend
} from '@angular/http';
import { Observable } from 'rxjs/Observable';

export enum Action { QueryStart, QueryStop };

const TOKEN_NAME: string = 'access_token';

@Injectable()
export class AuthHttp {
  process: EventEmitter<any> = new EventEmitter<any>();
  authFailed: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: Http) { }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(RequestMethod.Get, url, null, options);
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(RequestMethod.Post, url, body, options);
  }

  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(RequestMethod.Put, url, body, options);
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(RequestMethod.Delete, url, null, options);
  }

  public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(RequestMethod.Patch, url, body, options);
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(RequestMethod.Head, url, null, options);
  }

  private request(method: RequestMethod, url: string, body?: any, options?: RequestOptionsArgs): Observable<Response> {
    let requestOptions = new RequestOptions(Object.assign({
      method: method,
      url: url,
      body: body
    }, options));

    if (!requestOptions.headers) {
      requestOptions.headers = new Headers();
    }

    requestOptions.headers.set('Content-Type', 'application/json');
    requestOptions.headers.set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME));
    requestOptions.headers.set('Cache-Control', 'no-cache');

    return Observable.create((observer) => {
      this.process.next(Action.QueryStart);
      this.http.request(new Request(requestOptions))
        .map(res => res.json())
        .finally(() => {
          this.process.next(Action.QueryStop);
        })
        .subscribe(
        (res) => {
          observer.next(res);
          observer.complete();
        },
        (err) => {
          switch (err.status) {
            case 401:
              //intercept 401
              this.authFailed.next(err);
              observer.error(err);
              break;
            default:
              observer.error(err);
              break;
          }
        });
    });
  }
}
