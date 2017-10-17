import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import * as fromCore from '../reducers';
import * as fromAuth from '../../auth/reducers';
import * as fromProfile from '../../profile/reducers';

import * as profile from '../../profile/actions/profile';
import * as auth from '../../auth/actions/auth';

import { Nav } from '../models/nav';
import { Feature } from '../../shared/models';
import { Profile } from '../../profile/models';
import { UserDialogService } from '../../components/knx-modal/user-dialog.service';
import { LoginModalComponent } from '../../auth/components/login-modal.component';
import { NavigationService } from '../services';

@Component({
  selector: 'knx-app',
  template: `
    <header class="header">
      <knx-navbar *ngIf="isVisible()" [menuItems]="topMenu" (onLogOut)="logOut()">
        <knx-opening-hours></knx-opening-hours>
        <knx-nav-user *ngIf="loggedIn$ | async" [showAccount]="false" (onLogOut)="logOut()" [profile]="profile$ | async"></knx-nav-user>
      </knx-navbar>
    </header>

    <div class="main-container" knxSidePanelState>
      <knx-loader *shellRender></knx-loader>
      <router-outlet></router-outlet>
    </div>

    <!-- footer is a features block -->
    <div *ngIf="isVisible()"  class="container-fluid knx-container--fullwidth knx-container--gray">
      <knx-features [items]="footerItems"></knx-features>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit {
  loginModalName = 'loginModal';

  topMenu: Array<Nav>;
  phone: Object;
  footerItems: Array<Feature>;

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
    this.footerItems = [
      {
        'title': 'Objectief',
        'description': 'We vergelijken meer dan 40 aanbieders'
      },
      {
        'title': 'Bespaar',
        'description': 'Tot 15% korting op elke verzekering'
      },
      {
        'title': 'Overstaphulp',
        'description': 'Wij regelen je overstap'
      }
    ];

    this.profile$ = this.store$.select(fromProfile.getProfile);
    this.loading$ = this.store$.select(fromProfile.getProfileLoading);

    this.store$
      .select(fromCore.getOpenedModalNameState)
      .subscribe(modalName => {
        if (modalName === this.loginModalName) {
          this.userDialogService.openModal(modalName, 'Sessie verlopen', this.viewContainerRef, LoginModalComponent, {
            fullwidthButtons: true
          });
        }
      });

    // Explicitly load profile if not loaded yet (on page refresh)
    this.store$.select(fromProfile.getProfileLoaded)
      .subscribe((loaded) => {
        if (!loaded && ! this.store$.select(fromAuth.getAnonymousState)) {
          this.store$.dispatch(new profile.LoadAction());
        }
      });
  }

  isVisible() {
    if (this.route$) {
      let shouldShow = true;

      this.route$.take(1)
        .subscribe(currentRoute => {
          shouldShow = (currentRoute !== '/login');
        });
      return shouldShow;
    }
  }

  logOut() {
    this.store$.dispatch(new auth.Logout);
  }
}
