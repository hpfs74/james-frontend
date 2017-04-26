import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Price, Nav, Feature } from '../../models';
import { AuthService, FeatureService, NavigationService, InsuranceService, CookieService, ContentService } from '../../services';

@Component({
  template: `
  <knx-cookiebar></knx-cookiebar>
  <header class="header">
    <knx-navbar [menuItems]="topMenu" [phone]="phone">
        <knx-user-detail [isLoggedIn]="isLoggedIn" (signOut)="signOut()"></knx-user-detail>
    </knx-navbar>
  </header>

  <div class="container-fluid knx-container--fullwidth">
    <knx-breadcrumb></knx-breadcrumb>
  </div>

  <div class="container main-container">
    <knx-spinner [visible]="isLoading"></knx-spinner>
    <router-outlet></router-outlet>
  </div>

  <!-- footer is a features block -->
  <knx-features [items]="footerItems"></knx-features>
  `
})
export class HomeComponent implements OnInit {
  isLoading: boolean = true;
  isLoggedIn: boolean = false;
  prices: Array<Price>;
  topMenu: Array<Nav>;
  phone: Object;
  footerItems: Array<Feature>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private contentService: ContentService,
    private navigationService: NavigationService,
    private insuranceService: InsuranceService,
    private featureService: FeatureService) {
  }

  ngOnInit() {
    this.prices = this.insuranceService.getPrices();
    this.topMenu = this.navigationService.getMenu();
    this.phone = this.navigationService.getPhone();
    this.footerItems = this.featureService.getFeatures();
    this.isLoading = false;
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  signOut() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
