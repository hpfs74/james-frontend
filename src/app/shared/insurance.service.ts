import { Injectable } from '@angular/core';
import { Price } from '../models';

@Injectable()
export class InsuranceService {

  getPrices(): Array<Price> {
    return [
      { header: 'WA', price: 18.90, features: ['Feat1', 'Feat2'] },
      { header: 'WA + Casco', price: 22.90, features: ['Feat1', 'Feat2', 'Feat3'], highlight: true },
      { header: 'WA limited', price: 30.19, features: ['Feat1', 'Feat2', 'Feat3', 'Feat4', 'Feat5'] },
    ];
  }
}
