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
  config: any;

  constructor(private http: Http, private defOpts?: RequestOptions) {
    this.config = {
      globalHeaders: [{ 'Content-Type': 'application/json' }]
    };
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({ body: '', method: RequestMethod.Get, url: url }, options);
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({ body: body, method: RequestMethod.Post, url: url }, options);
  }

  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({ body: body, method: RequestMethod.Put, url: url }, options);
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({ body: '', method: RequestMethod.Delete, url: url }, options);
  }

  public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({ body: body, method: RequestMethod.Patch, url: url }, options);
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({ body: '', method: RequestMethod.Head, url: url }, options);
  }

  public options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({ body: '', method: RequestMethod.Options, url: url }, options);
  }

  public requestWithToken(req: Request, token: string): Observable<Response> {
    //TODO: check expired check here
    //     return new Observable<Response>((obs: any) => {
    //       obs.error(new AuthHttpError('No JWT present or has expired'));
    //     });

    req.headers.set('Content-Type', 'application/json');
    req.headers.set('Authorization', 'Bearer ' + localStorage.getItem(TOKEN_NAME));
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
    if (!options.headers) {
      options.headers = new Headers();
    }

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
    return this.requestWithToken(req, token);
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
