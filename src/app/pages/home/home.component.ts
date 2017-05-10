import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Price, Nav, Feature, User } from '../../models';
import { AuthService, FeatureService, NavigationService, InsuranceService, CookieService, ContentService } from '../../services';

@Component({
  template: `
  <knx-cookiebar></knx-cookiebar>
  <header class="header">
    <knx-navbar [menuItems]="topMenu">
        <knx-user-detail [isLoggedIn]="isLoggedIn" (signOut)="signOut()" [profile]="profile"></knx-user-detail>
    </knx-navbar>
  </header>

  <div class="container-fluid knx-container--fullwidth">
    <knx-breadcrumb></knx-breadcrumb>
  </div>

  <div class="main-container">
    <knx-loader [visible]="isLoading"></knx-loader>
    <router-outlet></router-outlet>
  </div>

  <!-- footer is a features block -->
  <knx-features [items]="footerItems"></knx-features>
  `
})
export class HomeComponent implements OnInit {
  isLoading: boolean = true;
  isLoggedIn: boolean = false;
  coverages: Array<Price>;
  topMenu: Array<Nav>;
  phone: Object;
  footerItems: Array<Feature>;
  profile: User;

  constructor(
    private router: Router,
    private authService: AuthService,
    private contentService: ContentService,
    private navigationService: NavigationService,
    private insuranceService: InsuranceService,
    private featureService: FeatureService) {
  }

  ngOnInit() {
    this.topMenu = this.navigationService.getMenu();
    this.footerItems = this.featureService.getFeatures();
    this.isLoading = false;
    this.isLoggedIn = this.authService.isLoggedIn();

    this.authService.getUserProfile()
      .subscribe( (user) => {
        this.profile = user;
      }, (res) => {
        if (res.status === 403) {
          this.router.navigate(['/login']);
        }
        throw new Error(res);
      });
  }

  signOut() {
    this.authService.signOff();
    this.router.navigate(['']);
  }
}
