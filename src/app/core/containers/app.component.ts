import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
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
import { ContentService } from '../../core/services/content.service';
import { NavigationService } from '../services';

@Component({
  selector: 'knx-app',
  template: `
    <header class="header" *ngIf="loggedIn$ | async">
      <knx-navbar [menuItems]="topMenu" (onLogOut)="logOut()">
        <knx-opening-hours></knx-opening-hours>
        <knx-nav-user [showAccount]="false" (onLogOut)="logOut()" [profile]="profile$ | async"></knx-nav-user>
      </knx-navbar>
    </header>

    <div class="main-container" knxSidePanelState>
      <knx-loader *shellRender></knx-loader>
      <router-outlet></router-outlet>
    </div>

    <!-- footer is a features block -->
    <div *ngIf="loggedIn$ | async" class="container-fluid knx-container--fullwidth knx-container--gray">
      <knx-features [items]="footerItems"></knx-features>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  loginModalName = 'loginModal';

  topMenu: Array<Nav>;
  phone: Object;
  footerItems: Array<Feature>;

  loggedIn$: Observable<boolean>;
  loading$: Observable<boolean>;
  profile$: Observable<Profile>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private store$: Store<fromRoot.State>,
    private navigationService: NavigationService,
    private contentService: ContentService,
    private userDialogService: UserDialogService) {
  }

  ngOnInit() {
    this.loggedIn$ = this.store$.select(fromAuth.getLoggedIn);
    this.topMenu = this.navigationService.getMenu();
    this.footerItems = this.contentService.getContentObject().layout.footer;
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
        if (!loaded) {
          this.store$.dispatch(new profile.LoadAction());
        }
      });
  }

  logOut() {
    this.store$.dispatch(new auth.Logout);
  }
}
