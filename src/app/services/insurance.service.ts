import { Injectable } from '@angular/core';
import { Price } from '../models';

@Injectable()
export class InsuranceService {

  getPrices(): Array<Price> {
    return [
      {
        header: 'WA',
        features: [
          'Schade door vandalisme',
          'Schade door eigen schuld'
        ],
        price: 18.50
      },
      {
        header: 'WA + Casco',
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
