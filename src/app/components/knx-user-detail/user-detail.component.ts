import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'knx-user-detail',
  template: `
    <div class="knx-user-detail">
<<<<<<< Updated upstream
      <a href="#" *ngIf="!isLoggedIn">
        <span class="knx-icon-user"></span> Inloggen
=======
      <a href="/login" *ngIf="!isLoggedIn">
        <span class="icon fa fa-user"></span> Inloggen
>>>>>>> Stashed changes
      </a>
      <a href="#" *ngIf="isLoggedIn" (click)="signOutAction()">
        <span class="knx-icon-user"></span> Uitloggen
      </a>
    </div>
  `
})
export class UserDetailComponent {
  @Input() isLoggedIn: boolean = false;
  @Output() signOut = new EventEmitter();

  signOutAction() {
    this.signOut.emit();
  }
}
