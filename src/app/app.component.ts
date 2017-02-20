import { Component } from '@angular/core';
import { Price } from './models/price.d';


@Component({
  selector: 'knab-app',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  name = 'Angular';
  prices: Array<Price>;

  constructor() {
    this.prices = new Array<Price>();

    this.prices.push({ Header: 'WA', Price: 18.90, Features: ['Feat1', 'Feat2'], Highlight: false });

    this.prices.push({ Header: 'WA + Casco', Price: 22.90, Features: ['Feat1', 'Feat2', 'Feat3'], Highlight: true });

    this.prices.push({ Header: 'WA limited', Price: 30.19, Features: ['Feat1', 'Feat2', 'Feat3', 'Feat4', 'Feat5'], Highlight: false });
  }
}
