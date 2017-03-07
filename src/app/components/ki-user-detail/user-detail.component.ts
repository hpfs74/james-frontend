import { Component, Input } from '@angular/core';

@Component({
  selector: 'ki-user-detail',
  template: `
    <div class="ki-user-detail">
      <button *ngIf="!isLoggedIn" class="cx-button cx-button--link"><span class="icon fa fa-user"></span> Inloggen</button>
      <button *ngIf="isLoggedIn" class="cx-button cx-button--link"><span class="icon fa fa-user"></span> Uitloggen</button>
    </div>
  `
})
export class UserDetailComponent {
  @Input() isLoggedIn: boolean = false;
}
