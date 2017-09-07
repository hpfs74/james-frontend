import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import * as profile from '../../actions/profile';
import * as auth from '../../actions/auth';

import { Price, Nav, Feature, Profile } from '../../models';
import { UserDialogService } from '../../components/knx-modal/user-dialog.service';
import { LoginModalComponent } from '../login/login-modal.component';
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
    <header class="header">
      <knx-navbar [menuItems]="topMenu" (onLogOut)="logOut()">
        <knx-opening-hours></knx-opening-hours>
        <knx-nav-user (onLogOut)="logOut()" [profile]="profile$ | async"></knx-nav-user>
      </knx-navbar>
    </header>

    <div class="main-container" knxSidePanelState>
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
  loginModalName = 'loginModal';

  coverages: Array<Price>;
  topMenu: Array<Nav>;
  phone: Object;
  footerItems: Array<Feature>;

  loading$: Observable<boolean>;
  profile$: Observable<Profile>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private router: Router,
    private store$: Store<fromRoot.State>,
    private navigationService: NavigationService,
    private contentService: ContentService,
    private userDialogService: UserDialogService) {
  }

  ngOnInit() {
    this.topMenu = this.navigationService.getMenu();
    this.footerItems = this.contentService.getContentObject().layout.footer;
    this.profile$ = this.store$.select(fromRoot.getProfile);
    this.loading$ = this.store$.select(fromRoot.getProfileLoading);

    this.store$
      .select(fromRoot.getOpenedModalNameState)
      .subscribe(modalName => {
        if (modalName === this.loginModalName) {
          this.userDialogService.openModal(modalName, 'Sessie verlopen', this.viewContainerRef, LoginModalComponent, {
            fullwidthButtons: true
          });
        }
      });

    // Explicitly load profile if not loaded yet (on page refresh)
    this.store$.select(fromRoot.getProfileLoaded)
      .subscribe((loaded) => {
        if (!loaded) {
          this.store$.dispatch(new profile.LoadAction());
        }
      });
  }

  logOut() {
    this.store$.dispatch(new auth.Logout);
  }
}
