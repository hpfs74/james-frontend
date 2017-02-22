import { Component } from '@angular/core';
import { Price } from './models/price.d';
import { Nav } from './models/nav.d';

@Component({
  selector: 'ki-app',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  name = 'Angular';
  prices: Array<Price>;
  topMenu: Array<Nav>;

  constructor() {
    this.prices = [
      {header: 'WA', price: 18.90, features: ['Feat1', 'Feat2']},
      { header: 'WA + Casco', price: 22.90, features: ['Feat1', 'Feat2', 'Feat3'], highlight: true },
      {header: 'WA limited', price: 30.19, features: ['Feat1', 'Feat2', 'Feat3', 'Feat4', 'Feat5']},
    ];

    this.topMenu = [
      { id: 'menu-overview', title: 'Overzicht' },
      { id: 'menu-account', title: 'Mijn account' },
      { id: 'menu-faq', title: 'FAQ' },
      { id: 'menu-about', title: 'Over ons' },
    ];
  }
}
