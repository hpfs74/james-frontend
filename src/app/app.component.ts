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
      { Header: 'WA', Price: 18.90, Features: ['Feat1', 'Feat2'], Highlight: false },
      { Header: 'WA + Casco', Price: 22.90, Features: ['Feat1', 'Feat2', 'Feat3'], Highlight: true },
      { Header: 'WA limited', Price: 30.19, Features: ['Feat1', 'Feat2', 'Feat3', 'Feat4', 'Feat5'], Highlight: false },
    ];

    this.topMenu = [
      { Id: 'menu-overview', Title: 'Overzicht' },
      { Id: 'menu-account', Title: 'Mijn account' },
      { Id: 'menu-faq', Title: 'FAQ' },
      { Id: 'menu-about', Title: 'Over ons' },
    ];
  }
}
