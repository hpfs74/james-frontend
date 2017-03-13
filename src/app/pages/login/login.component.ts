import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

import { CXEmailValidator } from '../../../../node_modules/@cx/form';
import { AuthService } from './../../services/auth.service';

/**
 * Login page that's rendered in router-outlet of 'AppComponent if not logged in
 *
 * @export
 * @class LoginComponent
 */
@Component({
  selector: 'ki-login',
  template: `
    <div class="container">
      <div class="row">
        <div class="ki-login-welcome">

        </div>
      </div>

      <form [formGroup]="loginForm" (submit)="login($event)">
        <div class="row">
          <div class="col-md-6 offset-md-3">
              <cx-form-group [formControlName]="formGroupConfig[0].formControlName"
                [options]="formGroupConfig[0]"></cx-form-group>

              <cx-form-group [formControlName]="formGroupConfig[1].formControlName"
                [options]="formGroupConfig[1]"></cx-form-group>

                <button class="cx-button ki-btn-primary fullwidth"
                  [class.cx-button--pending]="isPending" [disabled]="isPending"
                  (click)="login()">Inloggen</button>
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
  isPending: boolean = false;
  formBuilder: FormBuilder;
  loginForm: FormGroup;
  formGroupConfig = [];

  constructor(private router: Router, private authService: AuthService) {
    this.initForm();
  }

  initForm() {
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
    console.log('Login()');

    if (this.loginForm.valid) {
      console.log('Trying to log in ...');
      this.isPending = true;

      let email = this.loginForm.get('email');
      let password = this.loginForm.get('password');

      //DISABLE LoginComponent
      this.router.navigate(['/overview']);

      // this.authService.login(email, password).subscribe(() => {
      //   this.isPending = false;

      //   if (this.authService.isLoggedIn) {
      //     // Get the redirect URL from our auth service
      //     // If no redirect has been set, use the default
      //     let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/overview';

      //     // Set our navigation extras object
      //     // that passes on our global query params and fragment
      //     let navigationExtras: NavigationExtras = {
      //       preserveQueryParams: true,
      //       preserveFragment: true
      //     };

      //     // Redirect the user
      //     this.router.navigate([redirect], navigationExtras);
      //   }
      // });
    }
    return;
  }
}
