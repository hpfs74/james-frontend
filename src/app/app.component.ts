import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { LoginComponent } from './pages/login/login.component';
import { AuthService, FeatureService, NavigationService, InsuranceService, CookieService, ContentService } from './services';
import { Price, Nav, Feature } from './models';

@Component({
  selector: 'ki-app',
  templateUrl: 'app.component.html',
  providers: [AuthService, FeatureService, NavigationService, InsuranceService, CookieService, ContentService],
  //changeDetection: ChangeDetectionStrategy.OnPush
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  prices: Array<Price>;
  topMenu: Array<Nav>;
  features: Array<Feature>;

  private isLoading: boolean = true;

  constructor(
    private contentService: ContentService,
    private authService: AuthService,
    private navigationService: NavigationService,
    private insuranceService: InsuranceService,
    private featureService: FeatureService) {
  }

  ngOnInit() {
    this.prices = this.insuranceService.getPrices();
    this.topMenu = this.navigationService.getMenu();
    this.features = this.featureService.getFeatures();

    this.isLoading = false;
  }

  isLoggedIn() {
    // for developing:
    return true;
    //return this.authService.isLoggedIn();
  }
}
