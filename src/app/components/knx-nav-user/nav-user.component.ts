import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Profile } from '../../profile/models';
import * as fromRoot from '../../reducers';
import * as router from '../../core/actions/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'knx-nav-user',
  styleUrls: ['./nav-user.component.scss'],
  template: `
    <div class="knx-nav-user" *ngIf="profile" >
      <knx-dropdown>
        <knx-dropdown-button>
          <span class="knx-nav-user__icon knx-icon-user-o"></span> {{ profile?.firstname || 'Account' }}
        </knx-dropdown-button>

        <knx-dropdown-menu offset="0 -55">
          <knx-menu-item *ngIf="showAccount" (click)="goToProfile()">
            <span>Mijn account</span>
          </knx-menu-item>

          <div class='knx-menu-divider'></div>

          <knx-menu-item (click)="logOut()">
            <span class="knx-icon-sign-out"></span> Uitloggen
          </knx-menu-item>
        </knx-dropdown-menu>
      </knx-dropdown>
    </div>
  `
})
export class NavUserComponent {
  @Input() profile: Profile;
  @Input() showAccount: boolean;
  @Input() isLoggedIn = false;
  @Output() onLogOut = new EventEmitter();

  constructor(private store$: Store<fromRoot.State>) { }

  goToProfile() {
    this.store$.dispatch(new router.Go({ path: ['/profile-overview'] }));
  }

  getShortEmail(emailaddress: string) {
    return emailaddress ? emailaddress.substring(0, emailaddress.indexOf('@')) : '';
  }

  logOut() {
    this.onLogOut.emit();
  }
}
