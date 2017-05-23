import { Injectable } from '@angular/core';

import { Feature } from '../models/feature';

@Injectable()
export class FeatureService {

  getFeatures(): Array<Feature> {
    return [
      { title: 'Objectief', description: 'We vergelijken meer dan 40 aanbieders' },
      { title: 'Bespaar', description: 'Tot 15% korting op elke verzekering' },
      { title: 'Overstaphulp', description: 'Wij regelen je overstap' }
    ];
  }
}
