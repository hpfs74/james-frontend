import { Component, OnInit } from '@angular/core';

import { FeatureService } from './shared';
import { Price, Nav, Feature } from './models';

@Component({
  selector: 'ki-app',
  templateUrl: 'app.component.html',
  providers: [ FeatureService ]
})
export class AppComponent implements OnInit {
  name = 'Angular';
  prices: Array<Price>;
  topMenu: Array<Nav>;
  features: Array<Feature>;

  constructor(private featureService:FeatureService ) {

  }

  ngOnInit() {
    this.prices = [
      {header: 'WA', price: 18.90, features: ['Feat1', 'Feat2']},
      {header: 'WA + Casco', price: 22.90, features: ['Feat1', 'Feat2', 'Feat3'], highlight: true},
      {header: 'WA limited', price: 30.19, features: ['Feat1', 'Feat2', 'Feat3', 'Feat4', 'Feat5']},
    ];

    this.topMenu = [
      {id: 'menu-overview', title: 'Overzicht'},
      {id: 'menu-account', title: 'Mijn account'},
      {id: 'menu-faq', title: 'FAQ'},
      {id: 'menu-about', title: 'Over ons'},
    ];

    this.features = this.featureService.getFeatures();
  }
}
