import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';


@Component({
  selector: 'knx-user-detail',
  template: `
    <div class="knx-user-detail">
      <small>Hi User !</small>
      <a href="#" *ngIf="isLoggedIn" (click)="logOut()">
        <span class="knx-icon-logout"></span> Uitloggen
      </a>
    </div>
  `
})
export class UserDetailComponent implements OnInit {
  @Input() profile: User;
  @Input() isLoggedIn: boolean = false;
  @Output() signOut = new EventEmitter();

  constructor(private _auth : AuthService) {

  }

  ngOnInit() {
    this._auth.getCurrentProfile()
      .subscribe( (user) => {
        this.profile = user;
      }, (res) => {
        throw new Error(res);
      });
  }

  logOut() {
    this.signOut.emit();
  }
}
