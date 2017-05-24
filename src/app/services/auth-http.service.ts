import { Injectable, EventEmitter } from '@angular/core';
import {
  Http, Headers, RequestOptions, RequestOptionsArgs,
  Response, RequestMethod, Request, Connection, ConnectionBackend
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from '../utils/auth.utils';
import { AuthService } from './auth.service';

export enum Action { QueryStart, QueryStop };

export const TOKEN_NAME: string = 'access_token';
export const TOKEN_OBJECT_NAME: string = 'token';

@Injectable()
export class AuthHttp {
  process: EventEmitter<any> = new EventEmitter<any>();
  authFailed: EventEmitter<any> = new EventEmitter<any>();
  config: any;

  constructor(private http: Http,
              private authService: AuthService,
              private defOpts?: RequestOptions, ) {

    this.config = {
      globalHeaders: [{'Content-Type': 'application/json'}]
    };
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({body: '', method: RequestMethod.Get, url: url}, options);
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({body: body, method: RequestMethod.Post, url: url}, options);
  }

  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({body: body, method: RequestMethod.Put, url: url}, options);
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({body: '', method: RequestMethod.Delete, url: url}, options);
  }

  public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({body: body, method: RequestMethod.Patch, url: url}, options);
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({body: '', method: RequestMethod.Head, url: url}, options);
  }

  public options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({body: '', method: RequestMethod.Options, url: url}, options);
  }

  public requestWithToken(req: Request, token: string): Observable<Response> {
    //TODO: check expired check here
    //     return new Observable<Response>((obs: any) => {
    //       obs.error(new AuthHttpError('No JWT present or has expired'));
    //     });
    req.headers.set('Content-Type', 'application/json');
    req.headers.set('Authorization', 'Bearer ' + token);
    req.headers.set('Cache-Control', 'no-cache');

    return this.http.request(req);
  }

  public setGlobalHeaders(headers: Array<Object>, request: Request | RequestOptionsArgs) {
    if (!request.headers) {
      request.headers = new Headers();
    }
    headers.forEach((header: Object) => {
      let key: string = Object.keys(header)[0];
      let headerValue: string = (header as any)[key];
      (request.headers as Headers).set(key, headerValue);
    });
  }

  public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    let req: Request = url as Request;
    let token: string = localStorage.getItem(TOKEN_NAME);

    if (!tokenNotExpired) {
      let tokenObject = JSON.parse(localStorage.getItem(TOKEN_OBJECT_NAME));
      this.authService.refreshToken(tokenObject.refresh_token)
        .flatMap( (data) => {

          // Update local storage
          token = data.access_token;
          localStorage.setItem(TOKEN_NAME, token);
          localStorage.setItem(TOKEN_OBJECT_NAME, JSON.stringify(data));

          return this.requestWithToken(req, token);
        });
    } else {
      return this.requestWithToken(req, token)
        .catch((error) => {
          // Try to get refresh token on not-authorized error
          if (error.status === 401 || error.status === 403) {
            let tokenObject = JSON.parse(localStorage.getItem(TOKEN_OBJECT_NAME));
            return this.authService.refreshToken(tokenObject.refresh_token)
              .flatMap((data) => {
                // Retry request with new token
                if (data) {
                  token = data.access_token;
                  return this.http.request(req, token);
                }
              });
          } else {
            Observable.throw(error);
          }
        });
    }
  }

  private mergeOptions(providedOpts: RequestOptionsArgs, defaultOpts?: RequestOptions) {
    let newOptions = defaultOpts || new RequestOptions();
    if (this.config.globalHeaders) {
      this.setGlobalHeaders(this.config.globalHeaders, providedOpts);
    }

    newOptions = newOptions.merge(new RequestOptions(providedOpts));

    return newOptions;
  }

  private requestHelper(requestArgs: RequestOptionsArgs, additionalOptions?: RequestOptionsArgs): Observable<Response> {
    let options = new RequestOptions(requestArgs);
    if (additionalOptions) {
      options = options.merge(additionalOptions);
    }
    return this.request(new Request(this.mergeOptions(options, this.defOpts)));
  }
}
