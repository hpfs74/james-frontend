import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'knx-user-detail',
  template: `
    <div class="knx-user-detail">
      <a href="#" *ngIf="!isLoggedIn">
        <span class="knx-icon-user"></span> Inloggen
      </a>
      <a href="#" *ngIf="isLoggedIn" (click)="logout()">
        <span class="knx-icon-user"></span> Uitloggen
      </a>
    </div>
  `
})
export class UserDetailComponent {
  @Input() isLoggedIn: boolean = false;
  @Output() logOut = new EventEmitter();

  logout() {
    this.logOut.emit();
  }
}
