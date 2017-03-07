import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { FeatureService, NavigationService, InsuranceService, CookieService, ContentService } from './services';
import { Price, Nav, Feature } from './models';

@Component({
  selector: 'ki-app',
  templateUrl: 'app.component.html',
  providers: [FeatureService, NavigationService, InsuranceService, CookieService, ContentService],
  //changeDetection: ChangeDetectionStrategy.OnPush
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  isLoading: boolean = true;
  prices: Array<Price>;
  topMenu: Array<Nav>;
  features: Array<Feature>;

  constructor(
    private featureService: FeatureService,
    private navigationService: NavigationService,
    private insuranceService: InsuranceService) {
  }

  ngOnInit() {
    this.prices = this.insuranceService.getPrices();
    this.topMenu = this.navigationService.getMenu();
    this.features = this.featureService.getFeatures();

    this.isLoading = false;
  }
}
