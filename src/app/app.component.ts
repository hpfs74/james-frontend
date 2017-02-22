import { Component, OnInit } from '@angular/core';
import { Price } from './models/price.d';
import { Nav } from './models/nav.d';
import { Feature } from './models/feature.d';

@Component({
  selector: 'ki-app',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  name = 'Angular';
  prices: Array<Price>;
  topMenu: Array<Nav>;
  features: Array<Feature>;

  ngOnInit() {
    this.prices = [
      { header: 'WA', price: 18.90, features: ['Feat1', 'Feat2'] },
      { header: 'WA + Casco', price: 22.90, features: ['Feat1', 'Feat2', 'Feat3'], highlight: true },
      { header: 'WA limited', price: 30.19, features: ['Feat1', 'Feat2', 'Feat3', 'Feat4', 'Feat5'] },
    ];

    this.topMenu = [
      { id: 'menu-overview', title: 'Overzicht' },
      { id: 'menu-account', title: 'Mijn account' },
      { id: 'menu-faq', title: 'FAQ' },
      { id: 'menu-about', title: 'Over ons' },
    ];

    this.features = [
      { title: 'Gemak', description: 'Een digitaal overzicht van al je schadeverzekeringen van elke verzekeraar' },
      { title: 'Proactief', description: 'Altijd direct op de hoogte van de beste deals' },
      { title: 'Onafhankelijk', description: 'Alle vergelijkingen zijn onafhankelijk. Geen verzekeraar heeft voorrang' }
    ];
  }
}
