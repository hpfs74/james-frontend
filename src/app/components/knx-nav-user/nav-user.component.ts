import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Profile } from '../../profile/models';

@Component({
  selector: 'knx-nav-user',
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

  constructor(private router: Router) { }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  getShortEmail(emailaddress: string) {
    return emailaddress ? emailaddress.substring(0, emailaddress.indexOf('@')) : '';
  }

  logOut() {
    this.onLogOut.emit();
  }
}
