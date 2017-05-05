import { Injectable, EventEmitter } from '@angular/core';
import {
  Http, Headers, RequestOptions, RequestOptionsArgs,
  Response, RequestMethod, Request, Connection, ConnectionBackend
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from '../utils/auth.utils';
import { AuthService } from './auth.service';

export enum Action { QueryStart, QueryStop }
;

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
    // DONT USE: BROKEN
    // return Observable.create((observer) => {
    //   this.process.next(Action.QueryStart);
    //   this.http.request(new Request(requestOptions))
    //     .map(res => res.json())
    //     .finally(() => {
    //       this.process.next(Action.QueryStop);
    //     })
    //     .subscribe(
    //     (res) => {
    //       observer.next(res);
    //       observer.complete();
    //     },
    //     (err) => {
    //       switch (err.status) {
    //         case 401:
    //           //intercept 401
    //           this.authFailed.next(err);
    //           observer.error(err);
    //           break;
    //         default:
    //           observer.error(err);
    //           break;
    //       }
    //     });
    // });
    // from this point url is always an instance of Request;

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

      return this.requestWithToken(req, token);
        // .catch((error: Response) => {
        //
        //
        //   if (error.status === 401 || (error.status === 403 && error.json().error === 'invalid_access_token')) {
        //     //console.log('The authentication session expires or the user is not authorised. Force refresh of the current page.');
        //     //window.location.href = window.location.href + '?' + new Date().getMilliseconds();
        //   }
        //   return Observable.throw(error);
        // });
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
