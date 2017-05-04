
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class KnabBaseService {
  protected serviceError: boolean;
  protected serviceName : string;

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
