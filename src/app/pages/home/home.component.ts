import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import * as profile from '../../actions/profile';

import { Price, Nav, Feature, Profile } from '../../models';
import { ContentService } from '../../content.service';
import {
  AuthService,
  ProfileService,
  NavigationService,
  CookieService
} from '../../services';

@Component({
  selector: 'knx-home',
  template: `
    <knx-cookiebar></knx-cookiebar>
    <header class="header">
      <knx-navbar [menuItems]="topMenu" (onLogOut)="logOut()">
        <knx-opening-hours></knx-opening-hours>
        <knx-nav-user [isLoggedIn]="isLoggedIn" (onLogOut)="logOut()" [profile]="profile$ | async"></knx-nav-user>
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  coverages: Array<Price>;
  topMenu: Array<Nav>;
  phone: Object;
  footerItems: Array<Feature>;

  loading$: Observable<boolean>;
  profile$: Observable<Profile>;

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>,
    private authService: AuthService,
    private navigationService: NavigationService,
    private contentService: ContentService) {
  }

  ngOnInit() {
    this.topMenu = this.navigationService.getMenu();
    this.footerItems = this.contentService.getContentObject().layout.footer;

    this.isLoggedIn = this.authService.isLoggedIn();

    this.profile$ = this.store.select(fromRoot.getProfile);
    this.loading$ = this.store.select(fromRoot.getProfileLoading);
  }

  logOut() {
    this.authService.logout()
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
