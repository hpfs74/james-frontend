import { Injectable } from '@angular/core';

import { AuthHttp } from './auth-http.service';

import { Price } from '../models';

@Injectable()
export class InsuranceService {

  constructor(public authHttp: AuthHttp) {
  }
}
