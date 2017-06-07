import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, RouterLink, NavigationExtras } from '@angular/router';

import { CXEmailValidator } from '../../../../node_modules/@cx/form';
import { AuthService, TOKEN_NAME, TOKEN_OBJECT_NAME } from './../../services';
import { loginError } from './login-error';

/**
 * Login page that's rendered in router-outlet of 'AppComponent if not logged in
 *
 * @export
 * @class LoginComponent
 */
@Component({
  templateUrl: './login.component.html'
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
  forgotPasswordLink: string;

  constructor(private router: Router, private authService: AuthService) {
    this.initForm();

    this.forgotPasswordLink =
      'https://profile-james-a.nicci.io/password?client_id=56a6ab20bb00893f071faddc' +
      '&locale=nl_NL' +
      '&redirect_uri=com.mobgen.knab://' +
      '&response_type=code' +
      '&scope=basic+emailaddress+social';
  }

  initForm() {
    this.validationErrors = {
      required: () => 'Dit veld is verplicht',
      email: () => 'Vul een geldig e-mailadres in',
      password: () => 'Vul je wachtwoord in'
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
        formControl: this.loginForm.get('email'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: 'E-mailadres',
          attributes: {
            'aria-label': 'Vul je e-mailadres in'
          }
        }
      },
      {
        formControlName: 'password',
        formControl: this.loginForm.get('password'),
        validationErrors: this.validationErrors,
        inputOptions: {
          placeholder: 'Wachtwoord',
          type: 'password',
          attributes: {
            'aria-label': 'Vul je wachtwoord in'
          }
        }
      }
    ];
  }

  goToPasswordReset() {
    window.location.href  = this.forgotPasswordLink;
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
        .login(email.value, password.value)
        .subscribe((token) => {

          localStorage.setItem(TOKEN_NAME, token.access_token);
          localStorage.setItem(TOKEN_OBJECT_NAME, JSON.stringify(token));

          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/overview';

          // Set our navigation extras object
          // that passes on our global query params and fragment
          let navigationExtras: NavigationExtras = {
            queryParamsHandling: 'merge',
            preserveFragment: true
          };

          // Redirect the user
          this.router.navigate([redirect], navigationExtras);
        }, (res) => this.handleError(res.json()));
    }
    return;
  }

  handleError(data) {
    this.isPending = false;
    this.message = loginError[data.error] || loginError.default;

    if (data.error_description && !this.message) {
      this.message += `\n${data.error_description}`;
    }
  }
}
