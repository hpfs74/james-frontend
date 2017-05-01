import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

import { Price } from '../models';

@Injectable()
export class InsuranceService {

  constructor(public authHttp: AuthHttp) {
  }
}
