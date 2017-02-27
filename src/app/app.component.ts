import { Component, OnInit } from '@angular/core';

import { FeatureService, NavigationService, InsuranceService } from './shared';
import { Price, Nav, Feature } from './models';

@Component({
  selector: 'ki-app',
  templateUrl: 'app.component.html',
  providers: [ FeatureService, NavigationService, InsuranceService ]
})
export class AppComponent implements OnInit {
  name = 'Angular';
  prices: Array<Price>;
  topMenu: Array<Nav>;
  features: Array<Feature>;

  constructor(private featureService:FeatureService,
              private navigationService:NavigationService,
              private insuranceService:InsuranceService ) {

  }

  ngOnInit() {
    this.prices = this.insuranceService.getPrices();
    this.topMenu = this.navigationService.getMenu();
    this.features = this.featureService.getFeatures();
  }
}
