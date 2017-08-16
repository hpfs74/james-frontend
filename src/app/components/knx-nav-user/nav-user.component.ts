import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Profile } from '../../models/profile';

@Component({
  selector: 'knx-nav-user',
  template: `
    <div class="knx-nav-user" *ngIf="profile" >
      <knx-dropdown>
        <knx-dropdown-button>
          <span class="knx-nav-user__icon knx-icon-user-o"></span> {{ profile?.firstname || profile?.emailaddress }}
        </knx-dropdown-button>
        <knx-dropdown-menu offset="0 -55">
          <knx-menu-item (click)="goToProfile()">
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
  @Input() isLoggedIn = false;
  @Output() onLogOut = new EventEmitter();


  constructor(private router: Router) { }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logOut() {
    this.onLogOut.emit();
  }
}
