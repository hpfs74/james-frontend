import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';


@Component({
  selector: 'knx-user-detail',
  template: `
    <div class="knx-user-detail">
      <small *ngIf="profile">Hi {{ profile.firstName }}</small>
      <a href="#" *ngIf="isLoggedIn" (click)="logOut()">
        <span class="knx-icon-logout"></span> Uitloggen
      </a>
    </div>
  `
})
export class UserDetailComponent {
  @Input() profile: User;
  @Input() isLoggedIn: boolean = false;
  @Output() signOut = new EventEmitter();

  logOut() {
    this.signOut.emit();
  }
}
