import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'knx-user-detail',
  template: `
    <div class="knx-user-detail">
      <a href="#" *ngIf="!isLoggedIn">
        <span class="icon fa fa-user"></span> Inloggen
      </a>
      <a href="#" *ngIf="isLoggedIn" (click)="logout()">
        <span class="icon fa fa-user"></span> Uitloggen
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
