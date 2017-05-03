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
        <div class="knx-login-welcome">
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
                <button *ngIf="loginForm.get('password').value" class="btn-show-password fa fa-eye" (click)="showPassword($event)"></button>
              </div>

              <button type="submit" class="knx-button knx-btn-primary knx-button--fullwidth"
                [class.cx-button--pending]="isPending" [disabled]="!loginForm.valid || isPending">
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
            <p class="login-info knx-text-center"><a rel="nofollow" href="/forgot-password">Wachtwoord vergeten?</a></p>
          </div>
        </div>
        </form>
    </div>
  `
})
export class LoginComponent {
  submitted: boolean = false;
  isPending: boolean = false;
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
        inputOptions: {
          placeholder: 'voorbeeld@mail.com',

        }
      },
      {
        formControlName: 'password',
        label: 'Wachtwoord',
        formControl: this.loginForm.get('password'),
        inputOptions: {
          placeholder: '',
          type: 'password'
        }
      }
    ];
  }

  showPassword(event) {
    event.preventDefault();
    let passwordControl = this.formGroupConfig[1];

    passwordControl.inputOptions.type =
      (passwordControl.inputOptions.type === 'password')
        ? 'text' : 'password';
  }

  login(event) {
    event.preventDefault();
    this.submitted = true;

    if (this.loginForm.valid) {
      this.isPending = true;

      let email = this.loginForm.get('email');
      let password = this.loginForm.get('password');

      //DISABLE LoginComponent
      // this.router.navigate(['/overview']);

      this.authService
        .signIn(email.value, password.value)
        .subscribe( (token) => {

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

          if(data.error === 'inactive_profile') {
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
