import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Price, Nav, Feature, Profile } from '../../models';
import {
  AuthService,
  ProfileService,
  FeatureService,
  NavigationService,
  CookieService,
  ContentService
} from '../../services';

@Component({
  template: `
    <knx-cookiebar></knx-cookiebar>
    <header class="header">
      <knx-navbar [menuItems]="topMenu" (onLogOut)="logOut()">
        <knx-opening-hours></knx-opening-hours>
        <knx-nav-user [isLoggedIn]="isLoggedIn" (onLogOut)="logOut()" [profile]="profile"></knx-nav-user>
      </knx-navbar>
    </header>

    <div class="main-container">
      <knx-loader *shellRender></knx-loader>
      <router-outlet></router-outlet>
    </div>

    <!-- footer is a features block -->
    <div class="container-fluid knx-container--fullwidth knx-container--gray">
      <knx-features [items]="footerItems"></knx-features>
    </div>
  `
})
export class HomeComponent implements OnInit {
  isLoading: boolean = true;
  isLoggedIn: boolean = false;
  coverages: Array<Price>;
  topMenu: Array<Nav>;
  phone: Object;
  footerItems: Array<Feature>;
  profile: Profile;

  constructor(
    private router: Router,
    private contentService: ContentService,
    private authService: AuthService,
    private profileService: ProfileService,
    private navigationService: NavigationService,
    private featureService: FeatureService) {
  }

  ngOnInit() {
    this.topMenu = this.navigationService.getMenu();
    this.footerItems = this.featureService.getFeatures();
    this.isLoading = false;
    this.isLoggedIn = this.authService.isLoggedIn();

    this.profileService.getUserProfile()
      .subscribe( (profile) => {
        this.profile = profile;
      }, (res) => {
        if (res.status === 403) {
          this.router.navigate(['/login']);
        }
        throw new Error(res);
      });
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
