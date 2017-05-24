import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Profile } from '../../models/profile';

@Component({
  selector: 'knx-user-detail',
  template: `
    <div class="knx-user-detail" *ngIf="profile" >
      <span class="knx-icon-user"></span> {{ profile.firstname || 'Uitloggen' }}
      
    </div>
  `
})
export class UserDetailComponent {
  @Input() profile: Profile;
  @Input() isLoggedIn: boolean = false;
  @Output() signOut = new EventEmitter();

  logOut() {
    this.signOut.emit();
  }
}
