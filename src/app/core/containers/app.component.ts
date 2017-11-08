import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { KNXModalDialogSettings } from '@knx/modal';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import * as fromCore from '../reducers';
import * as fromAuth from '../../auth/reducers';
import * as fromProfile from '../../profile/reducers';

import * as profile from '../../profile/actions/profile';
import * as auth from '../../auth/actions/auth';

import { Nav } from '../models/nav';
import { Profile } from '../../profile/models';
import { UserDialogService } from '../../components/knx-modal/user-dialog.service';
import { LoginModalComponent } from '../../auth/components/login-modal.component';
import { AuthRedirectModalComponent } from '../components/auth-redirect-modal.component';
import { NavigationService } from '../services';
import * as insurance from '../../insurance/actions/insurance';

@Component({
  selector: 'knx-app',
  template: `
    <header class="header">
      <knx-offline-indicator></knx-offline-indicator>

      <knx-navbar [menuItems]="topMenu" (onLogOut)="logOut()">
        <knx-opening-hours></knx-opening-hours>
        <knx-nav-user *ngIf="loggedIn$ | async" [showAccount]="false" (onLogOut)="logOut()" [profile]="profile$ | async"></knx-nav-user>
      </knx-navbar>
    </header>

    <div class="main-container" knxSidePanelState>
      <knx-loader *shellRender></knx-loader>
      <router-outlet></router-outlet>
    </div>

    <div class="container-fluid knx-container--fullwidth knx-container--gray">
      <knx-features>
        <knx-feature-item title="Objectief" description="We vergelijken meer dan 20 verzekeraars"></knx-feature-item>
        <knx-feature-item title="Bespaar" description="Krijg tot 15% korting op je autoverzekering"></knx-feature-item>
        <knx-feature-item title="Overstaphulp" description="Wij regelen je overstap"></knx-feature-item>
      </knx-features>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit {
  modalNames = {
    loginModal: 'loginModal',
    authRedirect: 'authRedirectModal'
  };

  topMenu: Array<Nav>;
  phone: Object;

  loggedIn$: Observable<boolean>;
  anonymous$: Observable<any>;
  loading$: Observable<boolean>;
  profile$: Observable<Profile>;
  route$: Observable<string>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private store$: Store<fromRoot.State>,
    private navigationService: NavigationService,
    private userDialogService: UserDialogService) {
  }

  ngAfterViewInit() {
    this.loggedIn$ = this.store$.select(fromAuth.getLoggedIn);
    this.anonymous$ = this.store$.select(fromAuth.getAnonymousState);
    this.route$ = this.store$.select(fromCore.getRouterUrl);
  }

  ngOnInit() {
    this.topMenu = this.navigationService.getMenu();

    this.profile$ = this.store$.select(fromProfile.getProfile);
    this.loading$ = this.store$.select(fromProfile.getProfileLoading);

    this.initModals();

    // Explicitly load profile if not loaded yet (on page refresh)
    this.store$.select(fromProfile.getProfileLoaded)
      .subscribe((loaded) => {
        if (!loaded) {
          this.store$.dispatch(new profile.LoadAction());
        }
      });

    this.store$.dispatch(new insurance.GetPurchasedCarInsurances());
  }

  initModals() {
    this.store$
    .select(fromCore.getOpenedModalNameState)
    .subscribe(modalName => {
      if (modalName === this.modalNames.loginModal) {
        const loginHeader = 'Sessie verlopen';
        const loginDialogSettings = {
          bodyClass: 'knx-modal-body',
          fullwidthButtons: true,
          header: true
        } as KNXModalDialogSettings;

        this.userDialogService.openModal(modalName, loginHeader, this.viewContainerRef, LoginModalComponent, loginDialogSettings);
      } else if (modalName === this.modalNames.authRedirect) {
        const userDialogSettings = {
          bodyClass: 'knx-modal-body knx-modal-body--blobs',
          fullwidthButtons: true,
          header: true,
          closeButton: true
        } as KNXModalDialogSettings;

        this.userDialogService.openModal(modalName, '', this.viewContainerRef, AuthRedirectModalComponent, userDialogSettings);
      }
    });
  }

  logOut() {
    this.store$.dispatch(new auth.Logout);
  }
}
