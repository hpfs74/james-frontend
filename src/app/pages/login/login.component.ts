import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { CXEmailValidator } from '../../../../node_modules/@cx/form';
import { AuthService } from './../../services/auth.service';

/**
 * Login page that gets rendered in AppComponent if not logged in
 *
 * @export
 * @class LoginComponent
 */
@Component({
  selector: 'ki-login',
  template: `
    <div class="container">
      <div class="row">
        <div class="header-welcome">

        </div>
      </div>

      <form [formGroup]="loginForm" (submit)="login($event)">
        <div class="row">
          <div class="col-md-6 offset-md-3">
              <cx-form-group [formControlName]="formGroupConfig[0].formControlName"
                [options]="formGroupConfig[0]"></cx-form-group>

              <cx-form-group [formControlName]="formGroupConfig[1].formControlName"
                [options]="formGroupConfig[1]"></cx-form-group>

                <button class="cx-button ki-btn-primary fullwidth">Inloggen</button>
          </div>
        </div>
          <div class="row">
          <div class="col-md-6 offset-md-3">
            <p class="login-info text-center"><a href="">Wachtwoord vergeten?</a></p>
          </div>
        </div>
        </form>
    </div>
  `
})
export class LoginComponent {
  formBuilder: FormBuilder;
  loginForm: FormGroup;
  formGroupConfig = [];

  //@Output()login$: EventEmitter = new EventEmitter();

  constructor() {
    this.formBuilder = new FormBuilder();
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose(
        [Validators.required, CXEmailValidator]
      )],
      password: ['', Validators.compose(
        [Validators.required, Validators.minLength(8)]
      )],
    });

    this.formGroupConfig = [
      {
        formControlName: 'email',
        label: 'E-mailadres',
        formControl: this.loginForm.get('email'),
        inputOptions: {
          placeholder: 'voorbeeld@mail.com'
        }
      },
      {
        formControlName: 'password',
        label: 'Wachtwoord',
        formControl: this.loginForm.get('password'),
        inputOptions: {
          placeholder: ''
        }
      }
    ];
  }

  login(event) {
    if (this.loginForm.valid) {
      console.log('login!');
    }
    return;
  }
}
