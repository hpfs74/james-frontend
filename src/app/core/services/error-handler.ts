import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LoggingService } from './logging.service';
import { AuthHttpError } from '../../auth/services/auth-http.service';

import * as StackTrace from 'stacktrace-js';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private location: LocationStrategy, private loggingService: LoggingService) {}

  handleError(error) {
    const message = error.message ? error.message : error.toString();
    const url = location instanceof PathLocationStrategy
      ? this.location.path() : '';

    // get the stack trace, lets grab the last 10 stacks only
    if (!(error instanceof AuthHttpError)) {
      StackTrace.fromError(error).then(stackframes => {
        const stackString = stackframes
          .splice(0, 20)
          .map(function (sf) {
            return sf.toString();
          }).join('\n');

        // log somewhere external
        this.loggingService.log({ message, url, stack: stackString });
      });
    }
  }

}
