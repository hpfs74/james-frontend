import { Injectable } from '@angular/core';

import { Feature } from '../models/feature';

@Injectable()
export class FeatureService {

  getFeatures(): Array<Feature> {
    return [
      { title: 'Gemak', description: 'Een digitaal overzicht van al je schadeverzekeringen van elke verzekeraar' },
      { title: 'Proactief', description: 'Altijd direct op de hoogte van de beste deals' },
      { title: 'Onafhankelijk', description: 'Alle vergelijkingen zijn onafhankelijk. Geen verzekeraar heeft voorrang' }
    ];
  }
}
