import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { environment } from '@env/environment';

import * as fromRoot from '@app/reducers';
import * as fromCore from '@app/core/reducers';
import * as fromAuth from '@app/auth/reducers';
import * as fromProfile from '@app/profile/reducers';

import * as profile from '@app/profile/actions/profile';
import * as auth from '@app/auth/actions/auth';
import * as assistant from '@app/core/actions/assistant';
import * as router from '@app/core/actions/router';

import { Nav } from '@app/core/models/nav';
import { Profile } from '@app/profile/models';
import { UserDialogService } from '@app/components/knx-modal/user-dialog.service';
import {
  LoginModalConfig,
  AuthRedirectModalAnonymousConfig,
  AuthRedirectModalConfig,
  DeleteModalConfig,
  EndOfTheLineHouseholdModal
} from '@app/core/models/modals';

import { NavigationService } from '@app/core/services';
import * as insurance from '@app/insurance/actions/insurance';
import { ContentConfig, Content } from '@app/content.config';
import { KNXFeatureToggleService } from '@knx/feature-toggle';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'knx-app',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit {
  modalNames = {
    loginModal: 'loginModal',
    authRedirect: 'authRedirectModal',
    deleteProfile: 'deleteProfileModal',
    householdEndOfTheLine: 'houseHoldEndOftheLineModal'
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
    private contentConfig: ContentConfig,
    public featureToggleService: KNXFeatureToggleService,
    translate: TranslateService) {
      this.content = contentConfig.getContent();
      this.featureToggleConfig = this.featureToggleService.featureToggleConfig;

      translate.setDefaultLang('nl');
      translate.use('nl');
      document.body.onclick = () => this.closeMenu();
      document.body.onload = () => this.closeMenu();
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
      } else if (modalName === this.modalNames.authRedirect && this.featureToggleConfig['enableBuyFlowEmail']) {
        modal = new AuthRedirectModalAnonymousConfig(modalName, this.userDialogService, this.viewContainerRef);
      } else if (modalName === this.modalNames.authRedirect) {
        modal = new AuthRedirectModalConfig(modalName, this.userDialogService, this.viewContainerRef);
      } else if (modalName === this.modalNames.deleteProfile) {
        modal = new DeleteModalConfig(modalName, this.userDialogService, this.viewContainerRef);
      } else if (modalName === this.modalNames.householdEndOfTheLine) {
        modal = new EndOfTheLineHouseholdModal(modalName, this.userDialogService, this.viewContainerRef);
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

  closeMenu() {
    if ( this.animationState === 'open' && this.animationDone ) {
      this.animationState = 'closed';
    }
  }

  setMenuAnimationStatus(event: boolean) {
    this.animationDone = event;
  }

  goToLogin() {
    this.toggleMenuOpen();
    this.store$.dispatch(new router.Go({ path: ['/login'] }));
  }

  logOut() {
    this.toggleMenuOpen();
    this.store$.dispatch(new auth.Logout());
  }

  goToRegister() {
    this.toggleMenuOpen();
    this.store$.dispatch(new router.Go({ path: ['/register'] }));
  }

  goToProfile() {
    this.toggleMenuOpen();
    this.store$.dispatch(new router.Go({ path: ['/profile-overview'] }));
  }

  goToPurchased() {
    this.toggleMenuOpen();
    this.store$.dispatch(new router.Go({path: ['/car/purchased']}));
  }

  handleMenuClick(event: string) {
    switch (event) {
      case 'login':
        this.goToLogin();
        break;
      case 'register':
        this.goToRegister();
        break;
      case 'dashboard':
        this.goToPurchased();
        break;
      case 'logout':
        this.logOut();
        break;
      case 'profile':
        this.goToProfile();
        break;
      case 'openMenu':
        this.toggleMenuOpen();
        break;
      default:
        this.goToLogin();
        break;
    }
  }
}
