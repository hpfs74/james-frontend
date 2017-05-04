
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class KnabBaseService {
  protected serviceError: boolean;
  protected serviceName : string;

  constructor(private _http : Http) {

  }

  protected post(url, data) : Observable<any> {
    let headers = new Headers();
    headers.set('Content-type', 'application/json');
    headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

    return this._http.post(url, data, { headers })
      .map(res=>res.json());
  }

  /**
   * Generic Error handler
   * @param error
   * @returns {ErrorObservable}
   */
  protected handleError(parameters: { error: Response }) {
    let error = parameters.error;
    // in a real world app, we may send the error to some remote logging infrastructure
    // instead of just logging it to the console
    this.serviceError = true;
    return Observable.throw((error && error.json && error.json().error) || 'AIP:'+this.serviceName+':Server error');
  }
}
