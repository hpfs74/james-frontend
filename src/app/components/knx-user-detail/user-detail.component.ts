import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'knx-user-detail',
  template: `
    <div class="knx-user-detail">
      <a href="#" *ngIf="isLoggedIn" (click)="logOut()">
        <span class="knx-icon-logout"></span> Uitloggen
      </a>
    </div>
  `
})
export class UserDetailComponent {
  @Input() isLoggedIn: boolean = false;
  @Output() signOut = new EventEmitter();

  logOut() {
    this.signOut.emit();
  }
}
