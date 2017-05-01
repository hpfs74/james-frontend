import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

import { Price } from '../models';

@Injectable()
export class InsuranceService {

  constructor(public authHttp: AuthHttp) {
  }

  getCoverages(): Array<Price> {
    return [
      {
        header: 'WA',
        badge: 'ons advies',
        features: [
          'Schade door vandalisme',
          'Schade door eigen schuld'
        ],
        price: 18.50
      },
      {
        header: 'WA + Casco',
        badge: 'ons advies',
        features: [
          'Brand en storm',
          'Ruitschade',
          'Schade door vandalisme',
          'Schade door eigen schuld'
        ],
        price: 21.59,
        highlight: true
      },
      {
        header: 'WA limited',
        badge: 'ons advies',
        features: [
          'Schade door anderen',
          'Diefstal',
          'Inbraak',
          'Brand en storm',
          'Ruitschade',
          'Schade door vandalisme',
          'Schade door eigen schuld'
        ],
        price: 30.19
      }
    ];
  }
}
