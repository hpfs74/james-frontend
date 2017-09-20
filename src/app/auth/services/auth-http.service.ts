import { Injectable, EventEmitter } from '@angular/core';
import {
  Http, Headers, RequestOptions, RequestOptionsArgs,
  Response, RequestMethod, Request, Connection, ConnectionBackend
} from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/retry';

import * as fromRoot from '../reducers';
import * as Auth from '../actions/auth';

import { tokenNotExpired } from '../../utils/auth.utils';
import { AuthService } from './auth.service';
import { AuthToken } from '../models/auth';
import { LocalStorageService } from '../../services/localstorage.service';
import { LoaderService } from '../../components/knx-app-loader/loader.service';
import * as AuthUtils from '../../utils/auth.utils';

export class AuthHttpError extends Error {}

@Injectable()
export class AuthHttp {
  config: any;

  constructor(private http: Http,
    private authService: AuthService,
    private loaderService: LoaderService,
    private localStorageService: LocalStorageService,
    private defOpts?: RequestOptions,
  ) {
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

  public requestWithToken(req: Request): Observable<Response> {
    if (!AuthUtils.tokenNotExpired('token')) {
      return new Observable<Response>((obs: any) => {
        obs.error(new AuthHttpError('No token present or has expired'));
      });
    } else {
      let token: string = this.localStorageService.getAccessToken();
      req.headers.set('Content-Type', 'application/json');
      req.headers.set('Authorization', 'Bearer ' + token);
      req.headers.set('Cache-Control', 'no-cache, no-store, max-age=0');
    }
    return this.http.request(req);
  }

  public setGlobalHeaders(headers: Array<Object>, request: Request | RequestOptionsArgs) {
    if (!request.headers) {
      request.headers = new Headers();
    }
    headers.forEach((header: Object) => {
      const key: string = Object.keys(header)[0];
      const headerValue: string = (header as any)[key];
      (request.headers as Headers).set(key, headerValue);
    });
  }

  public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    const req: Request = url as Request;
    return this.requestWithToken(req);
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
    this.showLoader();

    let options = new RequestOptions(requestArgs);
    if (additionalOptions) {
      options = options.merge(additionalOptions);
    }
    return this.request(new Request(this.mergeOptions(options, this.defOpts)))
      .finally(() => {
        this.hideLoader();
      });
  }

  private showLoader(): void {
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.loaderService.hide();
  }
}
