import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Profile } from '../../models/profile';

@Component({
  selector: 'knx-user-detail',
  template: `
    <div class="knx-user-detail" *ngIf="profile" >
      <knx-dropdown>
        <knx-dropdown-button>
          <span class="knx-icon-user"></span> {{ profile.firstname }}
        </knx-dropdown-button>
        <knx-dropdown-menu offset="40 0">
          <knx-menu-item (click)="goToProfile()">
            <span>Mijn profiel</span>
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
export class UserDetailComponent {
  @Input() profile: Profile;
  @Input() isLoggedIn: boolean = false;
  @Output() signOut = new EventEmitter();

  constructor(private router: Router) { }

  goToProfile(event) {
    this.router.navigate(['/profile']);
  }

  logOut() {
    this.signOut.emit();
  }
}
