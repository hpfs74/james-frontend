import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { environment } from '@env/environment';

import * as fromRoot from '../../reducers';
import * as fromCore from '../reducers';
import * as fromAuth from '../../auth/reducers';
import * as fromProfile from '../../profile/reducers';

import * as profile from '../../profile/actions/profile';
import * as auth from '../../auth/actions/auth';
import * as router from '../../core/actions/router';

import { Nav } from '../models/nav';
import { Profile } from '../../profile/models';
import { UserDialogService } from '../../components/knx-modal/user-dialog.service';
import { LoginModalConfig, AuthRedirectModalConfig } from '../../core/models/modals';

import { NavigationService } from '../services';
import * as insurance from '../../insurance/actions/insurance';
import { ContentConfig, Content } from '../../content.config';

@Component({
  selector: 'knx-app',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit {
  modalNames = {
    loginModal: 'loginModal',
    authRedirect: 'authRedirectModal'
  };

  topMenu: Array<Nav>;
  phone: Object;
  featureToggleConfig: any;

  loggedIn$: Observable<boolean>;
  anonymous$: Observable<any>;
  loading$: Observable<boolean>;
  profile$: Observable<Profile>;
  route$: Observable<string>;
  animationState = 'closed';
  animationDone = false;
  content: Content;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private store$: Store<fromRoot.State>,
    private navigationService: NavigationService,
    private userDialogService: UserDialogService,
    private contentConfig: ContentConfig
  ) {
      this.content = contentConfig.getContent();
      this.featureToggleConfig = environment.featureToggles;
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

    this.store$.dispatch(new insurance.GetInsurances());
  }

  initModals() {
    this.store$
    .select(fromCore.getOpenedModalNameState)
    .subscribe(modalName => {
      let modal = null;

      // init the right type
      if (modalName === this.modalNames.loginModal) {
        modal = new LoginModalConfig(modalName, this.userDialogService, this.viewContainerRef);
      } else if (modalName === this.modalNames.authRedirect) {
        modal = new AuthRedirectModalConfig(modalName, this.userDialogService, this.viewContainerRef);
      }

      // internally use userDialogService to show the modal
      if (modal !== null) {
        modal.open();
      }
    });
  }

  toggleMenuOpen() {
    this.animationState = this.animationState === 'closed' ? 'open' : 'closed';
  }

  setMenuAnimationStatus(event: boolean) {
    this.animationDone = event;
  }

  goToLogin() {
    this.toggleMenuOpen();
    this.store$.dispatch(new auth.ResetStates());
    this.store$.dispatch(new router.Go({ path: ['/login'] }));
  }

  logOut() {
    this.toggleMenuOpen();
    this.store$.dispatch(new auth.Logout);
    this.store$.dispatch(new auth.ResetStates());
  }

  goToRegister() {
    this.toggleMenuOpen();
    this.store$.dispatch(new router.Go({ path: ['/register'] }));
  }
}
