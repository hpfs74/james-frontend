import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Price, Nav, Feature } from '../../models';
import { AuthService, FeatureService, NavigationService, InsuranceService, CookieService, ContentService } from '../../services';

@Component({
  template: `
  <ki-cookiebar></ki-cookiebar>
  <header class="header">
    <ki-navbar [menuItems]="topMenu">
        <ki-user-detail [isLoggedIn]="isLoggedIn" (logOut)="logOut()"></ki-user-detail>
    </ki-navbar>
  </header>

  <div class="container-fluid container--fullwidth">
    <ki-breadcrumb></ki-breadcrumb>
  </div>

  <div class="container main-container">
    <ki-spinner [visible]="isLoading"></ki-spinner>
    <router-outlet></router-outlet>
  </div>

  <!-- footer is a features block -->
  <ki-features [items]="footerItems"></ki-features>
  `
})
export class HomeComponent implements OnInit {
  isLoading: boolean = true;
  isLoggedIn: boolean = false;
  prices: Array<Price>;
  topMenu: Array<Nav>;
  footerItems: Array<Feature>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private contentService: ContentService,
    private navigationService: NavigationService,
    private insuranceService: InsuranceService,
    private featureService: FeatureService) {
    console.log(this.router.url);
  }

  ngOnInit() {
    this.prices = this.insuranceService.getPrices();
    this.topMenu = this.navigationService.getMenu();
    this.footerItems = this.featureService.getFeatures();
    this.isLoading = false;
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
