import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, RouterLink, NavigationExtras } from '@angular/router';

import { CXEmailValidator } from '../../../../node_modules/@cx/form';
import { AuthService } from './../../services/auth.service';

/**
 * Login page that's rendered in router-outlet of 'AppComponent if not logged in
 *
 * @export
 * @class LoginComponent
 */
@Component({
  selector: 'knx-login',
  template: `
    <div class="container">
      <div class="row">
        <div class="knx-login__welcome">
        </div>
      </div>

      <form [formGroup]="loginForm" (ngSubmit)="login($event)">
        <div class="row">
          <div class="col-md-6 offset-md-3">
              <cx-form-group [formControlName]='formGroupConfig[0].formControlName'
                [options]="formGroupConfig[0]"></cx-form-group>

              <div class="login-password-wrapper">
                <cx-form-group [formControlName]="formGroupConfig[1].formControlName"
                  [options]="formGroupConfig[1]"></cx-form-group>
                <button *ngIf="loginForm.get('password').value"
                  class="btn-show-password knx-icon-eye"
                  [class.knx-icon-eye-slash]="showPassword"
                  [class.knx-icon-eye]="!showPassword"
                  (click)="togglePassword($event)"></button>
              </div>

              <button type="submit" class="knx-button knx-button--primary knx-button--fullwidth"
                [class.knx-button--pending]="isPending">
                Inloggen</button>
          </div>
        </div>
          <div class="row">
          <div class="col-md-6 offset-md-3">
            <div class="cx-message cx-message--error" *ngIf="submitted && loginForm.valid && message">
                <div class="cx-message__header">{{ messageTitle }}</div>
                <div class="cx-message__content">{{ message }}
                </div>
            </div>
            <p class="knx-login__reset knx-text-center">
              <small><a rel="nofollow" href="/forgot-password">Wachtwoord vergeten?</a></small>
            </p>
          </div>
        </div>
        </form>
    </div>
  `
})
export class LoginComponent {
  submitted: boolean = false;
  isPending: boolean = false;
  showPassword: boolean = false;
  formBuilder: FormBuilder;
  loginForm: FormGroup;
  validationErrors: any;
  messageTitle: string;
  message: string;
  formGroupConfig = [];

  constructor(private router: Router, private authService: AuthService) {
    this.initForm();
  }

  initForm() {
    this.validationErrors = {
      required: () => 'Dit veld is verplicht'
    };

    this.formBuilder = new FormBuilder();
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.compose(
        [Validators.required, CXEmailValidator]
      )],
      password: [null, Validators.compose(
        [Validators.required]
      )],
    });

    this.formGroupConfig = [
      {
        formControlName: 'email',
        label: 'E-mailadres',
        formControl: this.loginForm.get('email'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: 'Bv. naam@knab.nl',

        }
      },
      {
        formControlName: 'password',
        label: 'Wachtwoord',
        formControl: this.loginForm.get('password'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: '',
          type: 'password'
        }
      }
    ];
  }

  togglePassword(event) {
    event.preventDefault();
    let passwordControl = this.formGroupConfig[1];
    this.showPassword = !this.showPassword;

    passwordControl.inputOptions.type =
      (passwordControl.inputOptions.type === 'password')
        ? 'text' : 'password';
  }

  login(event) {
    event.preventDefault();
    this.submitted = true;

    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key).markAsTouched();
    });

    if (this.loginForm.valid) {
      this.isPending = true;

      let email = this.loginForm.get('email');
      let password = this.loginForm.get('password');

      this.authService
        .signIn(email.value, password.value)
        .subscribe((token) => {

          localStorage.setItem('access_token', token.access_token);
          localStorage.setItem('token', JSON.stringify(token));

          this.messageTitle = 'Success!';
          this.message = 'Login succesfull';
          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/overview';

          // Set our navigation extras object
          // that passes on our global query params and fragment
          let navigationExtras: NavigationExtras = {
            preserveQueryParams: true,
            preserveFragment: true
          };

          // Redirect the user
          this.router.navigate([redirect], navigationExtras);
        }, (res) => {
          let data = res.json();

          this.isPending = false;

          if (data.error === 'inactive_profile') {
            this.messageTitle = 'Login failed';
            this.message = 'Sorry your profile is inactive';
            return;
          }

          if (data.error === 'invalid_password') {
            this.messageTitle = 'Login failed';
            this.message = 'Invalid email or password';
            return ;
          }

          if (data.error === 'too_many_login_attempts') {
            this.messageTitle = 'Login failed';
            this.message = data.error_description;
            return;
          }

          this.messageTitle = 'Login failed';
          this.message = `Unexpected error while calling remote (${data})`;
        });
    }
    return;
  }
}
